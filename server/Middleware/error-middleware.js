
const ApiError = require('../Middleware/Exceptions/Api-error')

module.exports = (error, req, res, next) => {

   if(error instanceof ApiError) {
      return res.status(error.status)
            .json({
               message: error.message,
               errors: error.errors
            })
   }
   console.log(error);
   return res.status(500).json({message: 'Something went wrong', error: error})
}