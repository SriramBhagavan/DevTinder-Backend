
const mongoose=require('mongoose')

const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://Bhagavan:Mongodb%40545@cluster0.gnjempb.mongodb.net/devTinder");


}

module.exports=connectDB;

