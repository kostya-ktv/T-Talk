const e = require('express');
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
      const token = await findToken(refreshToken);

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
         console.log('UPDATE TOKEN');
         await dbConnection('itoken') 
               .where({iuser_id: userId})
               .update({refresh_token : refreshToken})
      }
      
   }

 const findToken = async(refreshToken) =>{ 
      const token = await dbConnection('itoken').where('refresh_token', refreshToken);
      return token;
   }


module.exports = {
   generateTokens,
   saveToken,
   findToken
}