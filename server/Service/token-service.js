const jwt = require('jsonwebtoken'),
      dbConnection = require('../dbConnection')

   //GENERATE A NEW TOKENS
const generateTokens = (payload) => { 
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{expiresIn: '30m'});
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{expiresIn: '30d'});
      return {
         accessToken,
         refreshToken
      }
   }
   //SAVE OR UPDATE A REFRESH TOKEN IN DB
const saveToken = async(userId, refreshToken) =>{
      //SEARCHING TOKEN IN DB
      const token = await findTokenByUserId(userId);
      //IF NOT EXISTS CREATE
      if(!token.length) {
         await dbConnection('itoken').insert([
            {
               iuser_id: userId,
               refresh_token: refreshToken
            }]
         )
      //IF EXIST UPDATE CURRENT TOKEN
      } else {
         await dbConnection('itoken') 
               .where({iuser_id: userId})
               .update({refresh_token : refreshToken})
      }    
   }
//SEARCH FOR REFRESH TOKEN BY ID 
 const findTokenByUserId = async(userId) =>{ 
      return await dbConnection('itoken').where('iuser_id', userId);
   }
//SEARCH REFRESH TOKEN
 const findToken = async(refreshToken) =>{ 
      return await dbConnection('itoken').where('refresh_token', refreshToken);
   }

//REMOVE REFRESH TOKEN
const removeToken = async(refreshToken) => {
   return await dbConnection('itoken').where('refresh_token', refreshToken).del(); 
}

//Validator ACCESS TOKEN
const accessTokenValidator = (accessToken) => {
   try {
      return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
   } catch (error) {
      return null;
   }
   
}
//Validator REFRESH TOKEN
const refreshTokenValidator = (refreshToken) => {
   try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
   } catch (error) {
      return null;
   }
   
}

module.exports = {
   generateTokens,
   saveToken,
   findTokenByUserId,
   findToken,
   removeToken,
   accessTokenValidator,
   refreshTokenValidator
}