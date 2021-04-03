import { resolve } from "path";

var initModels = require("../../models/init-models");
var db = require("../../models/index");
var models = initModels(db.sequelize);

export function getRole(req, res) {
    let id = req.query.id;

    //attributs incomplets
    if (id == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.role.findOne({
        attribute: ['id'],
        where: {
            id: id
        }
    }).then((role) => {
        //erreur, la role existe déjà
        if (role) {
            return res.status(200).send({
                role: role
            });

        } else {
            return res.status(500).send({
                error: "request error, the role dosn't exist"
            })
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}

function getAllCourseRoles(courseID){

    return new Promise ((resolve,reject) =>{
        models.Roles.findAll({
            attributes: ['id', 'name', 'courseID'],
            where: {
                courseID: courseID
            }
        }).then( courseRoles =>{
            if(courseRoles != null)
            resolve(courseRoles);
            else
            reject({
                status : 400,
                message : "Failed : there is no roles defined for this course"
            });
        }).catch( err =>{
            reject({
                error : err,
                status : 500,
                message : "Internal server error: data base request failed"
            });
        })
    });
}
function UserHasRole(role, username,possible) {
    return new Promise((resolve, reject) => {
       
        //verifier si ce role appartient à l'utilisateur
        models.User_has_roles.findOne({
            attributes: ['roleID', 'userID'],
            where: {
                roleID: role.id,
                userID: username
            }
        }).then(matchFound => {
            if (matchFound != null) {
                possible = true;
                resolve(matchFound);
            }
        }).catch(err => {
            reject({
                error: err,
                status: 500,
                message: "Internal server error: data base request failed"
            });
        });
    });
}

function getCourseRolesPermissions(role) {
    return new Promise((resolve, reject) => {
        
            models.Role_has_permissions.findAll({
                attributes: ['roleID', 'permissionID'],
                where: {
                    roleID: role.id
                }
            }).then(permissionsFound => {
                if(permissionsFound != null)
                resolve(permissionsFound);
            
            }).catch(err => {
                reject({
                    error: err,
                    status: 500,
                    message: "Internal server error: data base request failed"
                });
            });
       /* if (permFound == null)
            reject({
                err: null,
                status: 400,
                message: "Failed; User doesn't have the right permission"
            });*/
    });
}
function checkCreateRolePermission(permission,possible) {
    return new Promise((resolve, reject) => {

        models.Permissions.findOne({
            attributes: ['id', 'name'],
            where: {
                id: permission.permissionID,
                name: "createRole"
            }
        }).then(createPermission => {

            if(createPermission != null){
                possible = true;
                resolve(createPermission);
            }

        }).catch(err => {
            reject({
                error: err,
                status: 500,
                message: "Internal server error: data base request failed"
            });
        });
    });
}
function UserIsCourseMember(username, courseID) {

    return new Promise((resolve, reject) => {
        models.Course_has_user.findOne({
            attributes: ['courseID'],
            where: {
                courseID: courseID,
                userID: username
            }
        }).then((courseFound) => {
            if (courseFound == null) {
                reject({
                    status: 400,
                    message: "User is not member of this course"
                });
            } else {
                resolve(courseFound);
            }
        }).catch(err => {
            reject({
                error: err,
                status: 500,
                message: "Internal server error: data base request failed"
            });
        });
    });
}

function createNewRole(name, courseID) {
    return new Promise((resolve, reject) => {
        //vérifier si rôle existe déjà
        models.Roles.findOne({
            attribute: ['name', 'courseID'],
            where: {
                name: name,
                courseID: courseID
            }
        }).then(role => {

            if (role != null) {
                //erreur, le role existe déjà
                reject({
                    error: err,
                    status: 400,
                    message: "Failed ; Role already exists with same name in this course"
                });
            } else {
                // création d'une role
                models.Roles.create({
                    name: name,
                    courseID: courseID
                }).then(newRole => {
                        resolve(newRole)
                }).catch((err) => {
                    reject({
                        error: err,
                        status: 500,
                        message: "Internal server error: data base request failed"
                    });
                });
            }
        }).catch(err => {
            reject({
                error: err,
                status: 500,
                message: "Internal server error: data base request failed"
            });
        });
    });
}

export async function addRole(req, res) {
    let name = req.body.name;
    let courseID = req.body.courseID;
    let idGlobalRole = req.payload.idGlobalRole;
    let username = req.payload.username;
    let possible = false;

    //attributs incomplets
    if (name == null || courseID == null || idGlobalRole == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    const userIsMember = await UserIsCourseMember(username,courseID).catch( error =>{
        return res.status(error.status).send({error :error.err, message: error.message});
    });

    const courseRoles = await getAllCourseRoles(courseID)
    .catch(error =>{
        return res.status(error.status).send({error :error.err, message: error.message});
    });

    courseRoles.forEach( async role =>{

        const hasRoles = await UserHasRole(role,username,possible).catch(error=>{
            console.log(error);
            return res.status(error.status).send({error :error.err, message: error.message});
        });

        const coursePermissions = await getCourseRolesPermissions(role).catch(error=>{
            return res.status(error.status).send({error :error.err, message: error.message});
        });

        coursePermissions.forEach(async permission =>{

            const createPermission = await checkCreateRolePermission(permission,possible).catch(error =>{
                return res.status(error.status).send({error :error.err, message: error.message});
            });
        })
        
    });

    if(possible){
    const newRole = await createNewRole(name,courseID).catch(error=>{
        return res.status(error.status).send({error :error.err, message: error.message});
    });
    return res.status(200).send({newRole:newRole.name});
    }else{
        return res.status(400).send({message:"you don't have the correct permissions to create Role"});
    }
    
}

export function editRole(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    //attributs incomplets
    if (id == null | name == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.role.findOne({
        attribute: ['id'],
        where: {
            id: id
        }
    }).then((role) => {
        //le role existe, on le modifie
        if (role) {
            role.name = name;
            role.save();
            return res.status(200).send({
                info: "role sucessufully edited !"
            });

            //si le role n'existe pas
        } else {
            return res.status(500).send({
                error: "cannot edit : the role doesn't exist"
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}
export function deleteRole(req, res) {
    let id = req.body.id;
    //attributs incomplets
    if (id == null) {
        return res.status(400).send({
            error: "missing field(s)"
        });
    }

    models.role.findOne({
        attribute: ['id'],
        where: {
            id: id
        }
    }).then((role) => {
        //la role existe, on la supprime
        if (role) {
            role.destroy();
            return res.status(200).send({
                info: "role sucessufully deleted !"
            });

            //si la role n'existe pas
        } else {
            return res.status(500).send({
                error: "cannot delete : the role doesn't exist"
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}