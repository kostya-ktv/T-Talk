const {userRegistration, userLinkActivation} = require('../Service/user-service')

const registration = async (req, res, next) => {    
      try {
         const {email, password} = req.body;

         const userData = await userRegistration(email, password);
         res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
         })
         return res.json(userData);
      } catch (error) {
         next(error)
      }
   }
const login = async() => {
   try {
      
   } catch (error) {
      next(error)
   }
}
const logout = async() => {
   try {
      
   } catch (error) {
      next(error)
   }
}
const activate = async(req, res, next) => {
   try {
      const activationlink = req.params.link;
      await userLinkActivation(activationlink);
      return res.redirect(process.env.CLIENT_URL)
   } catch (error) {
      next(error)
   }
}
const refresh = async() => {
   try {
      
   } catch (error) {
      next(error)
   }
}

module.exports = {
   registration,
   login,
   logout,
   activate,
   refresh
}