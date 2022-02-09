const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');


const server = express();

//settings
server.set('PORT', process.env.PORT || process.env.PORT_DEV);

//middlewares
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//routes
server.use('/api/user', routes.user);
server.use('/api/activity', routes.activity);
server.use('/api/information', routes.information);
server.use('/api/email', routes.email);
server.use('/api/comment', routes.comment);
server.get("/", (req, res)=>{
    return res.json({ msg: "welcome!!"})
})

//static folder
server.use(express.static(path.join(__dirname, 'statics')));

module.exports = server;
