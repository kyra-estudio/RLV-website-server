const mongoose = require('mongoose');
const config = require('./config');

mongoose
  .connect(config.database.url)
  .then(() => {
    console.log('DB conected');
  })
  .catch((err) => {
    console.log(err);
  });
