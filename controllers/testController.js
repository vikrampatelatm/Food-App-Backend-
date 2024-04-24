const testUserController = (req,res)=>{
     try{
             res.status(200).send({
                success:true,
                message:"test user data api",
             });
     }catch(err){
           console.log("error",err);
     }
};

export default testUserController;