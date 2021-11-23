const express = require('express');
const app = express();

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;


//Middleware
app.use(express.static('public'));
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contactus.html')
});

app.post('/', (req, res) =>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'haodongfortest@gmail.com',
            pass: '2021test'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'lihaodong97@gmail.com',
        subject: `${req.body.personCategory}: ${req.body.name}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    })

});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});