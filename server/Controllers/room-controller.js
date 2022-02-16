const ApiError = require('../Middleware/Exceptions/Api-error');
const {findRoomByName} = require('../Service/room-service');
const { findUserByEmail } = require('../Service/user-service');
const {addRoomToDB} = require('../Service/room-service');
const uuid = require('uuid');
const chalk = require('chalk')

const createRoom = async (req, res, next) => { 

   try {    
      const { room } = req.body;
      const user = await findUserByEmail(req.user.email);
      const roomDB = await findRoomByName(room);

      if(!user[0].isactivated) throw ApiError.UnauthorizedError('user mail not activated');
      if(roomDB.length) throw ApiError.BadRequest('room already exists');
      const uuidValue = uuid.v4();
      await addRoomToDB(room, uuidValue, user[0].id); 

      
      return res.json({room,uuidValue})

   } catch (error) {
      console.log(chalk.bgRed(error));
      next(error)
   }
   
}

module.exports = {
   createRoom
}