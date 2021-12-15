const { Schema, model } = require('mongoose');

const activitySchema = new Schema(
  {
    title:{
      type: String,
      required: true,
    },    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports= model("Activity", activitySchema)
