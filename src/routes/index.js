const user = require('./user.routes');
const activity = require('./activity.routes');
const information = require('./information.routes');
const email = require('./email.routes');
const comment = require('./comment.routes');


module.exports = {
  user,
  activity,
  information,
  email,
  comment 
};