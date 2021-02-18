const models = require('../../models');

export function getRole(req, res) {
    let id = req.query.id;

    //attributs incomplets
    if (id == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.Role.findOne({
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

export function addRole(req, res) {
    let name = req.body.name;
    let courseID = req.body.courseID;

    //attributs incomplets
    if (name == null || courseID == null) {
        return res.status(400).send({
            error: "missing field"
        });
    }

    models.Role.findOne({
        attribute: ['name', 'courseID'],
        where: {
            name: name,
            courseID: courseID
        }
    }).then((role) => {
        //erreur, le role existe déjà
        if (role) {
            return res.status(500).send({
                error: "request error role already exists"
            });
            //cas standard, création d'une role
        } else {
            const newRole = models.Role.create({
                name: name,
                courseID: courseID
            }).then((newRole) => {
                return res.status(200).send({
                    id: newRole.id,
                    info: "new role created !"
                });
                //erreur, la clef étrangère du cours ne correspond à aucun cours
            }).catch((err) => {
                return res.status(409).send({ error: "there is no course in the database with this courseID." })
            });
        }
        //erreur interne, problème surement lié au setup du serveur SQL
    }).catch((err) => {
        return res.status(400).send({
            error: err
        })
    })
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

    models.Role.findOne({
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

    models.Role.findOne({
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