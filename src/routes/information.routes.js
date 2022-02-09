const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();
const middlewares = require("../middlewares")

router.post('/createPetition', controllers.information.createPetition);

router.get('/allPetition', controllers.information.allPetition);
router.get(
  '/details/:informationId',
  middlewares.auth.detailsValidation,
  controllers.information.details
);
router.get(
  '/userPetitions/:userId',
  middlewares.auth.detailsValidation,
  controllers.information.userPetitions
);

module.exports = router;
