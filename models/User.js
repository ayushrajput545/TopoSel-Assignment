const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true,
    },

    fullName:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    gender:{
        type:String,
    },

    dateOfBirth:{
        type:Date
    },

    country:{
        type:String
    }

})

module.exports = mongoose.model('User', userSchema);