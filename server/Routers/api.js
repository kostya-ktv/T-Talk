const rootRouter = require('express').Router();
const {registration, activate, login, logout, refresh, getUsers} = require('../Controllers/user-controller')
const {body} = require('express-validator')
const authMiddleware = require('../Middleware/auth-middleware')

rootRouter.post('/registration', 
   body('email').isEmail(), 
   body('password').isLength({min: 6, max: 20}), 
   registration);
rootRouter.post('/login', login);
rootRouter.post('/logout', logout);
rootRouter.get('/activate/:link', activate);
rootRouter.get('/refresh', refresh);
rootRouter.get('/getusers', authMiddleware, getUsers);


module.exports = rootRouter;