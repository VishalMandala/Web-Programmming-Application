

//  const stripe = require('stripe')("sk_test_51K1a0NJO0kMgjOQWHDkItuSH6v0xoLrpLi9hnHAGoWvhqUbJ1yGl2iXez5XeqltZgOVvSayKplawilkA8TBmLfJO008sydcjae")
var nodemailer = require('nodemailer');


 const chatExpert = async (req,res)=>{
     
     try{
    const {email , username ,room}=req.body
        

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'haodongfortest@gmail.com',
          pass: '2021test'
        }
      });
      
      var mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Payment of $100 Was Successful',
        text: `Thank You ${username} for your Payment. Begin chatting now with our ${room}`
      } 
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


     res.status(200).json({status:"SUCCESS",url:`http://localhost:5000/chat.html?email=${email}&username=${username}&room=${room}`})

     }catch(e){
     res.status(404).json({error:e,status:"fail"})

     }
     

    }

    module.exports = {
        chatExpert
    }
