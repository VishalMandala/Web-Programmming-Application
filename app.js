// const passwordReset = require("./routes/passwordReset");
const express = require('express')
const userRouter = require("./routes/userRoutes")
const expertRouter = require("./routes/expertProfile")
const contactRouter = require("./routes/contactus.js")
const cors=require("cors")
const app = express()


const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions)) 
app.options('*', cors());
app.use(express.json())
app.use("/connpsych/users",userRouter)
app.use("/connpsych/experts",expertRouter)
app.use("/connpsych/contactus",contactRouter)

//app.use("/api/password-reset", passwordReset);

module.exports = app
