const { accessTokenValidator } = require("../Service/token-service");
const ApiError = require("./Exceptions/Api-error")

module.exports = (req, res, next) => {

   try {
      const authorizationHeader = req.headers.authorization;
      console.log(authorizationHeader.toString());
      if(!authorizationHeader) throw ApiError.UnauthorizedError();

      const accessToken = authorizationHeader.split(' ')[1];
      
      if(!accessToken) throw ApiError.UnauthorizedError();

      const user = accessTokenValidator(accessToken);
      
      if(!user) throw ApiError.UnauthorizedError();
      req.user = user;
      next();
   } catch (error) {
      return next(ApiError.UnauthorizedError())
   }
}