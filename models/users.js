const mongoose = require("mongoose")
const forValidation = require("validator")
// const validatePassword=require("validator")
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"The User must Provide an Email"],
        trim:true,
        unique:true,
        validate:[forValidation.isEmail,"Please Enter A Valid Email Address"]
    },
      
    password:{
        type:String,
        required:[true,"The User must set a Password"],
        trim:true,
        validate:[forValidation.isStrongPassword,
            "Please enter A Valid Password[minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1]"]
    },
    firstname:{
        type:String,
        required:[true,"The User must have the firstname"],
        trim:true
    },
    lastname:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        enum:["male","female","others","prefer not to say"]
    },
    age:{
        type:Number,
        required:[true,"The User must enter their age"],
        min:[1,"The age must be above 1"],
        max:[100,"The age must be below 100"]
    },
    city:{
        type:String,
        trim:true,
        required:[true,"The User must enter the city name"]
    },
    state:{
        type:String,
        trim:true,
        required:[true,"The User must enter the state name"]
    },
    role:{
        type:String,
        default:"user"
    },
    resetToken:String,
    expireToken:Date})

const User = mongoose.model("User",userSchema)
module.exports = User