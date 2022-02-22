const e = require('express');

require('dotenv').config({ path: './config.env' });

const express = require('express'),
  http = require('http'),
  app = express(),
  socketio = require('socket.io'),
  cors = require('cors'),
  cookieParser = require('cookie-parser'),
  api = require('./Routers/api.js'),
  errorMiddleware = require('./Middleware/error-middleware'),
  chalk = require('chalk'),
  server = http.createServer(app)


app.use(express.json());
app.use(cookieParser());

//CORS PASS TO SOCKET 
const io = socketio(server, {
   cors: {
    // origin: process.env.CLIENT_URL,
    origin: true
   },
 });

app.use(
  cors({
    credentials: true,
    origin: true
    // origin: process.env.CLIENT_URL
  })
);

//SOCKET CONFIGURE
let Rooms = [];

io.on('connect', (socket) => {

   //LISTENERS
   //JOIN
  socket.on('join', ({id, nickname, room, time}) => {

    Rooms.push({
      roomid: id,
      room: room,
      nickname: nickname,
      socket: socket.id
    })
    socket.join(id)

    const users = Rooms.map(el => {
       if(el?.roomid == id){
        return el?.nickname
      } 
    })

    socket.to(id).emit('user-join', ({id, nickname, room, time, users}))
  });
 //USER SEND MESSAGE TO CHAT
  socket.on('sendMessage', ({roomid, message, nickname, time}) =>{
    const users = Rooms.map(el => {
      if(el?.roomid == roomid){
       return el?.nickname
     } 
   }) 
    io.to(roomid).emit('receiveMessage', {roomid, message, nickname, time ,users});
  });
//USER RELOAD PAGE
  socket.on('disconnect', () => {
    disconnectSocketResponse(io, socket)
  });
  //USER CHANGE ROOM OR USE LOGOUT 
  socket.on('close', () => {
    socket.disconnect()
    disconnectSocketResponse(io, socket)
	});

});



//API APP ROUTE
app.use('/api', api);
//ERROR HANDLER
app.use(errorMiddleware);
//SERVER PORT
server.listen(process.env.PORT, () => {
  console.log(chalk.bgGreen(`SERVER ON PORT ${process.env.PORT}`));
});


//UTIL
const disconnectSocketResponse = (io, socket) => {
  const disconnectedUser = Rooms.filter(el => el?.socket == socket.id)
  Rooms = Rooms.filter(el => el?.socket !== socket?.id)
  if(disconnectedUser.length){
    console.log(disconnectedUser);
      const users = Rooms.map(el => {
        if(el?.roomid == disconnectedUser[0]?.roomid){
        return el?.nickname
      } 
    })
    io.to(disconnectedUser[0]?.roomid).emit('user-close', {disconnectedUser, users});
  }
}
