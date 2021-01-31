const router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API en marche',
        message: 'API RESTful du projet Merite'
    });
});

// Controllers
const { getTest, postTest } = require('./Controller/testController');
const { register,login } = require('./Controller/userController');

//Routes API
router.route('/test')
    .get(getTest)
    .post(postTest)

router.route('/user/register')
    .post(register)

router.route('/user/login')
    .post(login)

export default router;
