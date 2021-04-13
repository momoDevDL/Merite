const models = require('../../models');


export function getPermission(req, res) {
    let name = req.query.name;

    //attributs incomplets
    if (name == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.Permissions.findOne({
        attribute: ['name'],
        where: {
            name: name
        }
    }).then((Permissions) => {
        //erreur, la Permissions existe déjà
        if (Permissions) {
            return res.status(200).send({
                Permissions: Permissions
            });

        } else {
            return res.status(500).send({
                error: "request error, the Permissions dosn't exist"
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

    models.Permissions.findOne({
        attribute: ['name'],
        where: {
            name: name
        }
    }).then((Permissions) => {
        //erreur, la Permissions existe déjà
        if (Permissions) {
            return res.status(500).send({
                error: "request error Permissions already exists"
            });
            //cas standard, création d'une Permissions
        } else {
            const newPermission = models.Permissions.create({
                name: name
            }).then((newPermission) => {
                return res.status(200).send({
                    name: newPermission.name,
                    info: "new Permissions created !"
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

    models.Permissions.findOne({
        attribute: ['name'],
        where: {
            name: name
        }
    }).then((Permissions) => {
        //la Permissions existe, on la supprime
        if (Permissions) {
            Permissions.destroy();
            return res.status(200).send({
                info: "Permissions sucessufully deleted !"
            });

            //si la Permissions n'existe pas
        } else {
            return res.status(500).send({
                error: "cannot delete : the Permissions doesn't exist"
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

    models.Permissions.findOne({
        attribute: ['name'],
        where: {
            name: oldName
        }
    }).then((Permissions) => {
        //la Permissions existe, on la modifie
        if (Permissions) {
            Permissions.name = newName;
            Permissions.save();
            return res.status(200).send({
                info: "Permissions sucessufully edited !"
            });

            //si la Permissions n'existe pas
        } else {
            return res.status(500).send({
                error: "cannot edit : the Permissions doesn't exist"
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })

}