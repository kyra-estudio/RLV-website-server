const values = require('./values');

const config = {
  // hostname: 'https://socialserver-m.herokuapp.com/',
  hostname: 'http://localhost:' + process.env.PORT_DEV + '/',
  database: {
    // url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.o7wjx.mongodb.net/social?retryWrites=true&w=majority`
    url: 'mongodb://localhost/rlv-website',
  },
  jwt: {
    secret: '54651322165465432146545123',
  },
  imageFolder: './src/statics',
  multer: {
    [values.avatarFolder](cb) {
      cb(null, './src/statics/' + values.avatarFolder);
    },
  },
};
module.exports = config;
