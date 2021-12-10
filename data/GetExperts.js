const Expert = require("../models/expertProfile");
const getAllExperts = async(req,res)=>{
    try{
        allExperts=await Expert.find()
        res.status(200).json({
            status:"success",
            Experts:allExperts
        })
    }
    
    catch(e){
        res.status(400).json({
            status:"Failed to get all experts"
        })   
    }
}
const getExpertById = async(req,res)=>{
    try{
    expertId = req.params.id
    expert = await Expert.findById(expertId)
    res.status(200).json({
        status:"sucess",
        expert:expert 
    })
    }catch(e){
        res.status(400).json({
            status:"Failed to get single expert "
        })
    }
}
const updateExpertData = async(req,res)=>{
    try{
    expert = await Expert.findById(expertId)
    if(!expert){
        return res.status(404).json({status:"fail",message:"Cannot find the Expert"})
    }      
    // console.log(expert)
  
    updateExpert = await Expert.findByIdAndUpdate(req.params.id,req.body,  {
        new: true,
        runValidators: true
      })
    // updateExpert = await updateExpert.save();

    res.json({status:"success",message:"Expert has updated his email address",expert:updateExpert})

    }catch(e){
    res.status(404).json({status:"success",message:"Something went wrong",error:e})
    }
}
module.exports={
    getAllExperts,
    getExpertById,
    updateExpertData
}