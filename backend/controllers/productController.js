
import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';
// Adding the product in the product

const addProduct= async (req,res)=>{
try{
    const {name,description,price,category,subCategory,sizes,bestseller}=req.body

const image1 = req.files.image1 && req.files.image1[0] 
const image2 = req.files.image2 && req.files.image2[0] 
const image3 = req.files.image3 &&req.files.image3[0] 
const image4 = req.files.image4 &&req.files.image4[0] 

const images=[image1,image2,image3,image4].filter((item)=>item!==undefined)

let imagesUrl=await Promise.all(
    images.map(async (item)=>{
let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
return result.secure_url
    })
)
console.log(imagesUrl);


   const productData={
    name,description,
    category,price:Number(price),
    subCategory,bestseller:bestseller==='true'? true:false,
    sizes:JSON.parse(sizes),
    image:imagesUrl,
    
   }
   const product=new productModel(productData)
    await product.save()
    return res.status(200).json({
        success:true,
        message:"sucessfull"
    })
}catch(error)
{
    return res.status(500).json({
        success:false,
        message:"hey dude"
    })
}
}


// adding list in the product

const listProduct=async (req,res)=>{
try{
const products=await productModel.find({})
return  res.status(200).json({
    success:true,
    products,
    message:"product displayed sucessfylly"
})
}catch(error)
{
    return res.status(500).json({
        success:true,
        message:error.message
    })
}
}

// removing product
const removeProduct=async (req,res)=>{
try{
await productModel.findByIdAndDelete(req.body.id)
return res.status(200).json({
    success:true,
    message:"deleted sucessfully"
})
}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}


// fetching single product info

const singleProduct=async (req,res)=>{
try{
const {id}=req.body
const product =await productModel.findById(id)
return res.status(200).json({
    success:true,
    product,
    message:"found sucessfully"
}
)
}catch(error)
{
return res.status(500).json({
    success:false,
    message:error.message
})
}
}


export {addProduct,listProduct,removeProduct,singleProduct}