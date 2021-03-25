const { v4: uuidv4 } = require('uuid');
import { match } from "assert";
import Module from "../../models/Module";
const path = require('path');

var initModels = require("../../models/init-models");
var db = require("../../models/index");
var models = initModels(db.sequelize);

export function createSection(req, res) {

    let sectionName = req.body.name;
    let courseId = req.body.courseId;
    let username = req.payload.username;
    //let userRoleId = req.payload.userRoleId;


    if (sectionName == null || courseId == null || username == null) {
        return res.status(400).send({
            error: "missing field ! can't carry on with your request"
        });
    }

    //véifier si le créateur de la section est membre de ce cours
    models.Course_has_user.findOne({
            attributes: ['courseID'],
            where: {
                courseID: courseId,
                userID: username
            }
        }).then((courseFound) => {

            if (courseFound == null) {
                return res.status(403).send({
                    errorMessage: "vous n'êtes pas assignés à ce cours. Impossible de terminer l'action"
                });
            } else {
                //recuperer tout les roles de ce cours 
                models.Roles.findAll({
                    attributes: ['id', 'name', 'courseID'],
                    where: {
                        courseID: courseFound.courseID
                    }
                }).then((rolesFound) => {
                    //console.log(rolesFound);

                    //recuperer pour chaque roles ses permissions
                    rolesFound.forEach(role => {
                        //verifier si ce role appartient à l'utilisateur
                        models.User_has_roles.findOne({
                            attributes: ['roleID', 'userID'],
                            where: {
                                roleID: role.id,
                                userID: username
                            }
                        }).then(matchFound => {

                            if (matchFound != null) {
                                models.Role_has_permissions.findAll({
                                    attributes: ['roleID', 'permissionID'],
                                    where: {
                                        roleID: role.id
                                    }
                                }).then(permissionsFound => {
                                    //console.log(permissionsFound);
                                    //vérifier l'existence d'une per
                                    permissionsFound.forEach(permission => {
                                        models.Permissions.findOne({
                                            attributes: ['id'],
                                            where: {
                                                id: permission.permissionID,
                                                name: "createSection"
                                            }
                                        }).then((SectionCreationPossible) => {
                                            if(SectionCreationPossible != null){
                                            models.Courses.findOne({
                                                attributes: ['id'],
                                                where: {
                                                    id: courseId
                                                }
                                            }).then((courseFound) => {

                                                if (courseFound) {

                                                    models.Section.create({
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
                                                    return res.status(400).send({
                                                        error: "the Id course doesn't match any existing course! please try again "
                                                    });
                                                }

                                            }).catch((err) => {
                                                return res.status(500).send({
                                                    error: "DB request failure cannot find matching course ID"
                                                })
                                            });
                                        }else{
                                            return res.status(500).send({
                                                error: "you don't have the right to create Section in this course"
                                            })
                                        }
                                        }).catch(error => {
                                            return res.status(500).send({
                                                error: error,
                                                message: "erreur du communication interne de serveur"
                                            });
                                        })
                                    });
                                }).catch(error => {
                                    return res.status(500).send({
                                        error: error,
                                        message: "erreur du communication interne de serveur"
                                    });
                                })
                            }
                        }).catch((err)=>{
                            return res.status(500).send({
                                error: err,
                                message: "erreur du communication interne de serveur"
                            });
                        });

                    });
                   // return res.status(400).send({errorMessage: "Vous n'avez pas un role qui vous permet de créer une section"})
                })
            }
        })
        .catch((error) => {
            return res.status(500).send({
                error: error,
                message: "erreur du communication interne de serveur"
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