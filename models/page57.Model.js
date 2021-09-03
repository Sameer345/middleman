const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const page57Model = Schema({
    header_Description : {type:String, required:true},
    filePath : {type:String, required:true},
    title : {type:String, required:true},
    price : {type:Number, required:true},
    updatedat: {
        type: Date,
        default: Date.now
    },
    active: { type: Boolean, default: true },
},{ timestamps: true })
module.exports = mongoose.model('page57',page57Model)