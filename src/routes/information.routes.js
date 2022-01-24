const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.post('/createPetition', controllers.information.createPetition);

module.exports = router;