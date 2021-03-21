const { v4: uuidv4 } = require('uuid');
import Module from "../../models/Module";
const path = require('path');

var initModels = require("../../models/init-models");
var db = require("../../models/index");
var models = initModels(db.sequelize);


export function createSection(req, res) {

    let sectionName = req.body.name;
    let courseId = req.body.courseId;
    let username = req.payload.username;
    let userRoleId = req.payload.userRoleId;


    if (sectionName == null || courseId == null || username == null) {
        return res.status(400).send({ error: "missing field ! can't carry on with your request" });
    }

    //véifier si le créateur de la section est membre de ce cours
    models.course_has_user.findOne({
        attributes : ['courseID'],
        where : {
            courseID : courseId,
            userID : username
        }
    }).then((courseFound)=>{
        
        if( courseFound == null){
            return res.status(403).send({ errorMessage : "vous n'êtes pas assignés à ce cours. Impossible de terminer l'action"});
        }else{
            models.role.findAll({
                attributes : ['idRole','name','idCourse'],
                where :{
                    idCourse : courseFound.courseID
                }
            }).then((rolesFound)=>{
                
                rolesFound.forEach(role => {
                    models.role_has_permission.findAll({
                        attributes: ['idRole','idPermission'],
                        where : {
                            idRole : role
                        }
                    }).then(permissionsFound => {
                        permissionsFound.forEach(permission => {
                            models.permission.findOne({
                                attributes : ['idPersmission'],
                                where:{
                                    idPermission : permission.idPermission,
                                    name : "createSection"
                                }
                            }).then( () =>{
                                models.course.findOne({
                                    attributes: ['id'],
                                    where: {
                                        id: courseId
                                    }
                                }).then((courseFound) => {

                                    if (courseFound) {
                            
                                        models.section.create({
                                            name: sectionName,
                                            courseID: courseId
                                        }).then((newSection) => {
                                            console.log(newSection.name + "created");
                                            return res.status(200).send({
                                                section: newSection
                                            })
                                        }).catch((err) => {
                                            return res.status(500).send({
                                                error: err + "create request error"
                                            });
                                        })
                            
                                    } else {
                                        return res.status(400).send({ error: "the Id course doesn't match any existing course! please try again " });
                                    }

                                }).catch((err) => {
                                    return res.status(500).send({ error: "DB request failure cannot find matching course ID" })
                                });

                            }).catch(error =>{
                                return res.status(500).send({
                                    error : error,
                                    message : "erreur du communication interne de serveur"
                                });
                            })
                        });
                    }).catch( error =>{
                        return res.status(500).send({
                            error : error,
                            message : "erreur du communication interne de serveur"
                        });
                    })
                });
            })
        }
    })
    .catch((error)=>{
        return res.status(500).send({
            error : error,
            message : "erreur du communication interne de serveur"
        });
    })
};



export function updateSection(req, res) {
    let sectionToUpdateId = req.params.sectionId;

    models.section.findOne({
        attributes: ['id'],
        where: {
            id: sectionToUpdateId
        }
    }).then(
        (sectionToUpdate) => {
            sectionToUpdate.name = req.body.name;
            sectionToUpdate.courseID = req.body.courseId;
            sectionToUpdate.save();
            return res.status(200).send({ section: sectionToUpdate, message: "record updated successfully !" });
        }
    ).catch(
        (error) => {
            return res.status(500).send({ error: "failed to update record ; DB request failed" });
        }
    )
};