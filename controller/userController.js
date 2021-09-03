const express = require('express')
const mongoose = require('mongoose')
const userModel = require("../models/user.Model")
const bcrypt = require("bcrypt");
const salt = 10;
const { validationResult } = require('express-validator')
const { successResponse, successResponseWithData, errorResponse, notFoundResponse, validationErrorWithData, unauthorizedResponse } = require('../lib/utils/apiResponse');
module.exports = {
    register: async (req, res) => {

        try {
            //--------check validation----------
            const error = validationResult(req);
            //----------If Error Found----------
            if (!error.isEmpty()) {
                return validationErrorWithData(res, 'validations error.', error.array());
            }

            else {
                var username = req.body.username;
                var email = req.body.email;
                var password = req.body.password;
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        return res.status(404).json({
                            message: "Something Wrong!!",
                            error: err
                        })
                    }
                    else {
                        var users = new userModel({
                            username: username,
                            email: email,
                            password: hash,
                        })

                        users.save((err) => {
                            if (err) { return errorResponse(res, err) }
                            return successResponseWithData(res, "Success")
                            // dataUser = { _id: userDetail._id, name: userDetail.name, email: userDetail.email }
                            // return successResponseWithData(res, "user Registration Success.", dataUser);
                        })

                    }
                });
                //     else{
                //   hashGenerate =  Math.floor((Math.random() * 100000))
                //   var name = req.body.name;
                //   var email = req.body.email;
                //   var password = req.body.password;



                // //   req.body.password = await hashPassword(hashGenerate);
                //   var user = new userModel({

                //   })

                //   user.save((err)=>{
                //       if(err){return errorResponse(res,err)}

                //       return successResponseWithData(res,"Success")

                //   })
                // }
            }
        }
        catch (err) {
            return errorResponse(res, err);
        }
    },
    logout: async (req, res) => {
        try {

            // userModel.findOne({ email : req.body.email }, function (err) {
            //     if (err) { return errorResponse(res, err) }
            //     userModel.deleteOne()
            //     // return successResponseWithData(res,"Expired")
            // })
            if (!req.headers["authorization"]) {
                return errorResponse(res, "Authorization Token not be empty");

            }
            else {
                const auth_token = req.headers["authorization"]
                userModel.findOneAndUpdate({ token: auth_token }, { $set: { token: null } }, function (err, data) {
                    console.log(auth_token)
                    if (err) { return errorResponse(res, err) }
                    if (data) {
                        return successResponseWithData(res, "Logout Successfully")
                    }
                    else{
                        return errorResponse(res, "Can not delete User with token:",auth_token);

                    }
                })
            }
            // userModel.findOneAndUpdate({ email : req.body.email }, { $set: { token: null } }, function (err) {
            //     if (err) { return errorResponse(res, err) }
            //     return successResponseWithData(res,"Expired")
            // })
            //Delete One Column
            // userModel.findOneAndUpdate({ email : req.body.email }, { $unset: { token: 1 } }, function (err) {
            //     if (err) { return errorResponse(res, err) }
            //     return successResponseWithData(res,"Expired")
            // })
        }
        catch (err) {
            return errorResponse(res, err);
        }

    }
}

async function hashPassword(encryptKey) {

    const random_password = encryptKey

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(random_password, salt, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword
}


