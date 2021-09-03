const express = require('express')
const router = express.Router()
const userRoute = require('./user.route')
const authRoute = require('./auth.route')
const journalEntriesRoute = require('./GeneralJournal.route')
const middlemanRoute = require('./middleman.route')
//--------- Route ------------
router.use("/admin",userRoute)
router.use('/auth',authRoute)
router.use('/general',journalEntriesRoute)
router.use('/middleman',middlemanRoute)
// Api Router Testing
router.get('/test',(req,res)=>{
    res.send("Hello")
})
module.exports = router;