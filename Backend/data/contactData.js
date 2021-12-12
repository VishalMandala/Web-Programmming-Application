const Contact = require("../models/contactus")
const GMAIL_USER ="haodongfortest@gmail.com"
const GMAIL_PASS = "2021test"
// const GMAIL_USER ="groupwebprogramming@gmail.com"
// const GMAIL_PASS = "webprogramming@2021"
const nodemailer = require("nodemailer")

const contactDatPost =async (req,res)=>{
    try{
        const {name,email,category}=req.body
        if(!name){
           return res.status(400).json({message:"Name not provided"}) 
        }
        if(!email){
            return res.status(400).json({message:"Email not provided"}) 
         }
         if(!category){
            return res.status(400).json({message:"Category not provided"}) 
         }
        newContactus = await Contact.create({name,email,category})
        console.log(newContactus)
        if(!newContactus){
            return res.status(400).json({message:"Something went Wrong.Please Try Again with Correct Input Fields"}) 
        }
        if(newContactus){
            const smtpTrans = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                  user: GMAIL_USER,
                  pass: GMAIL_PASS
                }
              })
            
              // Specify what the email will look like
              const mailOpts = {
                from: 'Your Info here', // This is ignored by Gmail
                to: email,
                subject: 'Thank You for connecting with CONNPSYCH',
                text: `Your Response has been recorded & we will get back to you shortly!
                {break;} Name: ${name} Email: (${email}) Category: ${category}`
              }
            
              // Attempt to send the email
              smtpTrans.sendMail(mailOpts, (error, response) => {
                if (error) {
                  res.json({ success: false, message: 'noooooo with login'}) // Show a page indicating failure
                }
                else {
                  res.json({ success: true, message: 'Success with Login'}) // Show a page indicating success
                }
              })
              res.json({message:"Successfully Submitted Contact Us Form ",information:newContactus})      
        } 
    }catch(e){
        return res.status(400).json({message:"Error: Something went Wrong. Check your Input Fields Again ",error:e})
    }
   
}
module.exports = {contactDatPost}