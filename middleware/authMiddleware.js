import JWT from 'jsonwebtoken';

const authMiddleware = (req,res,next) =>{
     try{
            const token = req.headers["authorization"].split(" ")[1]
            JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
                if(err){
                    return res.status(401).send({
                        success:false,
                        message:"Un-authorized user"
                    })
                }else{
                    req.body.id = decode.id
                }
            })
            next()
     }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Auth API",
            error
        })
     }
}


export default authMiddleware;