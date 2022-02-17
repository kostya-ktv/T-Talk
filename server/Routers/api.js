const rootRouter = require('express').Router();
const {registration, activate, login, logout, refresh} = require('../Controllers/user-controller')
const {body} = require('express-validator')
const authMiddleware = require('../Middleware/auth-middleware')
const {createRoom, fetchRoomsByUser, deleteRoom,getRoomByRoomId} = require('../Controllers/room-controller')

//USER AUTH ROUTES
rootRouter.post('/registration', 
   body('email').isEmail(), 
   body('password').isLength({min: 6, max: 20}), 
   registration);
rootRouter.post('/login', login);
rootRouter.post('/logout', logout);
rootRouter.get('/activate/:link', activate);
rootRouter.get('/refresh', refresh);

//ROOMS ROUTES
rootRouter.post('/create-room', authMiddleware, createRoom);
rootRouter.get('/rooms/:userid', authMiddleware, fetchRoomsByUser);
rootRouter.get('/delete-room/:roomid', authMiddleware, deleteRoom);
rootRouter.get('/get-room/:roomid', authMiddleware, getRoomByRoomId);


module.exports = rootRouter;