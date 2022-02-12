const {userRegistration, userLinkActivation, userLogin, userLogout,findAllUsers, userRefreshToken} = require('../Service/user-service')
const {validationResult} = require('express-validator');
const ApiError = require('../Middleware/Exceptions/Api-error');

//User registration cotroller
const registration = async (req, res, next) => {    
      try {

         const errors = validationResult(req);
         if(!errors.isEmpty()) return next(ApiError.BadRequest('Validation error', errors.array()));
         
         const { email, password } = req.body;
         const user = await userRegistration(email, password);
         
         res.cookie('refreshToken', user.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
         })
         return res.json(user);
      } catch (error) {
         next(error)
      }
}

//User login cotroller
const login = async(req, res, next) => {
   try {
      const { email, password } = req.body;
      const user = await userLogin(email, password);

      res.cookie('refreshToken', user.refreshToken, {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true
      })
      return res.json(user);
   } catch (error) {
      next(error)
   }
}

//User logout cotroller
const logout = async(req, res, next) => {
   try {
      const { refreshToken } = req.cookies;
      const token = await userLogout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
   } catch (error) {
      next(error)
   }
}

//User email activation cotroller
const activate = async(req, res, next) => {
   try {
      const activationlink = req.params.link;
      await userLinkActivation(activationlink);
      return res.json('profile activated')
   } catch (error) {
      next(error)
   }
}

//Update refresh token cotroller
const refresh = async(req, res, next) => {
   try {
      const { refreshToken } = req.cookies;
      const user = await userRefreshToken(refreshToken);
      res.cookie('refreshToken', user.refreshToken, {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true
      })
      return res.json(user);
   } catch (error) {
      next(error)
   }
}

const getUsers = (req, res, next) => {

   res.json(findAllUsers())
}

module.exports = {
   registration,
   login,
   logout,
   activate,
   refresh,
   getUsers
}