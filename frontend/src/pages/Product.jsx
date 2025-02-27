import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProduct from '../components/RelatedProduct'
// import { products } from '../assets/assets'

function Product() {
  const {id}=useParams()
  const {products,addtochart}=useContext(ShopContext)
const [prddata,setprddata]=useState(false)
const [size,setsize]=useState('')
const [image,setimage]=useState("")
const getproductdata=async ()=>{
products.map((item)=>{
if(item._id==id)
{
  setprddata(item)
  setimage(item.image[0])
  return null
}
})
}

useEffect(()=>{
getproductdata()
},[id,products])
  return prddata?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* display data of product */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
{/* display prodyct images */}
<div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
  <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[19%] w-full">
    {prddata.image.map((item,index)=>(
      <img onClick={()=>setimage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
    ))}
  </div>
  <div className='w-full sm:w-[80%]'>
<img src={image} className='w-full h-auto' alt="" />
  </div>
</div>

{/* prouct info section */}
<div className="flex-1">
  <h1 className='font-medium text-2xl mt-2'>
    {prddata.name}
  </h1>
  <div className='flex items-center gap-1 mt-2'>
    <img className='w-3.5' src={assets.star_icon} alt="" />
    <img className='w-3.5' src={assets.star_icon} alt="" />
    <img className='w-3.5' src={assets.star_icon} alt="" />
    <img className='w-3.5' src={assets.star_icon} alt="" />
    <img className='w-3.5' src={assets.star_dull_icon} alt="" />
    <p className='ml-3'>({122})</p>
  </div>
  <p className='mt-5 text-3xl font-medium'>$ {prddata.price}</p>
  <p className='mt-5 text-gray-500 md:w-4/5'>{prddata.description}</p>
  <div className='flex flex-col gap-4 my-8'>
    <p>Select Size</p>
    <div className="flex gap-2">
{prddata.sizes.map((item,index)=>(
  <button onClick={()=>setsize(item)} className={`border py-2 px-3 bg-gray-300 rounded-md ${item==size?'border-red-500 border-2':''}`} key={index}>{item}</button>
))}
    </div>
  </div>
  <button onClick={()=>addtochart(prddata._id,size)} className='bg-black text-white rounded-lg px-8 py-3 text-sm active:bg-gray-700'>Add to Chart</button>
  <hr className='mt-8 sm:w-4/5' />
  <div className='text-sm text-gray-500 mt-5 flex- flex-col gap-1'>
    <p>100% Orginal Product</p>
    <p>Cash On Delivery Is availabell</p>
    <p>Easy return and Exchange Poicy Unser 7 dyas</p>

  </div>
</div>

      </div>
      {/* review & description section starts here */}
      <div className="mt-20">
        <div className="flex">
          <b className='border px-5 py-3 text-sm'>
            Description
          </b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, itaque? Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quisquam?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, sequi.</p>
          </div>
      </div>
      {/* display related products */}
<RelatedProduct category={prddata.category} subcategory={prddata.subCategory} />

     
    </div>
  ): <div className='opacity-0'></div>
}

export default Product
