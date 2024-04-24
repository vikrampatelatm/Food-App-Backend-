import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:String,
    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    usertype:{
        type:String,
        required:[true,'user type is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
    },
    ans:{
        type:String,
        required:[true,'Anwser key is required']
    }, 
},{timestamps:true})

export default mongoose.model('User',userSchema);