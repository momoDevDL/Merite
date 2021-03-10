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
const {createModule, createCourse} = require('./Controller/courseController')
const { register,login,userInfo } = require('./Controller/userController');
const {  createDocument, updateDocument, getDocuments, getDocumentWithId, downloadDocument} = require('./Controller/documentController');
const { createSection, updateSection,} = require('./Controller/sectionController');
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


/*===USER==========================================================*/
router.route('/user/register')
    .post(register)

router.route('/user/login')
    .post(login)

router.route('/user/refresh')
    .post(verifyToken,refreshToken)

router.route('/user/me')
    .get(userInfo)
/*=================================================================*/

/*===COURSE========================================================*/

router.route('/module/create')
    .post(verifyToken,createModule)    

router.route('/course/create')
    .post(verifyToken,createCourse)  
/*=================================================================*/


/*===SECTION========================================================*/
router.route('/section/create')
    .post(verifyToken,createSection)  

router.route('/section/:sectionId')
    .put(verifyToken,updateSection)  
/*=================================================================*/


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
