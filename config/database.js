const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("DB CONNECTION SUCCESSFULL")
    })
    .catch((err)=>{
        console.log("Failed To Connect DB")
    })
}

module.exports = dbConnect