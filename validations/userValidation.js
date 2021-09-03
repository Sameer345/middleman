const { body,sanitizeBody , check} =  require('express-validator')
const users = require('../models/user.Model')
const mongoose = require('mongoose')
exports.validte = ()=>{
  return[
    body("password").isLength({ min: 8 }).trim().withMessage("Password must contain at least 8 digits")
    .matches('[A-Z]').withMessage("Password Must Contain An Uppercase")
    .matches('[0-9]').withMessage("Password Must Contain a Number"),
    body("email").isLength({min:1}).trim().withMessage("Email must be specified.")
    .isEmail().withMessage("Email must be a valid email address.").custom((value)=>{
        return users.findOne({email : value}).then((user)=>{
            if(user){
                return Promise.reject("Email Already Exist")
            }
        })

    })
  ]
}