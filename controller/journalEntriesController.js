const express = require('express')
const { successResponse, successResponseWithData, errorResponse, notFoundResponse, validationErrorWithData, unauthorizedResponse } = require('../lib/utils/apiResponse');
const generalPosting = require('../models/generalPosting.model')
const generalJournal = require('../models/generalJournal.Model')
module.exports = {
  posting: async (req, res) => {

    try {

      const gP = new generalPosting(req.body)
      const gJ = new generalJournal();

      // console.log(gJ.Debit.type)
      gP.save((err, result) => {
        gJ.Date = result.Date
        console.log(gJ.Date)
        gJ.Debit = result.Debit;
        gJ.Credit = result.Credit;
        gJ.Description = result.Description;
        // console.log(gL.Debit)
        // var array = [];
        // var DebitType = gL.Debit.forEach(u =>{
        
        //   // user = new UserModel(element.AdminContact)
        //   type = {type :u.type , value:u.value}
        //   console.log(type)
        //   array.push(type)
        // })
        // console.log(array[0].type)
       


       
       
        // var DebitAmount = gL.Debit.reduce(function (previousValue, currentValue) {

          
        //   // return { type: previousValue.type + currentValue.type }
        // });
        // var CreditAmount = gL.Credit.reduce(function (previousValue, currentValue) {
        //   return { value: previousValue.value + currentValue.value }
        // });
        //   console.log(CreditAmount.value)
        //   console.log(DebitAmount.value)
        // gL.TotalDebitAmount = DebitAmount.value;
        // gL.TotalCreditAmount = CreditAmount.value
        gJ.save();
        return successResponseWithData(res, result)
      })
    }
    catch (err) {
      return errorResponse(res, err);
    }
  },
  Entries: async (req, res) => {

    try {
      const gE = new generalJournal();
      generalJournal.findById({ _id: req.params._id },(err,gJ)=>{
        if (err) { return errorResponse(res, err); }
        generalJournal.Debit =req.body.Debit
        generalJournal.Credit =req.body.Credit
        const DebitEntries =  generalJournal.Debit;
        const CreditEntries = generalJournal.Credit
        // console.log(DebitEntries)
        // console.log(CreditEntries)

        // console.log(generalJournal.Debit)
        generalJournal.findOneAndUpdate({ _id: req.params._id }, { $push: { Debit : { $each: DebitEntries },Credit : { $each: CreditEntries }, } }, (err, entries) => {
          if (err) { return errorResponse(res, err); }

          console.log(entries.Debit)
          console.log(entries.Credit)
          return successResponseWithData(res, "Entries Added",entries)
      })
      //  console.log("-===")
      })
      
      
    }
    catch (err) {
      return errorResponse(res, err);
    }
  },
  Ledger_List : async(req,res)=>{

    try{
      generalJournal.findById({ _id: req.params._id  }).select("Debit , Credit ").exec((err, list) => {
        if (err) { return errorResponse(res, err) }
        const deb_list = list.Debit
        const Cr_list = list.Credit
        const CashArrayDebit = []
        const AccountPayableArrayDebit = []
        const AccountRecievableArrayDebit = []
        const ExpenseArrayDebit = []

        const CashArrayCredit = []
        const AccountPayableArrayCredit = []
        const AccountRecievableArrayCredit = []
        const ExpenseArrayCredit = []
       

        //Debit Account Loop
            for(let i=0; i<deb_list.length; i++){
              // console.log(deb_list[i].value)
              if(deb_list[i].type === 'A/C Payable'){  
                AccountPayableArrayDebit.push(deb_list[i].value)
              }
              else if(deb_list[i].type === 'Cash'){
                CashArrayDebit.push(deb_list[i].value)
              }
              else if(deb_list[i].type === 'Expense'){
                ExpenseArrayDebit.push(deb_list[i].value)
             }
             else if(deb_list[i].type === 'A/C Recievable'){
              AccountRecievableArrayDebit.push(deb_list[i].value)
           }
              }

              //Credit Amount Loop
              for(let i=0; i<Cr_list.length; i++){
                // console.log(deb_list[i].value)
                if(Cr_list[i].type === 'A/C Payable'){  
                  AccountPayableArrayCredit.push(Cr_list[i].value)
                }
                else if(Cr_list[i].type === 'Cash'){
                  CashArrayCredit.push(Cr_list[i].value)
                }
                else if(Cr_list[i].type === 'Expense'){
                  ExpenseArrayCredit.push(Cr_list[i].value)
               }
               else if(Cr_list[i].type === 'A/C Recievable'){
                AccountRecievableArrayCredit.push(Cr_list[i].value)
             }
                }
                CashCredit = CashArrayCredit.reduce(function(previousValue, currentValue) {
                  return previousValue + currentValue
                })
                APCredit = AccountPayableArrayCredit.reduce(function(previousValue, currentValue) {
                  return previousValue + currentValue
                })
                ARCredit = AccountRecievableArrayCredit.reduce(function(previousValue, currentValue) {
                  return previousValue + currentValue
                })
                ExpenseCredit = ExpenseArrayCredit.reduce(function(previousValue, currentValue) {
                  return previousValue + currentValue
                })
              // console.log(CashArray)
              // console.log(AccountPayableArray)
              // console.log(AccountRecievableArray)
              // console.log(ExpenseArray)
              CashDebit = CashArrayDebit.reduce(function(previousValue, currentValue) {
                return previousValue + currentValue
              })
              APDebit = AccountPayableArrayDebit.reduce(function(previousValue, currentValue) {
                return previousValue + currentValue
              })
              ARDebit = AccountRecievableArrayDebit.reduce(function(previousValue, currentValue) {
                return previousValue + currentValue
              })
              ExpenseDebit = ExpenseArrayDebit.reduce(function(previousValue, currentValue) {
                return previousValue + currentValue
              })
            //  const tt = await AccountPayableDebit();
            //  console.log(tt)
        return successResponseWithData(res, "Ledger List",
        {"Cash Debit" : CashDebit,"Account Payable Debit" : APDebit,"Account Recievable Debit" :ARDebit,"Expense Debit":ExpenseDebit,
        "Cash Credit" : CashCredit,"Account Payable Credit" : APCredit,"Account Recievable Credit" :"ARCredit","Expense Credit":ExpenseCredit
      })
        

      })
    }
    catch (err) {
      return errorResponse(res, err);
    }
  }
}

let AccountPayableDebit = async () =>{
  AccountPayable = AccountPayableArray.reduce(function(previousValue, currentValue) {
    return previousValue + currentValue
  })
  return AccountPayable;
}

let addKeyInMongoObject = async (list1, key_dynamic, value_dynamic) => {
  const json = JSON.stringify(list1);
  const listParse = JSON.parse(json, (key, val) => (
      typeof val !== 'object' && val !== null ? String(val) : val
  ));
  function addKeyValue(obj, key, data) {
      obj[key] = data;
  }
  listParse.map(function (KeyParse) {
      return addKeyValue(KeyParse, key_dynamic, value_dynamic);
  });
  return listParse;
}