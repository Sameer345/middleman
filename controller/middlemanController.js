const express = require('express')
const page47Model = require('../models/page47.Model')
const page57Model = require('../models/page57.Model')
const page51Model = require('../models/page51.Model')
const { successResponse, successResponseWithData, errorResponse, notFoundResponse, validationErrorWithData, unauthorizedResponse } = require('../lib/utils/apiResponse');

module.exports = {

  page47 : async(req,res)=>{
      try{
        
        var fileSize = 1 * 1000 * 1000;
        if (typeof req.file == undefined || req.file == null) {
            return errorResponse(res, "File is undefined.");
        }
        else if (req.file.size > fileSize) {
            return errorResponse(res, "File Size is too large.");
        }
        else {
            if (req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
                var path = req.protocol + '://' + req.get('Host') + '/public/file/' + req.file.filename;

                var page47 = page47Model(req.body)
                page47.filePath = path;
                page47.save((err) => {
                    if (err) { return res.send(res, err) }
                    return successResponseWithData(res, "Data saved successfully")
                })
             
            }
            else {
                return errorResponse(res, "File must be in JPG,JPEG or PNG Format");
               
            }
        }
        
      }
      catch (err) {
        return  errorResponse(res, err);
    }
  },
  page57 : async(req,res)=>{
      try{
        var fileSize = 1 * 1000 * 1000;
        if (typeof req.file == undefined || req.file == null) {
            return errorResponse(res, "File is undefined.");
        }
        else if (req.file.size > fileSize) {
            return errorResponse(res, "File Size is too large.");
        }
        else {
            if (req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
                var path = req.protocol + '://' + req.get('Host') + '/public/files/' + req.file.filename;

                var page57 = page57Model(req.body)
                page57.filePath = path;
                page57.save((err) => {
                    if (err) { return res.send(res, err) }
                    return successResponseWithData(res, "Data saved successfully")
                })
             
            }
            else {
                return errorResponse(res, "File must be in JPG,JPEG or PNG Format");
               
            }
        }
      }
      catch (err) {
        return  errorResponse(res, err);
    }
  },
  page51 : async(req,res)=>{

    try{
    const page51 = new page51Model(req.body);
    await page51.save();
    return res.send(page51);
    }
    catch (err) {
        return errorResponse(res, err);
    }
}

}