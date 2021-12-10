const Expert = require("../models/expertProfile")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signupExpert = async (req,res)=>{
    try{
      const {email,password,name,qualification,status,specialization} = req.body 
     
      //Error handling: 
    //  if(firstname===null||firstname===undefined){
    //   return res.status(422).json({error:"Invalid First Name"})
    //  }
   
    //  if(lastname===nul||lastname===undefined){
    //   return res.status(422).json({error:"Invalid Last Name"})
    //  }
  
    //  if(email===null||email===undefined){
    //   return res.status(422).json({error:"Invalid Email Address"})
    //  }
  
    //  if(password===null||password===undefined){
    //   return res.status(422).json({error:"Invalid Password Entry"})
    //  }
  
    //  if(gender===null||gender===undefined){
    //   return res.status(422).json({error:"Invalid Gender"})
    //  }
  
    //  if(city===null||city===undefined||state===null||state===undefined){
    //   return res.status(422).json({error:"Invalid Demographics"})
    //  }
    //  if(age===null||age===undefined){
    //   return res.status(422).json({error:"Invalid Age"})
    //  }
    console.log(req.body)
      const userFromDB =await Expert.findOne({email:email})
      if(userFromDB){
          return res.status(422).json({error:"User Already Exists with that Email"})
      }
      const hashedpassword = await bcrypt.hash(password,12)
      const user = {
          email,
          password:hashedpassword,
          name,
          qualification,
          specialization,
          status
      }
      newUser = await Expert.create(user)
  
  
      if(!newUser){
          return res.status(401).json({error:"New User Cannot be Registered"})
      }
  
      res.status(201).json({message:"Expert Profile Saved Successfully",newUser})
    }catch(error){
       return res.status(404).json({message:"Failed to SignUp",error:error})
    }
        
  }
  const signInExpert = (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"Email and Password Have to Be Entered"})
    }
    Expert.findOne({email:email})
    .then(savedUser=>{
      console.log(savedUser)
        if(!savedUser){
           return res.status(422).json({error:"Invalid Credentials"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
               const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)
               const {_id,name,email} = savedUser
               res.status(201).json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid Credentials"})
            }
        })
        .catch(error=>{
            // console.log(err)
            return res.status(404).json({message:"Failed to Sign In",error:error})
        })
    }).catch(e=>{
      return res.status(404).json({message:"Failed to Sign In",e})
    })
  }
  module.exports = {
      signupExpert,
      signInExpert
  }