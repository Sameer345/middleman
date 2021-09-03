const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const userValidation = require('../validations/userValidation')
// router.get("/user", (req,res)=>{
//     res.send("Hello Alexa")
// })
router.post('/register',userValidation.validte(),userController.register)
router.post('/logout',userController.logout)
module.exports = router