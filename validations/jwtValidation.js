const { successResponse, successResponseWithData, errorResponse, notFoundResponse, validationErrorWithData, unauthorizedResponse } = require('../lib/utils/apiResponse');
const jwt = require('jsonwebtoken');
module.exports = {
    validateToken: (req, res, next) => {
      const authorizationHeaader = req.headers.authorization;
    //   console.log(authorizationHeaader)
      let result;
      if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
//         const options = {
//           expiresIn: '2d',
//    //       issuer: 'https://scotch.io'
//         };
        try {
          // verify makes sure that the token hasn't expired and has been issued by us
          result = jwt.verify(token,'secret', {expiresIn: "3d"});
  
          // Let's pass back the decoded token to the request object
          req.decoded = result;
          console.log(req.decoded,"=====")
          // We call next to pass execution to the subsequent middleware
          next();
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