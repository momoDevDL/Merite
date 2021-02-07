import { generateAccessTokenforUser, generateRefreshTokenforUser } from './jwt.token';

var bcrypt = require('bcrypt');
var models = require('../../models');
var Tokens = require('./jwt.token');

export function register(req,res){
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var isAdmin = req.body.isAdmin;

        if (email == null || username == null || password == null) {
            return res.status(400).send({
                error: "missing field"
            });
        }

        models.User.findOne({
            attribute: ['email'],
            where: {
                email: email
            }
        }).then(function(userfound){
            if (userfound !== null) {
                return res.status(500).send({
                    error: "request error user already exist" 
                });
            } else {

                if (isAdmin) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        const newUser = models.User.create({
                            email : email,
                            username : username,
                            password : bcryptedPassword,
                            isAdmin : 1
                        }).then( function(newUser) {
                            console.log(newUser.id);
                            return res.status(200).send({
                                userId : newUser.id
                            })
                        }).catch( function(){
                            return res.status(500).send({
                                error: err
                            });
                        })
                    })
                }else{
                    return res.status(400).send({
                        error: "request error you don't have the right to add new user"
                    });
                }


            }
        }).catch( function (err){
            return res.status(500).send({
                error: err 
            });
        })
};

export function login(req,res){
    console.log(req.body);

    var email = req.body.email;
    var password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).send({
            error: "missing field "
        });
    }

    models.User.findOne({
        attribute : ['email'],
        where : {
            email : email,
        }
    }).then( (userfound)=>{

        if(userfound === null ){

            return res.status(400).send({error : "User not found please verify your email"});

        }else{
            bcrypt.compare(password,userfound.password,(cryptErr,cryptResponse)=>{

                if(cryptResponse){
                 let refreshToken = generateRefreshTokenforUser(userfound);

                    models.User.update(
                    {
                        refreshToken: refreshToken
                    },{
                        where :
                        {
                            id : userfound.id
                        }
                    }).then((updated) => {
                        if(updated){
                            console.log(updated);
                        }
                    }).catch((error)=>{
                        console.log(error);
                        return res.send("DB update query failed");
                    });
                    
                    return res.status(200).json({ token : generateAccessTokenforUser(userfound), user : userfound});

                }else{
                    return res.status(400).send({
                        error : " Invalid password ! " + cryptErr
                    })
                }
            });
        }
    }).catch( (err) =>{
        return res.status(500).send({
            error: "Db request error Unable to verify user" + err 
        });
    })
};


export function refresh(req, res) {
    let UserAccesToken = req.cookies.jwt;

    if (!UserAccesToken) {
        return res.status(403).send("missed field : token not found in cookie");
    } else {
        let verifyTokenPayload;
        try {
            verifiedTokenPayload = jwt.verify(UserAccesToken, process.env.JWT_SECRET_SIGN_KEY);
        } catch (error) {
            return res.status(401).send("Failed to match Access Token the payload has been tampered with");
        }

        let refreshToken;

        models.User.findOne({
            attribute: ['refreshToken'],
            where:{
                id : req.body.id
            }
        }).then((token) =>{
            refreshToken = token;
        }).catch((error) =>{
            return res.status(500).send("DB request failed could not retrieve refresh token");
        });

        try{
            jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        }catch(err){
            return res.status(401).send("failed to verify refresh Token");
        }

        let newUserToken = jwt.sign(verifyTokenPayload,process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm:"HS256",
            expiresIn:process.env.JWT_SECRET_SIGN_KEY
        });

        console.log("We are in refresh Method");
        res.cookie("jwt",newUserToken,{httpOnly:true});
        res.status(201).send("token refreshed successfully");
    }
};

export function userInfo(req,res){
    console.log(req.body);
    res.json({user : {nom : "momo", prenom:"anonyme"}});
}
