import mongoose from "mongoose";

//connection
const connectDB = async () => {
    try{
           await mongoose.connect(process.env.MONGO_URL);
           console.log("Database connected");
    }catch(err){
        console.log("DB Error",err);
    }
}

export default connectDB;