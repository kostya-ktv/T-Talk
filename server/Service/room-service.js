const dbConnection = require('../dbConnection')
const rooms = new Map();

//FIND ROOM BY NAME
const findRoomByName_service = async(room_name) => {
   return await dbConnection('iroom').where({name: room_name})
}
//Delete ROOM BY ID
const deleteRoomById_service = async(room_id) => {
   return await dbConnection('iroom').where('room_id', room_id).del();
}
//Get ROOM BY ROOM ID
const getRoomById_service = async(room_id) => {
   return await dbConnection('iroom').where('room_id', room_id)
}
//FIND ROOM BY USERID
const getRoomsByUserId_service = async(id) => {
   return await dbConnection('iroom').where({iuser_id: id})
}

//ADD NEW ROOM TO DB 
const addRoomToDB_service = async(room, uuid, user_id, nickname) => {

   await dbConnection('iroom').insert([
      {
         name: room,
         room_id: uuid,
         iuser_id: user_id,
         nickname: nickname
      }
   ])
}

//OPEN ROOM
const openRoom_service = (id, room, user) => {
   //if 
   if(rooms.get(id) === undefined) {
      rooms.set(id, {
         room: room,
         users: [],
         messages: []
      })
   }
}

module.exports = {
   findRoomByName_service,
   addRoomToDB_service,
   openRoom_service,
   getRoomsByUserId_service,
   deleteRoomById_service,
   getRoomById_service
}

