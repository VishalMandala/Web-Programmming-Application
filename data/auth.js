const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const User = require("../models/users")
const requireLogin=require("../middleware/requireLogin")
const GMAIL_USER ="haodongfortest@gmail.com"
const GMAIL_PASS = "2021test"
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS
  }
})
const protected=async(req,res)=>{
  res.send("Hello User")
}

const signup = async (req,res)=>{
  try{
    const {firstname,lastname,email,password,city,gender,state,age} = req.body 
 
    const userFromDB =await User.findOne({email:email})
    console.log(userFromDB)
    if(userFromDB){
        return res.status(422).json({error:"User Already Exists with that Email"})
    }
    const hashedpassword = await bcrypt.hash(password,12)
    const user = {
        email,
        password:hashedpassword,
        firstname,
        lastname,
        city,
        state,
        age,
        gender,
        role:"user"
    }
    newUser = await User.create(user)
    
    console.log(newUser)
    if(!newUser){
        return res.status(401).json({error:"New User Cannot be Registered"})
    }

    res.status(201).json({message:"User Profile Saved Successfully",newUser})
  }catch(error){
     return res.status(404).json({message:"Failed to SignUp",error:error})
  }
      
}
const signin =(req,res)=>{

  const {email,password} = req.body
  if(!email || !password){
     return res.status(422).json({error:"Email and Password Have to Be Entered"})
  }
  
  User.findOne({email:email})
  .then(savedUser=>{
    console.log(savedUser)
      if(!savedUser){
         return res.status(422).json({error:"Email or password incorrect"})
      }
      bcrypt.compare(password,savedUser.password)
      .then(doMatch=>{
          if(doMatch){
             const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)
             const {_id,name,email,role} = savedUser
             res.status(201).json({token,user:{_id,name,email,role}})
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
const updateUserData= async (req,res)=>{
  try{
   
    updateUser = await User.findByIdAndUpdate(req.params.id,{email:req.body.email,firstname:req.body.firstname}, {new: true,runValidators:true})
    // console.log(updateUser)
    // updateUser = await updateUser.save();
    if(updateUser){
      res.json({status:"success",message:"User has updated his Data",user:updateUser})

    }
    if(!updateUser){
      res.status(404).json({status:"success",message:"Something went wrong",error:e})

    }

    }catch(e){
   return  res.status(404).json({status:"success",message:"Something went wrong",error:e})
    }
}

const getUserById = async(req,res)=>{
  try{
  id = req.params.id
  user = await User.findById(id)
  res.status(200).json({
      status:"sucess",
      user: user 
  })
  }catch(e){
      res.status(400).json({
          status:"Failed to get single user "
      })
  }
}


const resetPassword = (req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User dont exists with that email"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.email,
                  from:"no-replay@webprogramminggroup15.com",
                  subject:"password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="http://localhost:4200/reset-password/${token}">link</a> to reset password</h5>
                  `
              })
              res.json({message:"check your email"})
          })

      })
  })
}


const newPassword = (req,res)=>{
  const newPassword = req.body.password
  const sentToken = req.params.token
  console.log(sentToken)
  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user=>{
      if(!user){
          return res.status(422).json({error:"Try again session expired"})
      }
      bcrypt.hash(newPassword,12).then(hashedpassword=>{
         user.password = hashedpassword
         user.resetToken = undefined
         user.expireToken = undefined
         user.save().then((saveduser)=>{
             res.json({message:"password updated success"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })
}



module.exports = {
    signup,
    signin,
    protected,
    updateUserData,
    resetPassword,
    newPassword,
    getUserById
}