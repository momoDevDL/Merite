const { v4: uuidv4 } = require('uuid');
import Module from "../../models/Module";
const path = require('path');

var initModels = require("../../models/init-models");
var db = require("../../models/index");
var models = initModels(db.sequelize);


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
        }).then((moduleFound) =>{
            if(moduleFound){
                return res.send({error : "failed to create new module; a module with the same name already exists"})
            }else{

                const newModule = models.Module.create({
                    name : moduleName
                }).then((recentModule) =>{
                    console.log(recentModule);
                    return res.send(recentModule);
                }).catch( (err) =>{
                    return res.send({error : err + "/ failed module creation request"});
                });
            }

        }).catch((err) =>{
            return res.send({error : "failde db request to find matching module"});
        })

    }
};


export function createCourse(req,res){
    var courseName = req.body.name;
    var moduleId = req.body.id ;
    
    if(courseName == null){
        return res.status(400).send({
            error: "missing module Name"
        });
    }else{


        models.Module.findOne({
            attributes : ['id'],
            where :{
                id : moduleId
            }
        }).then((moduleFound) =>{
            if(moduleFound){
                const newCourse= models.course.create({
                    name : courseName,
                    moduleID : moduleId
                }).then((recentModule) =>{
                    console.log(recentModule);
                    return res.send(recentModule);
                }).catch( (err) =>{
                    return res.send({error : err + "/ failed module creation request"});
                });
                
            }else{
                return res.send({error : "failed to create new course; module doesn't exist or course name within this module is taken"})
            }

        }).catch((err) =>{
            return res.send({error : "failde db request to find matching module"});
        })

    }
};