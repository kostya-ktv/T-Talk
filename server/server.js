require('dotenv').config({path: './config.env'})

const express = require('express'),
      app = express(),
      cors = require('cors'),
      DB = require('./dbConnection'),
      cookieParser = require('cookie-parser'),
      api = require('./Routers/api.js'),
      errorMiddleware = require('./Middleware/error-middleware'),
      chalk = require('chalk')


app.use(express.json())
app.use(cors())
app.use(cookieParser())

      
app.use('/api', api);
app.use(errorMiddleware);
app.listen(process.env.PORT, () => { 
   console.log(chalk.bgGreen(`SERVER ON PORT ${process.env.PORT}`))
})

