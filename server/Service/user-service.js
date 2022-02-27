const dbConnection = require('../dbConnection'),
      bcrypt = require('bcryptjs'),
      uuid = require('uuid'),
      { sendActivationMail } = require('./mail-service'),
      { generateTokens, saveToken, removeToken, refreshTokenValidator, findToken} = require('./token-service'),
      ApiError = require('../Middleware/Exceptions/Api-error');

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
      try {
         await sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
      } catch (error) {
         console.log(error)
      }
      
      const tokens = generateTokens({...user[0]});    
      await saveToken(user[0].id, tokens.refreshToken);
      return {
         ...tokens,
         user: user[0]
      }
}
//ACTIVATE AN ACCOUNT
const userLinkActivation = async(activationLink) => {
   const user = await findUserByActiveLink(activationLink);
   if(!user.length) throw ApiError.BadRequest ('invalid activation link');
   await dbConnection('iuser') 
               .where({email: user[0].email})
               .update({isactivated: true})
}

//USER LOGIN
const userLogin = async(email, password) => {
   const user = await findUserByEmail(email);

   if(!user.length) throw ApiError.BadRequest('User not found');

   const isPassCompare = await bcrypt.compare(password, user[0].password);

   if(!isPassCompare) throw ApiError.BadRequest('Invalid credentials');

   const tokens = generateTokens({...user[0]});    
      await saveToken(user[0].id, tokens.refreshToken);
      return {
         ...tokens,
         user: user[0]
      }

}

//USER LOGOUT
const userLogout = async(refreshToken) => {
   return await removeToken(refreshToken);
}

//USER UPDATE TOKEN
const userRefreshToken = async(refreshToken) => {
   
   if(!refreshToken) throw ApiError.UnauthorizedError();
   const dataUser = refreshTokenValidator(refreshToken);
   const tokenDB = findToken(refreshToken);

   if(!dataUser || !tokenDB) throw ApiError.UnauthorizedError();

   const user = await findUserByEmail(dataUser.email);
   const tokens = generateTokens({...user[0]});    
   await saveToken(user[0].id, tokens.refreshToken);
   return {
      ...tokens,
      user: user[0]
   }
}
const emailValidator = (email) => {
   const pattern = /\S+@\S+\.\S+/;
   return isValid = pattern.test(email);
  }
  
  //PASSWORD VALIDATOR
const passwordValidator = (password) => {
    const pattern = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{8,}$/
    return pattern.test(password)  
  }
  

module.exports = {
   findUserByEmail,
   userRegistration,
   userLinkActivation,
   userLogin,
   userLogout,
   userRefreshToken,
   emailValidator,
   passwordValidator
}
