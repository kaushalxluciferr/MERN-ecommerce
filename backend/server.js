import express from 'express'
import cors from 'cors'
// import 'dotenv/config'
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudnary.js'
import router from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
// app configure 
const app=express()
connectDB()
connectCloudinary()


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//api endpoints
app.use('/api/user',router)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("hey sanamika,how do you do")
})

app.listen(process.env.PORT,()=>console.log("server started"))