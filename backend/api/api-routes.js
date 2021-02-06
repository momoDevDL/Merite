const router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API en marche',
        message: 'API RESTful du projet Merite'
    });
});

// Controllers
const { getTest, postTest } = require('./Controller/testController');

//Routes API
router.route('/test')
    .get(getTest)
    .post(postTest)

router.route('/testLogin')
    .post((req, res) => {
        console.log(req.body.username);
        if (req.body.username == "jeremie") {
            res.header("Content-Type", "application/json")
            res.send({ token: "hjsdgfgdshf5fd1sfdg6qd2sv6dsq5" })
        } else {
            res.status(404).send("Utilisateur non trouvé")
        }

    })

router.route('/testLogout')
    .delete((req, res) => {
        res.header("Content-Type", "application/json")
        res.send({ message: "ok" })
    })
router.route('/testUser')
    .get((req, res) => {
        res.header("Content-Type", "application/json")
        res.send({
            user: {
                username: 'jeremie',
                password: 'bonjour',
                age: 24
            }
        })
    })

export default router;