const { Router } = require('express');
const controllers = require('../controllers');
const middlewares = require("../middlewares")
const router = Router();

router.post('/createComment', controllers.comment.createComment);
router.get("/getAllComment", controllers.comment.getAllComment)
router.get(
    '/detailsComment/:informationId',
    middlewares.auth.detailsValidation,
    controllers.comment.detailsComment
  );



module.exports = router;