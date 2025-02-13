const User = require('../models/User')

exports.searchUser = async(req, res)=>{
    try{

        const userid = req.user.id // we pass this in req.user from decode during jwt verification

        const searchUser = await User.findById(userid).populate().exec();

        return res.status(200).json({
            success:true,
            message:"User Data Fetched",
            searchUser
        })
        
    }
    catch(err){
        console.log(err)
        
        return res.status(500).json({
             success:false,
             message:"Internal Server Error",
             error:err.message
        })


    }
}