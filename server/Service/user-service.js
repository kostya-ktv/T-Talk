
const dbConnection = require('../dbConnection'),
      bcrypt = require('bcryptjs'),
      uuid = require('uuid'),
      { sendActivationMail } = require('./mail-service'),
      { generateTokens, saveToken} = require('./token-service'),
      UserDto = require('../DTO/user-dto'),
      ApiError = require('../Middleware/Exceptions/Api-error'),
      chalk = require('chalk')

//SEARCHING FOR A USER
const findUserByEmail = async(email) => {
      return await dbConnection('iuser').where({email: email});
}
const findUserByActiveLink = async(link) => {
      return await dbConnection('iuser').where({activationlink: link});
}
   //REGISTRATION A NEW USER
const userRegistration = async(email, password) => {
   const hashPassword = await bcrypt.hash(password, 3);
   const activationLink = uuid.v4();

   let user = await findUserByEmail(email);
 
      if(user.length){
         throw ApiError.BadRequest('user already exists');
      } else {
        await dbConnection('iuser').insert([
            {email: email,
            password: hashPassword,
            isactivated: false,
            activationlink: activationLink}]
         )}

      user = await findUserByEmail(email);
      console.log(chalk.bgRed('sendActivationMail disabled'));
      // await sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
      const tokens = generateTokens({...user[0]});    
      await saveToken(user[0].id, tokens.refreshToken);
      return {
         ...tokens,
         user: user[0]
      }
}
const userLinkActivation = async(activationLink) => {
   const user = await findUserByActiveLink(activationLink);
   if(!user.length) throw ApiError.BadRequest ('invalid activation link');
   await dbConnection('iuser') 
               .where({email: user[0].email})
               .update({isactivated: true})
}

module.exports = {
   findUser: findUserByEmail,
   userRegistration,
   userLinkActivation
}