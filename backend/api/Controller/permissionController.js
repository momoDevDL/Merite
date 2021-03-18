const models = require('../../models');


export function getPermission(req, res) {
    let name = req.query.name;

    //attributs incomplets
    if (name == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.permission.findOne({
        attribute: ['name'],
        where: {
            name: name
        }
    }).then((permission) => {
        //erreur, la permission existe déjà
        if (permission) {
            return res.status(200).send({
                permission: permission
            });

        } else {
            return res.status(500).send({
                error: "request error, the permission dosn't exist"
            })
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
}

export function addPermission(req, res) {
    let name = req.body.name;

    //attributs incomplets
    if (name == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.permission.findOne({
        attribute: ['name'],
        where: {
            name: name
        }
    }).then((permission) => {
        //erreur, la permission existe déjà
        if (permission) {
            return res.status(500).send({
                error: "request error permission already exists"
            });
            //cas standard, création d'une permission
        } else {
            const newPermission = models.permission.create({
                name: name
            }).then((newPermission) => {
                return res.status(200).send({
                    name: newPermission.name,
                    info: "new permission created !"
                });
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })

}

export function deletePermission(req, res) {
    let name = req.body.name;
    //attributs incomplets
    if (name == null) {
        return res.status(400).send({
            error: "missing field(s)"
        });
    }

    models.permission.findOne({
        attribute: ['name'],
        where: {
            name: name
        }
    }).then((permission) => {
        //la permission existe, on la supprime
        if (permission) {
            permission.destroy();
            return res.status(200).send({
                info: "permission sucessufully deleted !"
            });

            //si la permission n'existe pas
        } else {
            return res.status(500).send({
                error: "cannot delete : the permission doesn't exist"
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })

}

export function editPermission(req, res) {
    let oldName = req.body.oldName;
    let newName = req.body.newName;
    //attributs incomplets
    if (oldName == null | newName == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.permission.findOne({
        attribute: ['name'],
        where: {
            name: oldName
        }
    }).then((permission) => {
        //la permission existe, on la modifie
        if (permission) {
            permission.name = newName;
            permission.save();
            return res.status(200).send({
                info: "permission sucessufully edited !"
            });

            //si la permission n'existe pas
        } else {
            return res.status(500).send({
                error: "cannot edit : the permission doesn't exist"
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })

}