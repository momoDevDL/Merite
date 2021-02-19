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
const { addPermissionToRole, deletePermissionToRole } = require('./Controller/permissionOfRole');
const { addRoleToUser, deleteRoleToUser } = require('./Controller/roleOfUser');
const { createSection, updateSection} = require('./Controller/sectionController');
const { createDocument, updateDocument} = require('./Controller/documentController');

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
    .post(register);

router.route('/user/login')
    .post(login);

router.route('/user/refresh')
    .post(refresh);

router.route('/user/me')
    .get(userInfo);
//========================================================================

//PERMISSIONS=============================================================
router.route('/permission')
    .post(addPermission)
    .get(getPermission)
    .put(editPermission)
    .delete(deletePermission);

router.route('/permissionOfRole')
    .post(addPermissionToRole)
    .delete(deletePermissionToRole);
//========================================================================

//ROLES===================================================================
router.route('/role')
    .post(addRole)
    .get(getRole)
    .put(editRole)
    .delete(deleteRole);

router.route('/roleOfUser')
    .post(addRoleToUser)
    .delete(deleteRoleToUser);
//========================================================================

//COURSES=================================================================
router.route('/course')
    .post(addCourse)
    .get(getCourse)
    .put(editCourse)
    .delete(deleteCourse);
//========================================================================

// SECTIONS ==============================================================
/*router.route('/user/admin/module/create')
    .post(createModule)   */ 

router.route('/course/section/create')
    .post(createSection)  

router.route('/course/section/:sectionId')
    .put(updateSection)  

//===========================================================================

//Documents==================================================================
router.route('/course/document/create')
    .post(createDocument)

router.route('/course/document/:documentId')
    .put(updateDocument)
//===========================================================================
export default router;
