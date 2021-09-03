const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const route = require('./route/index.route')

//------- CORS ---------------
const corsOptions ={
    origin:'http://localhost:8080', 
    // credentials:true,            //access-control-allow-credentials:true
    // optionSuccessStatus:200
}
app.use(cors());

//--------- Body Parser --------------
app.use(bodyParser.json())
//---------------import .env file-------------
require('dotenv').config()
const PORT = process.env.PORT || 8081;
app.use(route)

//-------- Mongoose -------------
var MONGODB_URL = process.env.MONGODB_URL

//-----------------mongoose Connection----------------
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(() => {

    console.log("Connected to %s", MONGODB_URL);
    console.log("App is running ... \nPort : " + PORT);
    console.log("Press CTRL + C to stop the process. \n");
})
    .catch(err => {
        console.error("App starting error:", err.message);
        process.exit(1);
    });
app.listen(PORT,()=>{
    console.log("Server is Running on Port", PORT)
})

module.exports = app