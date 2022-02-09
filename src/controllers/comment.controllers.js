const models = require('../models');
const config = require('../config');

const createComment = async (req, res) => {
  try {
    const { date, comment, informationId } = req.body;
    const information = await models.information.findById(informationId);
    console.log('id ' + information);
    const newComment = {
      date,
      comment,
      information,
    };
    const data = await models.comment.create(newComment);

    return res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    return res.json({ err });
  }
};
const getAllComment = async (req, res) => {
  try {
    const comments = await models.comment.find();

    return res.json({ comments });
  } catch (err) {
    return res.json({ err });
  }
};
const detailsComment = async (req, res) => {
  try {
    const { informationId } = req.params;

    const comments = await models.comment.find({ information: informationId });

    const completeComment = [];

    for (comment of comments) {
      completeComment.push({
        date: comment.date,
        comment: comment.comment,
      });
    }

    return res.json({ completeComment });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

module.exports = {
  createComment,
  getAllComment,
  detailsComment,
};
