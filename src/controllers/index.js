const user = require('./user.controllers');
const activity = require('./activity.controllers');
const information = require("./information.controllers")
const email = require ("./email.controller")
const comment = require ("./comment.controllers")


module.exports = {
  user,
  activity,
  information,
  email,
  comment,
  
};
