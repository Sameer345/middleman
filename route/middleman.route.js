const express = require('express')
const router = express.Router()
const moddilemanController = require('../controller/middlemanController')
const multer = require('multer')
const path = require('path')

const storageFile = multer.diskStorage({
    destination: './public/file',
    filename: function (req, file, fn) {
        fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname))
    }
})

const storage = multer.diskStorage({
    destination: './public/page57',
    filename: function (req, file, fn) {
        fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname))
    }
})
var upload = multer({storage: storageFile}).single('file')
var upload1 = multer({storage: storage}).single('files')
router.post('/page51', moddilemanController.page51);
router.post('/page47',upload,moddilemanController.page47);
router.post('/page57',upload1,moddilemanController.page57)
module.exports = router