import userModel from "../models/user.js"



// ading product into cart

const addtoCart=async (req,res)=>{
  try{
const {userId,itemId,size}=req.body

const userData=await userModel.findById(userId)
let cartData=userData.cartData;
if(cartData[itemId])
{
  if(cartData[itemId][size])
  {
cartData[itemId][size]+=1
  }
  else{
    cartData[itemId][size]=1;
  }
}
else{
  cartData[itemId]={}
  cartData[itemId][size]=1;
}

await userModel.findByIdAndUpdate(userId,{cartData})
return res.status(200).json({
  success:true,
  message:"added successfully"
})
}
catch(error)
{
return res.status(500).json({
success:false,
message:error.message
})
}
}


// get user of cart


const getUser=async (req,res)=>{
try{
const {userId}=req.body

const user=await userModel.findById(userId)
const cartData=user.cartData

return res.status(200).json({
  success:true,
  cartData
})

}
catch(error)
{
  return res.status(500).json({
    success:false,
    message:error.message
  })
}
}


// update the cart page
  const updateCart=async (req,res)=>{
try{

  const {userId,itemId,size,quantity}=req.body
    
  const userData=await userModel.findById(userId)
  let cartData=userData.cartData
//update the total
  cartData[itemId][size]=quantity
  await userModel.findByIdAndUpdate(userId,{cartData})


  return res.status(200).json({
    success:true,
    message:"updated successfully"
  })

}catch(error)
{
  return res.status(500).json({
    success:false,
    message:error.message
  })
}
  }


  export {addtoCart,getUser,updateCart}