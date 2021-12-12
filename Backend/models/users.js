const mongoose = require("mongoose")
const forValidation = require("validator")
// const validatePassword=require("validator")
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"The User must Provide an Email"],
        trim:true,
        lowercase:true,
        unique:true,
        validate:[forValidation.isEmail,"Please Enter A Valid Email Address"]
    },
      
    password:{
        type:String,
        required:[true,"The User must set a Password"],
        trim:true,
        // min:[8,"Password must be at least 8 Characters long!"],
         // validate:[forValidation.isStrongPassword,
        //     "Please enter A Valid Password[minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1]"]
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
        lowercase:true,
        type:String,
        enum: {
            values: ["male","female","others","prefer not to say"],
            message: 'Gender must be either Male,Female,Others,Prefer Not To Say'
        }
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
        required:[true,"The User must enter a City Name"]
    },
    state:{
        type:String,
        trim:true,
        required:[true,"The User must enter a State Name"]
    },
    role:{
        type:String,
        default:"user"
    },
    resetToken:String,
    expireToken:Date})

const User = mongoose.model("User",userSchema)
module.exports = User