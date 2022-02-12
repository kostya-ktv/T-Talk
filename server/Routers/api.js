const rootRouter = require('express').Router();
const {registration, activate, login, logout, refresh} = require('../Controllers/user-controller')

rootRouter.post('/registration', registration);
rootRouter.post('/login', login);
rootRouter.post('/logout', logout);
rootRouter.get('/activate/:link', activate);
rootRouter.get('/refresh', refresh);


module.exports = rootRouter;