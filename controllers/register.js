const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.register = async(req,res)=>{

    try{

        const{userName , fullName ,password, gender , dateOfBirth , country} = req.body;

        if(!userName ||  !fullName || !password){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        const existingUser = await User.findOne({userName});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist! Please Login"
            })
        }

        const hasedPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({userName, fullName , password:hasedPassword , gender , dateOfBirth, country})

        return res.status(200).json({
            success:true,
            message:"Account Created !",
            newUser
        })


    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Sever Error",
            error:err.message
        })
    }
}