const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.login = async(req,res)=>{
    try{

        const{userName , password} = req.body;

        if(!userName || !password){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await User.findOne({userName})

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found ! Please signup"
            })
        }

       
         
        if(await bcrypt.compare(password , user.password)){

            //create token

            const payload ={
                userName:user.userName,
                id:user._id,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET , {expiresIn:"2h"});

            // user.token = token
            // user.password=undefined

            const userObj = user.toObject();
            userObj.token = token
            userObj.password = undefined

            return res.status(200).json({
                success:true,
                message:"Login Sucessfull",
                userObj
            })

        }
        else{
            //if password not matched

            return res.status(401).json({
                success:false,
                message:"Password Incorrect"
            })
        }   

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:err.message
        })
    }
}