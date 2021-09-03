const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const generalJournalModel = Schema({
    Date : {type: String, required: true},
    // Account : {
    //     type :Object
    // },
    Debit:{
        type: Array, default :0,
     },
     Credit:{
        type: Array, default :0,
     },
     Description:{
        type: String, required:true,
     },
    updatedat: {
        type: Date,
        default: Date.now
    },
    // active: { type: Boolean, default: true },
},{ timestamps: true })

module.exports = mongoose.model('generalJournal',generalJournalModel)