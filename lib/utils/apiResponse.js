const log = require('./logger');
const dateFormat = require("dateformat");


module.exports = {
	successResponse:  (res, msg , status=1) => {
		const DATETIME = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
		const LOGMESSAGE = DATETIME + "|"+msg;
        log.write("INFO", LOGMESSAGE);
		var data = {
			status: status,
			message: msg
		};
		return res.status(200).json(data);
	},

	successResponseWithData: (res, msg, data, status=1) => {
		const DATETIME = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
		const LOGMESSAGE = DATETIME + "|"+msg;
        log.write("INFO", LOGMESSAGE);
		var resData = {
			status: status,
			message: msg,
			data: data
		};
		return res.status(200).json(resData);
	},

	errorResponse:  (res, msg , status=0) => {
		const DATETIME = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
		const LOGMESSAGE = DATETIME + "|"+msg;
        log.write("ERROR", LOGMESSAGE);
		var data = {
			status: status,
			message: msg,
		};
		return res.status(500).send(data);
	},

	notFoundResponse:  (res, msg , status=0) => {
		const DATETIME = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
		const LOGMESSAGE = DATETIME + "|"+msg;
        log.write("ERROR", LOGMESSAGE);
		var data = {
			status: status,
			message: msg,
		};
		return res.status(404).json(data);
	}
	,
	validationErrorWithData:  (res, msg, data) => {
		const DATETIME = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
		const LOGMESSAGE = DATETIME + "|"+msg+"|"+JSON.stringify(data);
        log.write("ERROR", LOGMESSAGE);
		var resData = {
			status: 0,
			message: msg,
			data: data
		};
		return res.status(400).json(resData);
	},

	unauthorizedResponse:  (res, msg , status=0) => {
		const DATETIME = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
		const LOGMESSAGE = DATETIME + "|"+msg;
        log.write("ERROR", LOGMESSAGE);
		var data = {
			status: status,
			message: msg,
		};
		return res.status(401).json(data);
	}
}

