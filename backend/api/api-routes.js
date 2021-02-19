const router = require('express').Router();
const verify = require('./Controller/jwt.token').verifyTokenOfUser;

router.get('/', function(req, res) {
    res.json({
        status: 'API en marche',
        message: 'API RESTful du projet Merite'
    });
});

// Controllers
const { getTest, postTest } = require('./Controller/testController');
const { register, login, refresh, userInfo } = require('./Controller/userController');
const { getPermission, addPermission, deletePermission, editPermission } = require('./Controller/permissionController');
const { getRole, addRole, deleteRole, editRole } = require('./Controller/roleController');
const { getCourse, addCourse, deleteCourse, editCourse } = require('./Controller/courseController');

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

//USERS==================================================================
router.route('/user/register')
    .post(register)

router.route('/user/login')
    .post(login)

router.route('/user/refresh')
    .post(refresh)

router.route('/user/me')
    .get(userInfo)

//========================================================================

//PERMISSIONS=============================================================
router.route('/permission/add')
    .post(addPermission);

router.route('/permission/get')
    .get(getPermission);

router.route('/permission/edit')
    .put(editPermission);

router.route('/permission/delete')
    .delete(deletePermission);
//========================================================================

//ROLES===================================================================
router.route('/role/add')
    .post(addRole);

router.route('/role/get')
    .get(getRole);

router.route('/role/edit')
    .put(editRole);

router.route('/role/delete')
    .delete(deleteRole);
//========================================================================

//COURSES=================================================================

router.route('/course/add')
    .post(addCourse);

router.route('/course/get')
    .get(getCourse);

router.route('/course/edit')
    .put(editCourse);

router.route('/course/delete')
    .delete(deleteCourse);
//========================================================================

export default router;