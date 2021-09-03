const { successResponse, successResponseWithData, errorResponse, notFoundResponse, validationErrorWithData, unauthorizedResponse } = require('../lib/utils/apiResponse');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.Model')
module.exports = {
    validateToken: (req, res, next) => {

      const authorizationHeaader = req.headers.authorization;
    //   console.log(authorizationHeaader)
      let result;
      let token1;
      if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        try {
             
            // console.log(token)
            userModel.findOne({token: token},(err,getToken)=>{
                    // console.log(getToken)
               if(!getToken){
                token1=token;
                // console.log(token1)
                return errorResponse(res, "Token is not Recognized");
                

               }
               else{
                   token1 = getToken.token;
                    // console.log(token1)

               }
           
        jwt.verify(token1, 'secret', (err, decoded) => {
            if (err) {
              return res.status(401).send({
                message: "Unauthorized!"
                
              });
             // return res.redirect('/login')
            }
            // req.userId = decoded.id;
            next();
          });
          
          // Let's pass back the decoded token to the request object
         // req.decoded = result;
          //console.log(req.decoded,"=====")
          // We call next to pass execution to the subsequent middleware
        //   next();
            })
        } catch (err) {
          // Throw an error just in case anything goes wrong with verification
          unauthorizedResponse(res,"Authentication error. Invalid Token.")  
        }
      } else {
        unauthorizedResponse(res,"Authentication error. Token required.")  
        // result = { 
        //   error: `Authentication error. Token required.`,
        //   status: 401
        // };
        // res.status(401).send(result);
      }
    }
  };