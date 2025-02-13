const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.auth = async(req,res,next)=>{

    try{

        const token = req.header('Authorization').replace("Bearer" , "");

        // If JWT is missing, return 401 Unauthorized response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            })
        }

        try{
            // Verifying the JWT using the secret key stored in environment variables
            const decode = jwt.verify(token , process.env.JWT_SECRET)
            console.log(decode)

            // Storing the decoded JWT payload in the request object for further use
            req.user = decode
            
        }
        catch(err){
            return res.status(401).json({
                 success: false,
                  message: "Token is invalid"
                 });
        }

        next()

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error: err.message
        })
    }
}