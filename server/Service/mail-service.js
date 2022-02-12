const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
   host: process.env.SMTP_HOST,
   port: process.env.SMTP_PORT,
   secure: false,
   auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
   }
});

const sendActivationMail = async (to, link) => {
   await transport.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation',
      text: '',
      html: `<div><a href="${link}">Click to activate</a></div>`
   })
}


module.exports = {
   sendActivationMail
}