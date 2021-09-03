const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userModel = Schema({
    username : {type: String, required: true},
    email : {
        type :String, required: true,
        index:{
            unique : true,
        },
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String, required: true,
    },
    token:{
        type: String
     },
    updatedat: {
        type: Date,
        default: Date.now
    },
    // active: { type: Boolean, default: true },
},{ timestamps: true })

module.exports = mongoose.model('user',userModel)