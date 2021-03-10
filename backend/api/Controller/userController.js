import { generateAccessTokenforUser, generateRefreshTokenforUser } from './jwt.token';

var bcrypt = require('bcrypt');
var initModels = require("../../models/init-models");
var db = require("../../models/index");
var models = initModels(db.sequelize);
var Tokens = require('./jwt.token');

export function register(req,res){
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var creatorIsAdmin = req.body.userIsAdmin;
        var userCreatedIsAdmin = req.body.newUserIsAdmin;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;

        if (email == null || username == null || creatorIsAdmin == null || password == null) {
            return res.status(400).send({
                error: "missing field"
            });
        }

        models.user.findOne({
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

                if (creatorIsAdmin) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        const newUser =  models.user.create({
                            username : username,
                            email : email,   
                            first_name: firstName,
                            last_name : lastName,
                            password : bcryptedPassword,
                            isAdmin : userCreatedIsAdmin
                        }).then( (newUser)=> {
                            console.log(newUser.email);
                            return res.status(200).send({
                                user_email : newUser.email
                            })
                        }).catch( function(){
                            return res.status(500).send({
                                error: err + "create request error"
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
                error: err + "findOne request Error"
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

    models.user.findOne({
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

                    models.user.update(
                    {
                        refreshToken: refreshToken
                    },{
                        where :
                        {
                            email : userfound.email
                        }
                    }).then((updated) => {
                        if(updated){
                            console.log(updated);
                        }
                    }).catch((error)=>{
                        console.log(error);
                        return res.send("DB update query failed");
                    });
                    
                    return res.status(200).json({ token : generateAccessTokenforUser(userfound), user : {
                        email: userfound.email,
                        username : userfound.username,
                        first_name : userfound.first_name,
                        last_name : userfound.last_name
                    }});

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


export function userInfo(req,res){
    console.log(req.body);
    res.json({user : {nom : "momo", prenom:"anonyme"}});
};

