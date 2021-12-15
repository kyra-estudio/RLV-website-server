const values = require("../values")
const { Router } = require('express');
const controllers = require('../controllers');
const uploads = require("../utils").multer
const router = Router();

router.post('/signIn', controllers.user.signIn);
router.post('/signUp', uploads.single(values.avatarFolder), controllers.user.signUp);
// router.post("/logout", controllers.user.logout)
// router.get("/getAll", controllers.user.getAll)

module.exports = router;
