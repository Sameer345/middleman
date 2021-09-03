const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const authValidation = require('../validations/authValidation')
const valid = require('../validations/jwtVadliadtionNew')
// router.post('/login',authValidation.validate(),authController.login)
router.post('/login',authValidation.validate(),authController.login)


module.exports = router;