const mongoose = require("mongoose")
const dotenv = require('dotenv')
const app = require('./app')
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {origin : '*'}
  });


dotenv.config({path:'./config.env'})

mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useNewUrlParser:true
}).then(()=>{console.log("Connected to MongoDb Database")}).catch(e=>{console.log({message:"Failed to connect",error:e})})

const PORT = process.env.PORT || 5000

io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('message', (message) => {
      console.log(message);
      io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    });
  
    socket.on('disconnect', () => {
      console.log('a user disconnected!');
    });
  });

  httpServer.listen(PORT,()=>{console.log(`Application is running on ${PORT}`)})