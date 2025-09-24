
const mongoose=require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema=new mongoose.Schema(
    {
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
         required:true
    },
    age:{
        type:String,
        min:18
    },
    gender:{
        type:String,
        enum:{
            values:['male', 'female', 'other'],
            message:`{VALUE} is not  a valid  gender type`
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.mjunction.in/wp-content/uploads/2020/09/Dummy.jpg"
    },
    about:{
        type:String,
        default:"This is Default About Me"
    },
    skills:{
        type:[String]
    },
   
    

},{
    timestamps:true
}) 

userSchema.methods.getJWT = function () {
  return jwt.sign(
    { _id: this._id },
    "DEV@Tinder$790",     
    { expiresIn: "7d" }
  );
};



module.exports=mongoose.model('User',userSchema)