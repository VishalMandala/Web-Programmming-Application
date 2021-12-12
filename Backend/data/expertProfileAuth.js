const Expert = require("../models/expertProfile")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signupExpert = async (req,res)=>{
    try{
      const {email,password,name,qualification,status,specialization} = req.body 
     
      //Error handling: 
    if(name===null||name===undefined){
      return res.status(400).json({error:"NAME IS REQUIRED"})
     }
 
     if(typeof name!=='string'|| name.length==0 )
    {
       return res.status(400).json({error:"Name Must be a String/Name must not be empty"})
     }
 
     if(typeof email !='string' || email.length==0){
       return res.status(400).json({error:"Email must be a String/Email must not be empty"})
     }
 
     if(password.length<4){
       return res.status(400).json({error:{error:"Password Must be of at least 4 Characters!"}})
     }


    // console.log(req.body)
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

    if(email.length===0){
      return res.status(422).json({error:"Email can't be empty"})
    }
  
    if(password.length===0){
      return res.status(422).json({error:"Password can't be empty"})
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