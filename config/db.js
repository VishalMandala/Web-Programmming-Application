//Database Config

const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
        const conct = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conct.connection.host}`)
    }
    catch{
        console.log(`ERROR: ${err.message}`);
        process.exit(1);//Stop everything 
    }
}

module.exports=connectDB;