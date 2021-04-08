import { resolve } from 'path';
import {
    generateAccessTokenforUser,
    generateRefreshTokenforUser
} from './jwt.token';

var bcrypt = require('bcrypt');
var initModels = require("../../models/init-models");
var db = require("../../models/index");
var models = initModels(db.sequelize);
var Tokens = require('./jwt.token');
const permittedUsersToRegister = ["super-admin", "admin"];

export function register(req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let idGlobalRoleCreator = req.payload.idGlobalRole;
    let idGlobalRoleCreated = req.body.idGlobalRole;
    let numEtud = req.body.numEtud;
    let birthdate = req.body.birthdate;
    let formation = req.body.formation;
    let town = req.body.town;
    let phoneNumber = req.body.phoneNumber;
    let ine = req.body.ine;
    let pinCode = req.body.pinCode;
    let address = req.body.address;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    console.log(req.body)

    if (email == null || password == null || idGlobalRoleCreator == null ||
        username == null || password == null || birthdate == null || phoneNumber == null ||
        address == null || town == null || pinCode == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.User.findOne({
        attribute: ['email', 'username'],
        where: {
            email: email,
            username: username
        }
    }).then(function (userfound) {
        if (userfound !== null) {
            return res.status(500).send({
                error: "request error user already exist"
            });
        } else {
            //console.log("idGlobalRole =>" + idGlobalRoleCreator);
            //Vérifier si le rôle est admin / super admin / secretaire 
            models.Global_Roles.findOne({
                    attribute: ['id', 'name'],
                    where: {
                        id: idGlobalRoleCreator
                    }
                })
                .then((globalRole) => {
                    console.log(globalRole);
                    if (globalRole == null) {
                        return res.status(400).send({
                            error: "global role not found"
                        });
                    }

                    if (!permittedUsersToRegister.includes(globalRole.name)) {
                        return res.status(400).send({
                            error: "request error you don't have the right to add new user"
                        });
                    } else {
                        bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                            if (err) {
                                return res.status(500).send({
                                    error: err
                                })
                            } else {
                                //insert a new user in the dataBase
                                const newUser = models.User.create({
                                    username: username,
                                    email: email,
                                    password: bcryptedPassword,
                                    idGlobalRole: idGlobalRoleCreated,
                                    numEtud: numEtud,
                                    address: address,
                                    pinCode: pinCode,
                                    town: town,
                                    ine: ine,
                                    phoneNumber: phoneNumber,
                                    birthdate: birthdate,
                                    formation: formation
                                }).then((newUser) => {
                                    console.log(newUser.email);
                                    return res.status(200).send({
                                        user_email: newUser.email,
                                        user_id: newUser.username,
                                        user_globalRole: newUser.idGlobalRole
                                    })
                                }).catch((err) => {
                                    return res.status(500).send({
                                        error: err + " / create request error"
                                    });
                                })

                            }

                        })
                    }
                })
                .catch((err) => {
                    return res.status(500).send({
                        error: err + "create request error"
                    });
                });



        }
    }).catch(function (err) {
        return res.status(500).send({
            error: err + " / findOne User request Error"
        });
    })
};

export function userLogin(req, res) {
    console.log(req.body);

    var email = req.body.email;
    var password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).send({
            error: "missing field "
        });
    }

    models.User.findOne({
        attribute: ['email'],
        where: {
            email: email,
        }
    }).then((userfound) => {

        if (userfound === null) {

            return res.status(400).send({
                error: "User not found please verify your email"
            });

        } else {
            bcrypt.compare(password, userfound.password, (cryptErr, cryptResponse) => {

                if (cryptResponse) {
                    let refreshToken = generateRefreshTokenforUser(userfound);

                    models.User.update({
                        refreshToken: refreshToken
                    }, {
                        where: {
                            email: userfound.email
                        }
                    }).then((updated) => {
                        if (updated) {
                            console.log(updated);
                        }
                    }).catch((error) => {
                        console.log(error);
                        return res.send("DB update query failed");
                    });

                    return res.status(200).send({
                        token: generateAccessTokenforUser(userfound),
                        user: {
                            email: userfound.email,
                            username: userfound.username,
                            idGlobalRole: userfound.idGlobalRole
                        }
                    });


                } else {
                    return res.status(400).send({
                        error: " Invalid password ! " + cryptErr
                    })
                }
            });
        }
    }).catch((err) => {
        return res.status(500).send({
            error: "Db request error Unable to verify user" + err
        });
    })
};

async function  isAdmin(idGlobalRole) {
    return new Promise((resolve,reject)=>{
        models.Global_Roles.findOne({
            where: {
                id: idGlobalRole
            }
        }).then(globalRole => {
            console.log(globalRole);
            if (globalRole.name == "admin" || globalRole.name == "super-admin") {
                resolve(true);
            } else {
                reject({status:400,Message:"You don't have admin rights to access this domain",isAdmin:false});
            }
        }).catch(err => {
            reject({status:500,Message:"internal server error; DB request failed",isAdmin:false});
        });
    });
    
}

export function adminLogin(req, res) {
    console.log(req.body);

    var email = req.body.email;
    var password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).send({
            error: "missing field "
        });
    }

    models.User.findOne({
        where: {
            email: email,
        }
    }).then((userfound) => {
        

        if (userfound == null) {
            return res.status(400).send({
                error: "User not found please verify your email"
            });
        }

        models.Global_Roles.findAll({
            where: {
                id: userfound.idGlobalRole
            }
        }).then(globalRoles => {
            let isAdmin = false;
            let cpt = 0;
           
            while(cpt < globalRoles.length && !isAdmin){
                
                if(globalRoles[cpt].name == "admin" || globalRoles[cpt].name == "super-admin"){
                    isAdmin = true;
                }
                cpt++;
            }

            if (isAdmin) {
                bcrypt.compare(password, userfound.password, (cryptErr, cryptResponse) => {

                    if (cryptResponse) {
    
                        let refreshToken = generateRefreshTokenforUser(userfound);
    
                        models.User.update({
                            refreshToken: refreshToken
                        }, {
                            where: {
                                email: userfound.email
                            }
                        }).then((updated) => {
                            if (updated) {
                                console.log(updated);
                            }
                        }).catch((error) => {
                            console.log(error);
                            return res.send("DB update query failed");
                        });
    
                        return res.status(200).send({
                            token: generateAccessTokenforUser(userfound),
                            user: {
                                email: userfound.email,
                                username: userfound.username,
                                idGlobalRole: userfound.idGlobalRole
                            }
                        });
    
    
                    } else {
                        return res.status(400).send({
                            error: " Invalid password ! " + cryptErr
                        })
                    }
                });
            } else {
                return res.status(400).send({Message:"You don't have admin rights to access this domain",isAdmin:false});
            }
        }).catch(err => {
            return res.status(500).send({Message:"internal server error; DB request failed",isAdmin:false});
        });

    }).catch((err) => {
        return res.status(500).send({
            error: "Db request error Unable to verify user" + err
        });
    })
};

export function refresh(req, res) {
    let UserAccesToken = req.body.token;

    if (!UserAccesToken) {
        return res.status(403).send("missed field : token not found in cookie");
    } else {
        let verifiedTokenPayload;
        try {
            verifiedTokenPayload = jwt.verify(UserAccesToken, process.env.JWT_SECRET_SIGN_KEY);
        } catch (error) {
            return res.status(401).send("Failed to match Access Token the payload has been tampered with");
        }

        let refreshToken;

        models.user.findOne({
            attribute: ['refreshToken'],
            where: {
                email: req.body.email
            }
        }).then((token) => {
            refreshToken = token;
        }).catch((error) => {
            return res.status(500).send("DB request failed could not retrieve refresh token");
        });

        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            return res.status(401).send("failed to verify refresh Token");
        }

        let newUserToken = jwt.sign(verifiedTokenPayload, process.env.REFRESH_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.JWT_SECRET_SIGN_KEY
        });


        //res.cookie("jwt",newUserToken,{httpOnly:true});
        res.status(201).send({
            token: newUserToken,
            message: "token refreshed successfully"
        });
    }
};

export function userInfo(req, res) {
    let username = req.params.username;

    models.User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        return res.status(200).send(user);
    }).catch(err => {
        return res.status(500).send({
            error: err,
            Message: "Internal server Error; Failed data base request"
        })
    })
};

export function allUsers(req, res) {

    models.User.findAll({

    }).then(users => {
        return res.status(200).send({
            users
        })
    }).catch(err => {
        return res.status(500).send({
            error: err,
            Message: "Internal server Error; Failed data base request"
        })
    })
}