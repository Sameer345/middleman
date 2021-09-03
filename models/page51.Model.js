const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const page51Model = Schema({
    full_name : {
        type: String, required : true
    },
    title:{
        type: String, required : true
     },
     price:{
        type: Number,  required: true,
     },
     contact_no:{
        type: Number,  required: true,
     },
     Description:{
        type: String, required:true,
     },
     offer : {type: Boolean, default : false},
    updatedat: {
        type: Date,
        default: Date.now
    },
    // active: { type: Boolean, default: true },
},{ timestamps: true })

module.exports = mongoose.model('page51',page51Model)