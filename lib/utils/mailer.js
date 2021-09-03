const nodemailer = require("nodemailer");


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: process.env.EMAIL_SMTP_SERVICE,
	host: process.env.EMAIL_SMTP_HOST,
	port:process.env.EMAIL_SMTP_PORT,
	auth: {
		user: process.env.EMAIL_SMTP_USERNAME,
		pass: process.env.EMAIL_SMTP_PASSWORD
	},
	tls: {
		rejectUnauthorized: false
	  }
	//secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.

});

exports.send = function (from, to, subject, html)
{
	// send mail with defined transport object
	// visit https://nodemailer.com/ for more options
	// if(OTP == true){
		return transporter.sendMail({
			from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
			to: to, // list of receivers e.g. bar@example.com, baz@example.com
			subject: subject, // Subject line e.g. 'Hello ✔'
			text: html, // plain text body e.g. Hello world?
			//html: html // html body e.g. '<b>Hello world?</b>'
		});	
	// }else{
	// 	return transporter.sendMail({
	// 		from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
	// 		to: to, // list of receivers e.g. bar@example.com, baz@example.com
	// 		subject: subject, // Subject line e.g. 'Hello ✔'
	// 		//text: html, // plain text body e.g. Hello world?
	// 		html: html // html body e.g. '<b>Hello world?</b>'
	// 	});
    // }
};

// const nodemailer = require("nodemailer");


// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
// 	service: process.env.EMAIL_SMTP_SERVICE,
// 	host: process.env.EMAIL_SMTP_HOST,
// 	port:process.env.EMAIL_SMTP_PORT,
// 	auth: {
// 		user: process.env.EMAIL_SMTP_USERNAME,
// 		pass: process.env.EMAIL_SMTP_PASSWORD
// 	},
// 	tls: {
// 		rejectUnauthorized: false
// 	  }
// 	//secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.

// });

// exports.send = function (from, to, subject, html)
// {
// 	// console.log("hhhhhhhhhhhhhhhhhhhhhhh")
// 	// send mail with defined transport object
// 	// visit https://nodemailer.com/ for more options
// 	return transporter.sendMail({
// 		from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
// 		to: to, // list of receivers e.g. bar@example.com, baz@example.com
// 		subject: subject, // Subject line e.g. 'Hello ✔'
// 		//text: html, // plain text body e.g. Hello world?
// 		html: html // html body e.g. '<b>Hello world?</b>'
// 	});
// };

//----------------------------------------
// const nodemailer = require("nodemailer");


// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
// 	service: process.env.EMAIL_SMTP_SERVICE,
// 	host: process.env.EMAIL_SMTP_HOST,
// 	port:process.env.EMAIL_SMTP_PORT,
// 	auth: {
// 		user: process.env.EMAIL_SMTP_USERNAME,
// 		pass: process.env.EMAIL_SMTP_PASSWORD
// 	},
// 	tls: {
// 		rejectUnauthorized: false
// 	  }
// 	//secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.

// });

// exports.send = function (from, to, subject, html,OTP)
// {
// 	// send mail with defined transport object
// 	// visit https://nodemailer.com/ for more options
// 	if(OTP == true){
// 		return transporter.sendMail({
// 			from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
// 			to: to, // list of receivers e.g. bar@example.com, baz@example.com
// 			subject: subject, // Subject line e.g. 'Hello ✔'
// 			text: html, // plain text body e.g. Hello world?
// 			//html: html // html body e.g. '<b>Hello world?</b>'
// 		});	
// 	}else{
// 		return transporter.sendMail({
// 			from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
// 			to: to, // list of receivers e.g. bar@example.com, baz@example.com
// 			subject: subject, // Subject line e.g. 'Hello ✔'
// 			//text: html, // plain text body e.g. Hello world?
// 			html: html // html body e.g. '<b>Hello world?</b>'
// 		});
//     }
// };