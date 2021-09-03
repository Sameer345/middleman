const { body,sanitizeBody , check} =  require('express-validator')
const users = require('../models/user.Model')
exports.validate = ()=>{
    return[
      body("password").isLength({ min: 8 }).trim().withMessage("Password must contain at least 8 digits")
      .matches('[A-Z]').withMessage("Password Must Contain An Uppercase")
      .matches('[0-9]').withMessage("Password Must Contain a Number"),
      body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
      .isEmail().withMessage("Email must be a valid email address.")
    ]
  }