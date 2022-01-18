const models = require('../models');
const config = require('../config');

const createActivity = async (req, res) => {
    try {
      const { title} = req.body;
  
      if(!title ){
        return res
        .status(409)
        .json({ error: 'La actividad no existe!' });
      }
            
      const activity = {
        title,
      };
      const data = await models.activity.create(activity);
  
      return res.status(201).json({ data });
    } catch (err) {
      console.log(err);
      return res.json({ err });
    }
  };
  
    const getAll = async (req, res) => {
      try {
        const activity = await models.activity.find();
        
        return res.json({ activity });
      } catch (err) {
        return res.json({ err });
      }
    };
  
  module.exports = {
    createActivity,
    getAll,
  };