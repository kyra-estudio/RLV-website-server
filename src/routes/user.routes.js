const values = require("../values")
const { Router } = require('express');
const controllers = require('../controllers');
const uploads = require("../utils").multer
const router = Router();

router.post('/signIn', controllers.user.signIn);
router.post('/signUp', uploads.single(values.avatarFolder), controllers.user.signUp);
router.get('/userGetAll', controllers.user.userGetAll);
router.delete('/removeUser', controllers.user.removeUser);

module.exports = router;
