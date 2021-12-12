const mongoose = require("mongoose")
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({path:'./config.env'})

mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useNewUrlParser:true
}).then(()=>{console.log("Connected to MongoDb Database")}).catch(e=>{console.log({message:"Failed to connect",error:e})})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{console.log(`Application is running on ${PORT}`)})