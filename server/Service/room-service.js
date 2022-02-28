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
//Delete ROOM BY ROOMID AND USER ID
const deleteRecentRoomByIdAndUserId_service = async(roomid, userid) => {
   return await dbConnection('irecentrooms').where({'roomid' : roomid, userid: userid}).del();
}
//Get ROOM BY ROOM ID
const getRoomById_service = async(room_id) => {
   return await dbConnection('iroom').where('room_id', room_id)
}
//FIND ROOM BY USERID
const getRoomsByUserId_service = async(id) => {
   return await dbConnection('iroom').where({iuser_id: id})
}
//FIND ROOM BY USERID AND ROOMID
const getRoomByUserIdAndRoomid_service = async(roomid, userid) => {
   return await dbConnection('iroom').where({iuser_id: userid, room_id: roomid})
}
//FIND REECNT ROOM BY USERID 
const getRecentRoomsByUserId_service = async(userid) => {
   return await dbConnection('irecentrooms').where({userid: userid})
}
//FIND REECNT ROOM BY USERID AND ROOMID
const getRecentRoomsByUserIdAndRoomId_service = async(userid, roomid) => {
   return await dbConnection('irecentrooms').where({userid: userid, roomid: roomid})
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
//ADD RECENT ROOM TO DB 
const addRecentRoomToDB_service = async(roomid, userid, nickname, room) => {
   await dbConnection('irecentrooms').insert([
      {
         userid: userid,
         roomid: roomid,
         nickname: nickname,
         name: room
      }
   ])
}

//OPEN ROOM
const openRoom_service = (id, room, user) => {
   if(rooms.get(id) === undefined) {
      rooms.set(id, {
         room: room,
         users: [],
         messages: []
      })
   }
}
//CHECK AND ADD RECENT ROOM
const addRecentRoom = async (roomid, userid, nickname, room) => {
   const isHisRoom = await getRoomByUserIdAndRoomid_service(roomid, userid)
   const isRecentRoomExists = await getRecentRoomsByUserIdAndRoomId_service(roomid, userid)
   try {
      if(!isHisRoom.length && !isRecentRoomExists.length) await addRecentRoomToDB_service(roomid, userid, nickname, room)
   } catch (error) {
      console.log(error);
   }
  
}

module.exports = {
   findRoomByName_service,
   addRoomToDB_service,
   openRoom_service,
   getRoomsByUserId_service,
   deleteRoomById_service,
   getRoomById_service,
   addRecentRoom,
   getRoomByUserIdAndRoomid_service,
   getRecentRoomsByUserId_service,
   deleteRecentRoomByIdAndUserId_service,
   getRecentRoomsByUserIdAndRoomId_service
}

