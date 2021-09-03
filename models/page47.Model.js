const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const page47Model = Schema({
    filePath : {type:String, required:true},
    updatedat: {
        type: Date,
        default: Date.now
    },
    active: { type: Boolean, default: true },
},{ timestamps: true })
module.exports = mongoose.model('page47',page47Model)