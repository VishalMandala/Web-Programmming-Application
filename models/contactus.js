const mongoose = require("mongoose")
const forValidation = require("validator")
const contactSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"The User must Provide an Email"],
        unique:false,
        validate:[forValidation.isEmail,"Please Enter A Valid Email Address"]
    },
    name:{
        type:String,
        required:[true,"The User must have a First Name"],
        trim:true
    },
    category:{
        type:String,
        lowercase:true,
        trim:true
    }
    
})

const Contact = mongoose.model("Contact",contactSchema)
module.exports = Contact