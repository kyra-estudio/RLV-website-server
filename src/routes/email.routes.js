const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();


router.post('/send-email', controllers.email.sendEmail);




module.exports = router;