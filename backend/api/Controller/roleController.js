import { resolve } from "path";

var initModels = require("../../models/init-models");
var db = require("../../models/index");
var models = initModels(db.sequelize);
const {userAllowedTo} = require('./verifyPermissions');

export function getRole(req, res) {
    let id = req.query.id;

    //attributs incomplets
    if (id == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.role.findOne({
        attribute: ['id'],
        where: {
            id: id
        }
    }).then((role) => {
        //erreur, la role existe déjà
        if (role) {
            return res.status(200).send({
                role: role
            });

        } else {
            return res.status(500).send({
                error: "request error, the role dosn't exist"
            })
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}

export async function addRole(req, res) {

    let name = req.body.name;
    let idGlobalRole = req.payload.idGlobalRole;
    let courseID = req.body.courseID;
    //attributs incomplets
    if (name == null || courseID == null || idGlobalRole == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    const addAllowed = await userAllowedTo(courseID, req.payload,"createRole");

    if (addAllowed.isAllowed === false) {
        return res.status(addAllowed.status).send(addAllowed.error);
    } else {
        models.Roles.create({
            name: name,
            courseID: courseID
        }).then(newRole => {
            return res.status(200).send({
                    newRole
                });
        }).catch((err) => {
            return res.status(500).send({
                error:"Internal server error; data base request failed"
            });
        });
    }
}


export function editRole(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    //attributs incomplets
    if (id == null | name == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.role.findOne({
        attribute: ['id'],
        where: {
            id: id
        }
    }).then((role) => {
        //le role existe, on le modifie
        if (role) {
            role.name = name;
            role.save();
            return res.status(200).send({
                info: "role sucessufully edited !"
            });

            //si le role n'existe pas
        } else {
            return res.status(500).send({
                error: "cannot edit : the role doesn't exist"
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}
export function deleteRole(req, res) {
    let id = req.body.id;
    //attributs incomplets
    if (id == null) {
        return res.status(400).send({
            error: "missing field(s)"
        });
    }

    models.role.findOne({
        attribute: ['id'],
        where: {
            id: id
        }
    }).then((role) => {
        //la role existe, on la supprime
        if (role) {
            role.destroy();
            return res.status(200).send({
                info: "role sucessufully deleted !"
            });

            //si la role n'existe pas
        } else {
            return res.status(500).send({
                error: "cannot delete : the role doesn't exist"
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}