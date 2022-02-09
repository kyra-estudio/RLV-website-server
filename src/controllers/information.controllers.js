const models = require('../models');

const createPetition = async (req, res) => {
  try {
    const { activityId, userId, date, adult, children, tel, comment } =
      req.body;
    if (!activityId || !userId || !date || !adult || !children || !tel) {
      return res.status(409).json({
        error: 'Alguno de los valores introducidos no son correctos!',
      });
    }
    const user = await models.user.findById(userId);
    const activity = await models.activity.findById(activityId);
    const petition = {
      activity,
      user,
      date,
      adult,
      children,
      tel,
      comment,
    };
    const data = await models.information.create(petition);

    return res.json({ data });
  } catch (err) {
    console.log(err);
    return res.status(409).json({ error: 'Hubo un error!' });
  }
};

const allPetition = async (req, res) => {
  try {
    const informations = [];
    let user;
    let activity;
    const tempinformations = await models.information.find();
    for (const information of tempinformations) {
      user = await models.user.findById(information.user);
      activity = await models.activity.findById(information.activity);
      informations.push({
        _id: information._id,
        activity: information.activity,
        activityName: activity.title,
        date: information.date,
        adult: information.adult,
        children: information.children,
        tel: information.tel,
        comment: information.comment,

        user: {
          _id: user._id,
          name: user.name + ' ' + user.lastname,
          email: user.email,
        },
      });
    }

    return res.json({ informations });
  } catch (err) {
    return res.json({ err });
  }
};

const details = async (req, res) => {
  try {
    const { informationId } = req.params;

    const information = await models.information.findById(informationId);
    const user = await models.user.findById(information.user);

    const completeInformation = [];

    completeInformation.push({
      _id: information._id,
      activity: information.activity,
      date: information.date,
      adult: information.adult,
      children: information.children,
      tel: information.tel,
      comment: information.comment,

      user: {
        _id: user._id,
        name: user.name + ' ' + user.lastname,
        email: user.email,
      },
    });

    return res.json({ completeInformation });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const userPetitions = async (req, res) => {
  try {
    const { userId } = req.params;

    const informations = [];

    const tempInformation = await models.information.find({ user: userId });

    for (information of tempInformation) {
      activity = await models.activity.findById(information.activity);
      informations.push({
        _id: information._id,
        activity: information.activity,
        activityName: activity.title,
        date: information.date,
        adult: information.adult,
        children: information.children,
        tel: information.tel,
        comment: information.comment,
      });
    }

    return res.json({ informations });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

module.exports = {
  createPetition,
  allPetition,
  details,
  userPetitions,
};
