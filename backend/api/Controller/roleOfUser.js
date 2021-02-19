const models = require('../../models');

export function addRoleToUser(req, res) {
    let roleID = req.body.roleID;
    let userID = req.body.userID;

    //attributs incomplets
    if (userID == null || roleID == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.User_has_Role.findOne({
        attribute: ['roleID', 'userID'],
        where: {
            roleID: roleID,
            userID: userID
        }
    }).then((UserHasPermission) => {
        //erreur, le UserHasPermission existe déjà
        if (UserHasPermission) {
            return res.status(500).send({
                error: "The user already have the Role"
            });
            //cas standard, tout se passe comme prévu
        } else {
            const newPermissionHasRole = models.User_has_Role.create({
                roleID: roleID,
                userID: userID
            }).then((newUserHasPermission) => {
                return res.status(200).send({
                    roleID: newUserHasPermission.roleID,
                    userID: newUserHasPermission.userID,
                    info: "Role was granted to the user !"
                });
                //erreur, une des clefs étrangère est inconnue
            }).catch((err) => {
                return res.status(409).send({ error: "one of the foreign key was unkown" })
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}

export function deleteRoleToUser(req, res) {
    let roleID = req.body.roleID;
    let userID = req.body.userID;

    models.User_has_Role.findOne({
        attribute: ['roleID', 'userID'],
        where: {
            roleID: roleID,
            userID: userID
        }
    }).then((UserHasPermission) => {
        //le lien existe, on le supprime
        if (UserHasPermission) {
            UserHasPermission.destroy();
            return res.status(200).send({
                info: "Role was removed to the user with succes !"
            });
        }
        // le lien n'existe pas, on ne peut pas le supprimer
        else {
            return res.status(500).send({
                error: "The user did not have this role already."
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}