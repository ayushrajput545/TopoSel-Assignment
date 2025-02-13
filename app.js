const express = require('express')
const app = express()
const dbConnect = require('./config/database')
require('dotenv').config()
const userRoute = require('./routes/userRoutes')

PORT = process.env.PORT || 4000

dbConnect();

app.use(express.json())
app.use('/api/v1',userRoute)


app.get('/', ()=>{
    res.send("API WORKING");
})

app.listen(PORT , ()=>{
    console.log(`Server is running at PORT no. ${PORT}`);
})