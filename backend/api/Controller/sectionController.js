const { v4: uuidv4 } = require('uuid');


/*var initModels = require("../../models/init-models");
var db = require("../../models/index");
var models = initModels(db.sequelize);*/

const models = require('../../models');
export function createSection(req,res){

    var sectionName = req.body.name ;
    var courseId = req.body.courseId;
    //var userRoleId = req.body.userRoleId;
    

    if( sectionName == null || courseId == null){
        return res.status(400).send({error :  "missing field ! can't carry on with your request"});
    }

    // preparer l'intégration de la vérification des permissions

  /*  models.role_has_permission.findAll({
        attributes:['permissionID'],
        where:{
            roleID : userRoleId
        }
    }).then((listOfPermissions)=>{
        
            models.permission.findOne({
                where : {
                    id : pid,
                    name : "creation"
                }
            }).then((permission)=>{
                let i = 0 ;
                while(listOfPermissions && listOfPermissions[i].name != "creation"){
                       i++;
                }
                if(i == length(listOfPermissions))
                return res.send({error:" user does not have the right to create section"})
                
            })
    
    })*/

    models.Course.findOne({
        attributes : ['id'],
        where : {
            id : courseId
        }
    }).then((courseFound) =>{
        if(courseFound){

            models.section.create({
                name: sectionName,
                courseID : courseId   
            }).then( (newSection)=> {
                console.log(newSection.name + "created");
                return res.status(200).send({
                    section : newSection
                })
            }).catch( (err) => {
                return res.status(500).send({
                    error: err + "create request error"
                });
            })
            
        }else{
            return res.send({error : "the Id course doesn't match any existing course! please try again "});
        }
    }).catch((err)=>{
        return res.send({error : "DB request failure cannot find matching course ID"})
    })
    
};



export function updateSection(req,res){
    let sectionToUpdateId = req.params.sectionId ;
    
    models.section.findOne({
        attributes : ['id'] ,
        where : {
            id  : sectionToUpdateId
        }
    }).then(
        (sectionToUpdate)=>{
            sectionToUpdate.name = req.body.name ;
            sectionToUpdate.courseID = req.body.courseId ;
            sectionToUpdate.save();
            return res.status(200).send({section : sectionToUpdate , message : "record updated successfully !"});
        }
    ).catch(
        (error) => {
           return res.status(500).send({error : "failed to update record ; DB request failed"});
        }
    )
};
