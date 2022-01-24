const { Schema, model } = require('mongoose');

const informationSchema = new Schema(
  {
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: 'true',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'true',
    },
    date: {
      type: String,
      required: true,
    },
    adult: {
      type: Number,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    tel:{
      type: Number,
      required:true
    },

    comment: {
      type: String,      
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model('Information', informationSchema);
