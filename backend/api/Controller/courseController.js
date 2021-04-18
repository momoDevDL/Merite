import { resolveSoa } from 'dns';
import { stat } from 'fs';
import { getDocuments } from './documentController';

const { v4: uuidv4 } = require('uuid');
const path = require('path');

const models = require('../../models');
const { userAllowedTo } = require('./verifyPermissions');


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
async function getCourseSections(courseID) {
    return new Promise((resolve, reject) => {
        models.Section.findAll({
            where: {
                courseID: courseID
            }
        }).then(sections => {
            resolve(sections);
        }).catch(err => {
            reject({
                error: err,
                status: 500,
                Message: "Internal server error Db request Failed"
            });
        })
    });
}


async function getDocumentsOfSection(sectionID) {
    return new Promise((resolve, reject) => {
        models.Document.findAll({
            where: {
                sectionID: sectionID
            }
        }).then(documents => {
            resolve(documents);
        }).catch(err => {
            reject({
                error: err,
                status: 500,
                Message: "Internal server error Db request Failed"
            });
        })
    });
}
export function getCourse(req, res) {
    let id = req.body.id;

    //attributs incomplets
    if (id == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.Courses.findOne({
        attribute: ['id'],
        where: {
            id: id
        }
    }).then(async(course) => {
        let result = {course};
        
        if (course) {
            console.log(course.id);
            let sections = await getCourseSections(course.id).catch(err=>{
                return res.status(err.status).send(err.Message);
            });
            result["sections"] = sections;
            
            for(let i = 0 ; i < sections.length ; i++){
                let documents = await getDocumentsOfSection(sections[i].id).catch(err=>{
                    return res.status(err.status).send(err.Message);
                });
                result.sections[i].dataValues.documents = documents;
                result.sections[i]["documents"] = documents;
            }
            return res.status(200).send({
                result
            });

        } else {
            return res.status(500).send({
                error: "request error, the course doesn't exist"
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

    if (payload.idGlobalRole == 1) {
        models.Courses.findOne({
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
                const newCourse = models.Courses.create({
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
                error: err + "/ cannot create course please verify your module Id"
            });
        });
    } else {
        return res.status(403).send({ error: "cannot create course: not an admin" });
    }
}

export async function editCourse(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let courseID = req.body.courseID;
    //attributs incomplets
    if (id == null | name == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    const allowedTo = await userAllowedTo(courseID, req.payload, "modification");

    if (allowedTo.isAllowed) {

        models.Courses.findOne({
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

    } else {
        return res.status(allowedToAsign.status).send(allowedToAsign.error);
    }

}

export async function deleteCourse(req, res) {
    let courseID = req.body.id;

    //attributs incomplets
    if (courseID == null) {
        return res.status(400).send({
            error: "missing field(s)"
        });
    }

    const allowedTo = await userAllowedTo(courseID, req.payload, "suppression");

    if (allowedTo.isAllowed) {

        models.Courses.findOne({
                attribute: ['id'],
                where: {
                    id: courseID
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

    } else {
        return res.status(allowedToAsign.status).send(allowedToAsign.error);
    }
}

export async function asignStudentsToCourse(req, res) {
    let courseID = req.params.courseID;
    let UsersList = req.body.usersList;

    const allowedTo = await userAllowedTo(courseID, req.payload, "ajout");

    if (allowedTo.isAllowed) {

        UsersList.forEach(user => {

            models.Course_has_user.create({
                userID: user.username,
                courseID: courseID
            }).then(() => {
                console.log("user : " + user + "inserted");
            }).catch(err => {
                return res.status(500).send({
                    error: err,
                    Message: "Data base request error"
                });

            });
        });

        return res.status(200).send({
            message: "All users have been asigned"
        });

    } else {
        return res.status(allowedToAsign.status).send(allowedToAsign.error);
    }
}

async function getCourseInfo(courseID){
    return new Promise((resolve,reject)=>{
        models.Courses.findOne({
            where: {
                id: courseID
            }
        }).then(course => {
            resolve(course);
        }).catch(err => {
            reject({
                status:500,
                error: err,
                Message: "internal server error; DB request failed"
            });
        });
    })
} 
export function getUserCourses(req, res) {
    let username = req.payload.username;

    models.Course_has_user.findAll({
        where: {
            userID: username
        }
    }).then(async courses => {
        let AllCourses = [];
        for (let i = 0; i < courses.length; i++) {
            let course = await getCourseInfo(courses[i].courseID).catch(err=>{
                return res.status(err.status).send(err.Message);
            });
            
            let sections = await getCourseSections(course.id).catch(err=>{
                return res.status(err.status).send(err.Message);
            });
            
            AllCourses.push({course, favorite : courses[i].favorite,sections: sections});
            console.log(AllCourses);
            for (let j = 0; j < sections.length; j++) {
                let documents = await getDocumentsOfSection(sections[j].id).catch(err=>{
                    return res.status(err.status).send(err.Message);
                });
                AllCourses[i].sections[j].dataValues.documents = documents;                
            }
        }

        return res.status(200).send(AllCourses);
    }).catch(err => {
        return res.status(500).send({
            error: err,
            Message: "internal server error; DB request failed"
        });
    });
}

export function changeFavoriteState(req, res) {
    let courseID = req.body.courseID;
    let username = req.payload.username;
    
    models.Course_has_user.findOne({
        where: {
            courseID: courseID,
            userID: username,
        }
    }).then(courseFound =>{

        if(courseFound){

        courseFound.favorite = (courseFound.favorite == 0 ? 1: 0)  ;
        courseFound.save();
       
        return res.status(200).send(courseFound);
        }else{
            return res.status(500).send({
                error: err,
                Message: "Course Not Found"
            });
        }
    })
    .catch(err => {
        return res.status(500).send({
            error: err,
            Message: "internal server error; DB request failed"
        });
    });
    
}


export function getFavoriteCourses(req,res){
    let username = req.payload.username;

    models.Course_has_user.findAll({
        where: {
            userID: username,
            favorite: true
        }
    }).then(async courses => {
        let AllCourses = [];
        for (let i = 0; i < courses.length; i++) {
            const course = await models.Courses.findOne({
                where: {
                    id: courses[i].courseID
                }
            }).then(course => {
                return course;
            }).catch(err => {
                return res.status(500).send({
                    error: err,
                    Message: "internal server error; DB request failed"
                });
            });
            AllCourses.push(course);
        }

        return res.status(200).send(AllCourses);
    }).catch(err => {
        return res.status(500).send({
            error: err,
            Message: "internal server error; DB request failed"
        });
    });
}