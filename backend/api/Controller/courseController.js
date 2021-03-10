const { v4: uuidv4 } = require('uuid');
const path = require('path');

const models = require('../../models');


export function createModule(req,res){
    var moduleName = req.body.name;
    
    if(moduleName == null){
        return res.status(400).send({
            error: "missing module Name"
        });
    }else{

        models.Module.findOne({
            attributes : ['name'],
            where :{
                name : moduleName
            }
        })
        .then((moduleFound) =>{
            if(moduleFound){
                return res.send({error : "failed to create new module; a module with the same name already exists"})
            }else{

                const newModule = models.Module.create({
                    name : moduleName
                })
                .then((recentModule) =>{
                    console.log(recentModule);
                    return res.send(recentModule);
                })
                .catch( (err) =>{
                    return res.send({error : err + "/ failed module creation request"});
                });
            }

        })
        .catch((err) =>{
            return res.send({error : "failde db request to find matching module"});
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

    models.Course.findOne({
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

    //attributs incomplets
    if (name == null || moduleID == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.Course.findOne({
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
            //cas standard, création d'une course
        } else {
            const newCourse = models.Course.create({
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

    models.Course.findOne({
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

    models.Course.findOne({
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

