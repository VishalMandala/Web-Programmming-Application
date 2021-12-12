// const passwordReset = require("./routes/passwordReset");
const express = require('express')
const userRouter = require("./routes/userRoutes")
const expertRouter = require("./routes/expertProfile")
const contactRouter = require("./routes/contactus.js")
const chat_expertRouter = require("./routes/chat_expert")
const cors=require("cors")
const xss = require('xss-clean')
const app = express()

const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions)) 
app.options('*', cors());
app.use(express.json())
app.use(xss())
app.use("/connpsych/users",userRouter)
app.use("/connpsych/experts",expertRouter)
app.use("/connpsych/contactus",contactRouter)
app.use("/connpsych/chat",chat_expertRouter)
app.all('*',(req,res)=>{
    res.status(404).json({error:"No such Route Exists"})
})

//app.use("/api/password-reset", passwordReset);

module.exports = app
