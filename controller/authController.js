const express = require('express')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator')
const userModel = require('../models/user.Model')
const { successResponse, successResponseWithData, errorResponse, notFoundResponse, validationErrorWithData, unauthorizedResponse } = require('../lib/utils/apiResponse');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                //    res.send("+++++")
                return validationErrorWithData(res, 'Validation Error', errors.array())
            }
            else {
                userModel.findOne({ email: req.body.email }, function (err, user) {
                    if (!user) {
                        return errorResponse(res, 'User Not Found')
                    }
                    bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                        if (!isMatch) {

                            return unauthorizedResponse(res, 'Invalid Password')
                        }
                        if (isMatch) {

                            var token = jwt.sign({


                                username: user.username,
                                email: user.email

                            },
                                'secret',
                                {
                                    expiresIn: "3h"
                                }
                            )
                        }
                        
                        // userModel.find({ token }, (err,isT) => {
                        //     if (err) { return errorResponse(res, err) }
                        //     if (isT == "null") {
                        //         return errorResponse(res, "Token is Expired");
                        //     }

                            // else {
                                userModel.findOneAndUpdate({ email: req.body.email }, { $set: { token: token } }, { upsert: true }, function (err) {
                                    if (err) { return errorResponse(res, err) }
                                    res.status(201).json({
                                        message: "Login successfully.",
                                        token: "Bearer " + token,
                                        user: { _id: user._id, name: user.username, email: user.email }
                                    })
                                }
                                )
                            // }
                        // })
                        // userModel.find({token:null},(err)=>{
                        //     if(token == "null"){
                        //         userModel.findOne({token:null},(err,exp)=>{
                        //         if (err) { return errorResponse(res, err) }
                        //         return errorResponse(res, "Token is Expired");
                        //     })
                        //     }
                        //     else{
                        //         userModel.findOneAndUpdate({ email : req.body.email }, { $set: { token: token } }, { upsert: true }, function (err) {
                        //             if (err) { return errorResponse(res, err) }

                        //             // userModel.findOne({token:null},(err,exp)=>{
                        //             //     if (err) { return errorResponse(res, err) }
                        //             //     return errorResponse(res, "Token is Expired");
                        //             // })
                        //         // userModel.token = token

                        //         res.status(201).json({

                        //             message: "Login successfully.",
                        //             token: "Bearer " + token,
                        //             user: { _id: user._id, name: user.username, email: user.email}
                        //         })
                        //     })
                        //     }
                        // })


                        // else{
                        //     userModel.findOneAndUpdate({ email : req.body.email }, { $set: { token: token } }, { upsert: true }, function (err) {
                        //         if (err) { return errorResponse(res, err) }

                        //         // userModel.findOne({token:null},(err,exp)=>{
                        //         //     if (err) { return errorResponse(res, err) }
                        //         //     return errorResponse(res, "Token is Expired");
                        //         // })
                        //     // userModel.token = token

                        //     res.status(201).json({

                        //         message: "Login successfully.",
                        //         token: "Bearer " + token,
                        //         user: { _id: user._id, name: user.username, email: user.email}
                        //     })
                        // })
                        // }
                        // }
                    })
                })
            }


        }
        catch (err) {
            return errorResponse(res, err);
        }
    }
}