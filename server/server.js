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
    origin: process.env.CLIENT_URL,
   },
 });
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);

//SOCKET CONFIGURE
io.on('connect', (socket) => {
   //LISTENERS
   //JOIN CHAT
  socket.on('join', ({ room_id, name, nickname}) => {
    console.log(room_id, name, nickname);
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
