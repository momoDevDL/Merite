const router = require('express').Router();
const {verifyToken,refreshToken} = require('./Controller/jwt.token');


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
const {  createDocument, updateDocument, getDocuments, getDocumentWithId, downloadDocument} = require('./Controller/documentController');
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

//USERS ==================================================================
router.route('/user/register')
    .post(register);

router.route('/user/login')
    .post(login);

router.route('/user/refresh')
    .post(verifyToken,refreshToken)

router.route('/user/me')
    .get(userInfo)
/*=================================================================*/


/*===SECTION========================================================*/
router.route('/section/create')
    .post(verifyToken,createSection)  
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



/*===DOCUMENT========================================================*/
router.route('/document')
    .post(verifyToken,createDocument)
    .get(verifyToken,getDocuments)
  
router.route('/document/:documentId')
    .put(verifyToken,updateDocument)
    .get(verifyToken,getDocumentWithId)

router.route('/document/download/:documentId')
    .get(verifyToken,downloadDocument)
/*=================================================================*/

export default router;
