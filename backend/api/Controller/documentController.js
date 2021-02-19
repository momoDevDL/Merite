const {
    v4: uuidv4
} = require('uuid');
import Module from "../../models/Module";

var initModels = require("../../models/init-models");
var db = require("../../models/index");
var models = initModels(db.sequelize);


export function createDocument(req, res) {
    let message = req.body.message;
    let sectionID = req.body.sectionID;
    let document;
    let uploadPath;
    //var userRoleId = req.body.userRoleId;

    if (!req.files || Object.keys(req.files).length === 0 || message == null || sectionID == null) {
        return res.status(400).send({
            error: "missing field ! can't carry on with your request"
        });
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
    document = req.files.file;
    uploadPath = __dirname + '/../../uploads/' + uuidv4();

    // Use the mv() method to place the file somewhere on your server
    document.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send({
                err: err,
                text: "mv function problem"
            });
    });


    models.document.create({
        name: document.name,
        message: message,
        filepath: uploadPath,
        sectionID: sectionID
    }).then((newDocument) => {

        console.log(newDocument.name + "created");
        return res.status(200).send({
            newDocument: newDocument
        })
    }).catch(function () {
        return res.status(500).send({
            error: err + "create request error"
        });
    })
};

export function updateDocument(req, res) {
    let documentToUpdateId = req.params.documentId;
    let document;
    let uploadPath;

    models.document.findOne({
        attributes: ['id'],
        where: {
            id: documentToUpdateId
        }
    }).then(
        (documentToUpdate) => {
            document = req.files.file;
            uploadPath = __dirname + '/../../uploads/' + uuidv4();
            document.mv(uploadPath, function (err) {
                if (err)
                    return res.status(500).send(err);
            });
            documentToUpdate.name = req.body.name;
            documentToUpdate.sectionID = req.body.sectionID;
            documentToUpdate.message = req.body.message;
            documentToUpdate.filepath = uploadPath;

            documentToUpdate.save();
            return res.status(200).send({
                updatedDocument: documentToUpdate
            });

        }
    ).catch(
        (err) => {
            return res.status(500).send({
                error: "failed to update record ; DB request failed"
            });
        }
    )
}
