const { v4: uuidv4 } = require('uuid');
const path = require('path');

const models = require('../../models');


export function createModule(req, res) {
    var moduleName = req.body.name;

    if (moduleName == null) {
        return res.status(400).send({
            error: "missing module Name"
        });
    } else {

        models.Module.findOne({
                attributes: ['name'],
                where: {
                    name: moduleName
                }
            })
            .then((moduleFound) => {
                if (moduleFound) {
                    return res.send({ error: "failed to create new module; a module with the same name already exists" })
                } else {

                    const newModule = models.Module.create({
                            name: moduleName
                        })
                        .then((recentModule) => {
                            console.log(recentModule);
                            return res.send(recentModule);
                        })
                        .catch((err) => {
                            return res.send({ error: err + "/ failed module creation request" });
                        });
                }

            })
            .catch((err) => {
                return res.send({ error: "failde db request to find matching module" });
            })
    }
}

export function getCourse(req, res) {
    let id = req.query.id;

    //attributs incomplets
    if (id == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.course.findOne({
        attribute: ['id'],
        where: {
            id: id
        }
    }).then((course) => {
        //erreur, la course existe déjà
        if (course) {
            return res.status(200).send({
                course: course
            });

        } else {
            return res.status(500).send({
                error: "request error, the course dosn't exist"
            })
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}


export function addCourse(req, res) {
    let name = req.body.name;
    let moduleID = req.body.moduleID;
    let username = req.body.username;

    //attributs incomplets
    if (name == null || moduleID == null || userId == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.course.findOne({
        attribute: ['name', 'moduleID'],
        where: {
            name: name,
            moduleID: moduleID
        }
    }).then((course) => {

        //erreur, le course existe déjà
        if (course) {
            return res.status(500).send({
                error: "request error course already exists"
            });

        //cas générique, création d'un course

        } else {

            //Trouver l'id de role global de createur  
            const courseCreator = models.user.findOne({
                attribute: ['username', 'idGlobalRole'],
                where : {
                    username : username
                }
            })
            .then((userfound)=>{
                // vérifier si le role a la permission de creer un cours 
                const permission = models.role_has_permission.findOne({
                    attribute : ['roleID','permissionID'],
                    where :{
                        roleID : userfound.idGlobalRole
                    }
                })
                .then((roleWithPermissionFound)=>{
                    //verifier si la permission de role permet la création
                    models.permission.findOne({
                        attribute : ['id','name'],
                        where : {
                            id : roleWithPermissionFound.permissionID
                        }
                    }).then((permissionFound)=>{

                        // la psermission permet la creation d'un cours 
                        if(permissionFound.name == "createCourse")
                        {

                            //create a new course 
                            const newCourse = models.course.create({
                                name: name,
                                moduleID: moduleID
                            }).then((newCourse) => {
                                return res.status(200).send({
                                    id: newCourse.id,
                                    info: "new course created !"
                                });
                                //erreur, la clef étrangère du module ne correspond à aucun module
                            }).catch((err) => {
                                return res.status(409).send({ error: "there is no course in the database with this moduleID." })
                            });
                        }else
                        {
                            return res.status(400).send({error : "vous n'avez pas le droit de modifier ce cours"});
                        }
                    })

                }).catch((err)=>{
                    return res.status(500).send({error : err, message : "erreur interne d'accès au données"});
                })
            }).catch((err)=>{
                return res.status(500).send({error : err, message : "erreur interne d'accès au données"});
            })   
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}

export function editCourse(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    //attributs incomplets
    if (id == null | name == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.course.findOne({
        attribute: ['id'],
        where: {
            id: id
        }
    }).then((course) => {
        //le course existe, on le modifie
        if (course) {
            course.name = name;
            course.save();
            return res.status(200).send({
                info: "course sucessufully edited !"
            });

            //si le course n'existe pas
        } else {
            return res.status(500).send({
                error: "cannot edit : the course doesn't exist"
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}

export function deleteCourse(req, res) {
    let id = req.body.id;
    //attributs incomplets
    if (id == null) {
        return res.status(400).send({
            error: "missing field(s)"
        });
    }

    models.course.findOne({
            attribute: ['id'],
            where: {
                id: id
            }
        })
        .then((course) => {
            //la course existe, on la supprime
            if (course) {
                course.destroy();
                return res.status(200).send({
                    info: "course sucessufully deleted !"
                });

                //si la course n'existe pas
            } else {
                return res.status(500).send({
                    error: "cannot delete : the course doesn't exist"
                });
            }
            //erreur interne, problème surement lié au setup du serveur SQL
        })
        .catch((err) => {
            return res.status(400).send({
                error: err
            })
        });
}