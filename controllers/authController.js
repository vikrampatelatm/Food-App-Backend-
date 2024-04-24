import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const registerController = async (req,res) => {
     try{  
        const {username,email,password,phone,address,ans} = req.body;

        //validation
        if(!username || !email || !password || !phone || !address || !ans){
            return res.status(500).send({
                success:false,
                message:'pls provide all field'
            })
        }
        const existing  = await userModel.findOne({email});
        if(existing){
            return res.status(500).send({
                success:false,
                message:'Email Already Registerd pls login'
            })
        }
        //hashing
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user  = await userModel.create({
            username,
            email,
            password:hashedPassword,
            address,
            phone,
            ans
        })
        res.status(200).send({
            success:true,
            message:'Successfull Register'
        })

     }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:'Error In Register API',
            err
        })
     }
}

const loginController = async (req,res) =>{
     try{
        const {email,password}=req.body;
           if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"pls provide email and password"
            })
           }
           
           const user = await userModel.findOne({email:email});
           if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found "
            })
           }
           //compare password
           const isMatch = await bcrypt.compare(password,user.password)
           if(! isMatch){
            return res.status(404).send({
                success:false,
                message:"password mismatach"
            })
           }
           //token
           const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
           console.log(token)
           res.status(200).send({
            success:true,
            message:"login successfull",
            user,
            token
           })
     }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Error In Login API",
            err
        })
     }
}



export { registerController, loginController};
