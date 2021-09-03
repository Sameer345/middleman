var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'appcommunity549@gmail.com',
    pass: 'Mutex@123'
  }
});

exports.send = function(from, to, subject, html){

  return transporter.sendMail({

  from: from,
  to: to,
  subject: subject,
  html: html

})
}
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });










// const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
// 	service: 'gmail',
// 	host: 'smtp.gmail.com',
// 	port:587,
// 	auth: {
// 		user: 'appcommunity549@gmail.com',
// 		pass: 'Mutex@123'
// 	},
// 	tls: {
// 		rejectUnauthorized: false
// 	  }
// 	//secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
   
// });

// var mailOptions ={
//     from: 'appcommunity549@gmail.com',
//     to : 'bilalahmed141999@gmail.com',
//     subject: 'sending Email using node js'
// }

// transporter.sendMail(mailOptions,function(error,info){
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log("Email Sent", info.message)
//     }
// })