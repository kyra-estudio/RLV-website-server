const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    information: {
      type: Schema.Types.ObjectId,
      ref: 'Information',
      required: 'true',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model('Comment', commentSchema);
