const mongoose = require("mongoose")
const forValidation = require("validator")
// const validatePassword=require("validator")
const expertSchema = new mongoose.Schema({
    email:{
        type:String,
        lowercase:true,
        required:[true,"The Expert must Provide an Email"],
        trim:true,
        unique:true,
        validate:[forValidation.isEmail,"Please Enter A Valid Email Address"]
    },
      
    password:{
        type:String,
        required:[true,"The Expert must set a Password"],
        trim:true,
        validate:[forValidation.isStrongPassword,
            "Please enter A Valid Password[minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1]"]
    },
    name:{
        type:String,
        required:[true,"The User must have the firstname"],
        trim:true
    },
    qualification:{
        // lowercase:true,
        type:String
        // required:[true,"The Expert must enter his qualification"]
    },
    specialization:{
        type:String
        // enum:["forensic psychiatrist","addiction psychiatrist","neuro psychiatrist","child & adolescent psychiatrist","geriatric psychiatrist"]
    },
    status:{
        type:String
        // enum:["online","offline"]
    },
    role:{
        type:String,
        default:"expert"
    }
})

const Expert = mongoose.model("Expert",expertSchema)
module.exports = Expert