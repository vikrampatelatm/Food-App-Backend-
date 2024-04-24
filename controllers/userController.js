import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'

const getUserController = async(req,res) => {
    try{
        const user = await userModel.findOne({ _id:req.body.id})

        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found with this token"
            })
        }
        console.log(req.body.id);
        return res.status(200).send({
            message:"user data",
            user
           })
    }catch(err){
        console.log(err+"error in user controller catach ")
        res.status(500).send({
            success:false,
            message:"error in get id from token"
        })
    }

}
const updateUserController = async(req,res) =>{
    try{
        const user = await userModel.findById({_id:req.body.id})

        if(!user){
            return res.status(404).send({
                success:false,
                message:"un authorized for update"
            })
        }
        const {username,phone,address} = req.body;
        console.log()
        if(username) user.username = username;
        if(phone) user.phone = phone;
        if(address) user.address = address;

        await user.save();
        res.status(200).send({
            success:true,
            message:"updated sucessful"
        })

    }catch(err)
    {
         console.log(err);
         res.status(500).send({
            success:false,
            message:"errr in upadating"
         })
    }
}

const updatePasswordController = async(req,res) =>{
    try{
        const user = await userModel.findById({_id:req.body.id})

        if(!user){
            return res.status(404).send({
                success:false,
                message:'user Not found'
            })
        }
        const {oldPassword,newPassword} = req.body;
        if(!oldPassword ||!newPassword){
            res.status(404).send({
                success:false,
                message:"passwords are not provided for upddate"
            })
        }
        const ismatach = await bcrypt.compare(oldPassword,user.password);
        
        console.log(oldPassword);
        console.log(newPassword);
        if(!ismatach){
            return res.status(404).send({
                message:"Invalid password"
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt)
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            message:"password updated"
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"error in password update api",
            err
        })
    }

}

const resetPasswordController = async (req, res) => {
    try {
        const { Email, newPassword, ans} = req.body;
        console.log(Email+" "+newPassword+" "+ans)
        // Input validation
        if (!Email || !newPassword || !ans) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            });
        }

        // Find user
        const user = await userModel.findOne({ email: Email});
        console.log(user.ans)
       
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });
    } catch (error) {
        console.error("Error in resetPassword API:", error);
        return res.status(500).json({
            success: false,
            message: "Error in resetPassword API"
        });
    }
};


const deleteUserController = async(req,res) => {
      try{
       await userModel.findByIdAndDelete(req.params.id);
       return res.status(200).send({
        success:true,
        message:"Your Account has been deleted"
       })
      }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in deleteUserAPi"
        })
      }
}


export {getUserController,updateUserController,updatePasswordController,resetPasswordController,deleteUserController};