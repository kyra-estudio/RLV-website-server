const models = require('../models');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../config');
const values = require('../values');
const fs = require('fs/promises');
const path = require('path');

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
    const data = {
      email: user.email,
    };
    const token = jwt.sign({ data }, config.jwt.secret);
    return res.json({
      token,
      avatar: user.avatar,
      name: user.name,
      id: user._id,
      admin: user.admin,
    });
  } catch (err) {
    console.log(err);
    return res.status(409).json({ error: 'Hubo un error!' });
  }
};
const signUp = async (req, res) => {
  try {
    const { name, lastname, email, password, password2 } = req.body;

    if (
      !name ||
      !lastname ||
      !email ||
      !password ||
      !password2 ||
      password != password2
    ) {
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
const userGetAll = async (req, res) => {
  try {
    const user = await models.user.find({admin:false});

    return res.json({ user });
  } catch (err) {
    return res.json({ err });
  }
};
const removeUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await models.user.findById(userId);
    if (!user) {
      return res.json({ error: 'El usuario no existe' });
    }

    const avatarSplit = user.avatar.split('/');
    const fileName = avatarSplit[avatarSplit.length - 1];
    const avatarPath = path.resolve(
      `./src/statics/${values.avatarFolder}/` + fileName
    );

    await fs.unlink(avatarPath);
    const data = await models.user.findByIdAndRemove(userId);

    const petitions = await models.information.find({ user: userId });

    for (const petition of petitions) {
      await models.information.findByIdAndRemove(petition._id);
    }

    return res.json({ data });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

module.exports = {
  signIn,
  signUp,
  userGetAll,
  removeUser,
};
