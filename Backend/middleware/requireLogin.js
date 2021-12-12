const jwt=require('jsonwebtoken')
//const {JWT_SECRET}=require('../keys')
const mongoose=require('mongoose')
const User=mongoose.model("User")

module.exports=(req,res)=>{
    const {authorization}=req.headers
    if(!authorization){
        res.status(401).json({error:"You Must Be Logged In"})
    }
    const token= authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(error,payload)=>{
        if(error){
            return res.status(401).json({error:"You Must Be Logged In"})
        }

        const {_id}=payload
        User.findById(_id).then(userdata=>{
            req.user=userdata
        })
        next()
    })
}
   