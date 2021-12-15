const models = require('../models');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../config');
const values = require('../values');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await models.user.findOne({ email });
    if (!user) {
      return res.status(409).json('El usuario no existe!!');
    }
    const isValid = await utils.bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(409).json('El usuario no existe!!');
    }
    const data={
      email: user.email
    }
    const token = jwt.sign({ data }, config.jwt.secret, { expiresIn: '1h' });
    return res.json({ token,  avatar:user.avatar, name: user.name });
  } catch (err) {
    console.log(err);
    return res.status(409).json({ error: 'Hubo un error!' });
  }
};
const signUp = async (req, res) => {
  try {
    const { name, lastname, email, password, password2 } = req.body;

    if(!name || !lastname || !email || !password || !password2 || password != password2){
      return res
      .status(409)
      .json({ error: 'Alguno de los valores introducidos no es correcto!' });
    }
    const hostname = config.hostname;
    const hash = await utils.bcrypt.encrypt(password);
    const file = req.file;

    const user = {
      name,
      lastname,
      avatar: hostname + values.avatarFolder + '/' + file.filename,
      email,
      password: hash,
    };
    const data = await models.user.create(user);

    return res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    return res.json({ err });
  }
};

module.exports = {
  signIn,
  signUp,
};
