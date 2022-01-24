const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.post('/createActivity', controllers.activity.createActivity);
router.get("/getAll", controllers.activity.getAll)


module.exports = router;