import orderModel from "../models/orderModel.js"
import userModel from "../models/user.js"
import Stripe from 'stripe'

import dotenv from 'dotenv';
dotenv.config();

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
 


// placing ordder using cash on delivery method


const  placeOrderCOD=async(req,res)=>{
try{

    const {userId,items,amount,address}=req.body

      const orderData={
        userId,
        items,
        address,amount,
        paymentMethod:"COD",
        payment:false,
      }
      console.log(orderData);
      const newOrder=new orderModel(orderData)

      await newOrder.save()

      await userModel.findByIdAndUpdate(userId,{cartData:{}})

      return res.status(200).json({
        success:true,
        message:"order placed"
      })

}catch(error)
{
    res.status(500).json({
        success:false,
        message:error.message
    })
}
}

// placeing order usring Stripe method


const currency='inr'
const deliveryCharge= 10


const placeOrderStripe=async(req,res)=>{
try{
const {userId,items,amount,address}=req.body
const {origin}=req.headers
const orderData={
  userId,
  items,
  address,
  amount,
  paymentMethod:"Stripe",
  payment:false
}
const newOrder=new orderModel(orderData)
await newOrder.save()

const line_items=items.map((item)=>({
  price_data:{
    currency:currency,
    product_data:{
      name:item.name
    },
    unit_amount:item.price*100
  },
  quantity:item.quantity
}))
line_items.push({
  price_data:{
    currency:currency,
    product_data:{
      name:'Delivery Charges'
    },
    unit_amount:deliveryCharge*100
  },
  quantity:1
})

const session=await stripe.checkout.sessions.create({
  success_url:`${origin}/verify?success=true&&orderId=${newOrder._id}`,
  cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
  line_items,
  mode:'payment',
})
return res.status(200).json({
  success:true,
  session_url:session.url
})

}catch(error)
{
  return res.status(500).json({
    success:false,
    message:error.message
  })
}
}

// verify oayment of stripe


const verifyStripe=async (req,res)=>{
  const {orderId,success,userId}=req.body

   try{
if(success==='true')
{
  await orderModel.findByIdAndUpdate(orderId,{payment:true})
  await userModel.findByIdAndUpdate(userId,{cartData:{}})
  return res.status(200).json({
    success:true,
    message:"updated sucess"
  })
}
else{
  await orderModel.findByIdAndDelete(orderId)
  res.json({
    success:false
  })
}
   }catch(error)
   {
   return res.status(500).json({
      success:false,
      message:error.message


    })
   }
}



// place order using Razorpay method


const placeOrderRazor=async (req,res)=>{

}


// display all order in admin page

const allAdminOrder=async(req,res)=>{
try{
const orders=await orderModel.find({})

return res.status(200).json({
  success:true,
  orders
})
}catch(error)
{
  return res.status(500).json({
    success:false,
    message:error.message
  })
}
}

// order of user in frontend


const allUserOrder=async(req,res)=>{


 try{
  const {userId}=req.body
 const orders=await orderModel.find({userId})

 return res.status(200).json({
  success:true,
  orders
 })

 }catch(error)
 {
return res.status(500).json({
  success:false,
  message:error.message
})
 }

}



// update status of our order in admin pannel

const updateStatus=async(req,res)=>{
try{
  
const {orderId,status}=req.body

await orderModel.findByIdAndUpdate(orderId,{status})

return res.status(200).json({
  success:true,
  message:"updated sucessfully"
})
}catch(error)
{
  return res.status(500).json({
    success:false,
    message:error.message
  })
}
}

export {placeOrderCOD,verifyStripe,placeOrderRazor,placeOrderStripe,allAdminOrder,updateStatus,allUserOrder}