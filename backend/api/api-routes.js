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
const { register,login,refresh } = require('./Controller/userController');

//Routes API
router.route('/test')
    .get(getTest)
    .post(postTest)

router.route('/user/register')
    .post(register)

router.route('/user/login')
    .post(login)

router.route('/user/refresh')
    .post(refresh)
export default router;
