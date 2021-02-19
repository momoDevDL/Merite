const models = require('../../models');

export function addPermissionToRole(req, res) {
    let roleID = req.body.roleID;
    let permissionID = req.body.permissionID;

    //attributs incomplets
    if (permissionID == null || roleID == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.Role_has_Permission.findOne({
        attribute: ['roleID', 'permissionID'],
        where: {
            roleID: roleID,
            permissionID: permissionID
        }
    }).then((RoleHasPermission) => {
        //erreur, le RolehasPermission existe déjà
        if (RoleHasPermission) {
            return res.status(500).send({
                error: "Permission was already added to the Role"
            });
            //cas standard, tout se passe comme prévu
        } else {
            const newPermissionHasRole = models.Role_has_Permission.create({
                roleID: roleID,
                permissionID: permissionID
            }).then((newRoleHasPermission) => {
                return res.status(200).send({
                    roleID: newRoleHasPermission.roleID,
                    permissionID: newRoleHasPermission.permissionID,
                    info: "permission added to the role !"
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

export function deletePermissionToRole(req, res) {
    let roleID = req.body.roleID;
    let permissionID = req.body.permissionID;

    models.Role_has_Permission.findOne({
        attribute: ['roleID', 'permissionID'],
        where: {
            roleID: roleID,
            permissionID: permissionID
        }
    }).then((RoleHasPermission) => {
        //le lien existe, on le supprime
        if (RoleHasPermission) {
            RoleHasPermission.destroy();
            return res.status(200).send({
                info: "Permission was removed to the role with succes !"
            });
        }
        // le lien n'existe pas, on ne peut pas le supprimer
        else {
            return res.status(500).send({
                error: "the role already did not have this permission"
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}