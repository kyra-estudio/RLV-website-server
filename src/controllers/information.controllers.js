const { reset } = require('nodemon');
const models = require('../models');

const createPetition = async (req, res) => {
    try {
      const { activityId, userId, date, adult, children, tel, comment } = req.body;
      if(!activityId || !userId || !date || !adult || !children || !tel){
        return res
        .status(409)
        .json({ error: 'Alguno de los valores introducidos no son correctos!' });
      }
      const user = await models.user.findById(userId);
      const activity = await models.activity.findById(activityId);
      const petition ={
        activity,
        user,
        date,
        adult,
        children, 
        tel,
        comment
      }
      const data = await models.information.create(petition) 
      
      return res.json({ data });
    } catch (err) {
      console.log(err);
      return res.status(409).json({ error: 'Hubo un error!' });
    }
  };

  module.exports = {
      createPetition
  }