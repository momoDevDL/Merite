const router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API en marche',
        message: 'API RESTful de Gretagram'
    });
});

// Controllers
const { getTest, postTest } = require('./Controller/testController');

//Routes API
router.route('/test')
    .get(getTest)
    .post(postTest)

export default router;