var initModels = require("../../models/init-models");
var db = require("../../models/index");
var models = initModels(db.sequelize);

export function createSection(req,res){

    var sectionName = req.body.name ;
    var courseId = req.body.courseId;
    

    if( sectionName == null || courseId == null){
        return res.status(400).send({error :  "missing field ! can't carry on with your request"});
    }

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
};

export function createDocument(req,res){
    var documentName = req.body.name ;
    var message = req.body.message;
    var filepath = req.body.filepath;
    var sectionID = req.body.sectionID;

    if( documentName == null || message == null || filepath == null || sectionID == null){
        return res.status(400).send({error : "missing field ! can't carry on with your request"});
    }

    
    models.document.create({
        name: sectionName,
        message : message,
        filepath: filepath,
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