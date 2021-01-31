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
                    return res.status(200).send({
                        userId : userfound.id,
                        token : Tokens.generateTokenforUser(userfound)
                    })
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



}