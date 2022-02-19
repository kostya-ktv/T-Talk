const ApiError = require('../Middleware/Exceptions/Api-error');
const {findRoomByName_service,getRoomById_service, getRoomsByUserId_service, deleteRoomById_service} = require('../Service/room-service');
const { findUserByEmail } = require('../Service/user-service');
const {addRoomToDB_service} = require('../Service/room-service');
const uuid = require('uuid');

//CREATE ROOM
const createRoom = async (req, res, next) => { 
   try {    
      const { room, nickname } = req.body;
      const user = await findUserByEmail(req.user.email);
      let roomDB = await findRoomByName_service(room);
      if(!user[0].isactivated) throw ApiError.UnauthorizedError('user mail not activated');
      if(roomDB.length) throw ApiError.BadRequest('room already exists');
      
      const uuidValue = uuid.v4();
      await addRoomToDB_service(room, uuidValue, user[0].id, nickname); 
      roomDB = await findRoomByName_service(room);
      return res.json({...roomDB})

   } catch (error) {
      console.log(error);
      next(error)
   }
   
}
//GET ALL ROOMS BY USER
const fetchRoomsByUser = async (req, res, next) => {
   try {
      const { userid } = req.params;
      const rooms = await getRoomsByUserId_service(userid);
      return res.json({rooms})
   } catch (error) {
      console.log(error);
      next(error)
   }  
}
//DELETE ROOM
const deleteRoom = async (req, res, next) => {

   try {
      const { roomid } = req.params;
      await deleteRoomById_service(roomid);
      return res.json({roomid})
   } catch (error) {
      console.log(error);
      next(error)
   }
   
}
//GET ROOM
const getRoomByRoomId = async (req, res, next) => {
   try {
      const { roomid } = req.params
      const room = await getRoomById_service(roomid)
      return res.json(room)
   } catch (error) {
      console.log(error);
      next(error)
   }
}

module.exports = {
   createRoom,
   fetchRoomsByUser,
   deleteRoom,
   getRoomByRoomId
}