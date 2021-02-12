var initModels = require("../../models/init-models");
var db = require("../../models/index");
var models = initModels(db.sequelize);

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

    models.course.findOne({
        attributes : ['id'],
        where : {
            id : courseId
        }
    }).then((courseFound) =>{
        if(courseFound){

            const newSection =  models.section.create({
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

export function createDocument(req,res){
    let message = req.body.message;
    let sectionID = req.body.sectionID;
    let document;
    let uploadPath;
    //var userRoleId = req.body.userRoleId;

    if (!req.files || Object.keys(req.files).length === 0 || message == null ||sectionID == null) {
        return res.status(400).send({error : "missing field ! can't carry on with your request"});
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
    
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    document = req.files.document;
    uploadPath = __dirname + '../../uploads/' + document.name;

    // Use the mv() method to place the file somewhere on your server
    document.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
    });

    
    models.document.create({
        name: document.name,
        message : message,
        filepath: uploadPath,
        sectionID : sectionID   
    }).then( (newDocument)=> {

        console.log(newDocument.name + "created");
        return res.status(200).send({
            newDocument : newDocument
        })
    }).catch( function(){
        return res.status(500).send({
            error: err + "create request error"
        });
    })
}