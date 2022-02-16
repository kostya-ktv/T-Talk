const dbConnection = require('../dbConnection')


//FIND ROOM BY NAME
const findRoomByName = async(room) => {
   return await dbConnection('iroom').where({name: room});
}

//ADD NEW ROOM TO DB
const addRoomToDB = async(room, uuid, user_id) => {

   await dbConnection('iroom').insert([
      {
         name: room,
         room_id: uuid,
         iuser_id: user_id
      }
   ])
   
}

module.exports = {
   findRoomByName,
   addRoomToDB
}

