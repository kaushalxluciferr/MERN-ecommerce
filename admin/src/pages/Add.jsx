import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../App'

function Add({token}) {

  const [image1,setimage1]=useState(false)
  const [image2,setimage2]=useState(false)
  const [image3,setimage3]=useState(false)
  const [image4,setimage4]=useState(false)
  const [name,setname]=useState('')
  const [description,setdescription]=useState('')
  const [price,setprice]=useState("")
  const [sizes,setsizes]=useState("")
  const [category,setcategory]=useState("Men")
  const [subCategory,setsubCategory]=useState('Topwear')
  const [bestseller,setbestseller]=useState(false)




  const onsubmiit=async (e)=>{
e.preventDefault()
try{
  const formdata=new FormData()
  formdata.append("image1",image1)
  formdata.append("image2",image2)
  formdata.append("image3",image3)
  formdata.append("image4",image4)


formdata.append("name",name)
formdata.append("description",description)
formdata.append("price",price)
formdata.append("sizes",JSON.stringify(sizes))
formdata.append("category",category)
formdata.append("subCategory",subCategory)
formdata.append("bestseller",bestseller)


const response= await axios.post(backendUrl+`/api/product/add`,formdata,{headers:{token}})
if(response.data.success)
{
  toast.success("product is successfully added")
  setbestseller(false)
  setcategory('Men')
  setdescription('')
  setimage1(false)
  setimage2(false)
  setimage3(false)
  setimage4(false)
  setname('')
  setprice("")
  setsubCategory("Topwear")
  setsizes("")
}

}catch(error)
{
  
  toast.error(error.message)
}
  }
  
  return (
    <>
    <form onSubmit={onsubmiit} className='flex flex-col w-full items-start gap-3'>
      <div >
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-5'>
          <label htmlFor="image1">
            <img src={!image1? assets.upload_area:URL.createObjectURL(image1)} className='w-20' alt="" />
            <input onChange={(e)=>setimage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img src={!image2?assets.upload_area:URL.createObjectURL(image2)} className='w-20' alt="" />
            <input onChange={(e)=>setimage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img src={!image3?assets.upload_area:URL.createObjectURL(image3)} className='w-20' alt="" />
            <input onChange={(e)=>setimage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img src={!image4?assets.upload_area:URL.createObjectURL(image4)} className='w-20' alt="" />
            <input onChange={(e)=>setimage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Enter Product Name</p>
        <input onChange={(e)=>setname(e.target.value)} value={name} type="text" className='w-full max-w[500px] px-3 py-2 outline-none' placeholder='Enter Name' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Enter Product Desc.</p>
          <textarea onChange={(e)=>setdescription(e.target.value)} value={description}  type='text' className='w-full max-w-[500px] px-3 py-2' placeholder='Enter Description' required/>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='text-gray-500 mt-1'>select Product Category</p>
          <select value={category} onChange={(e)=>setcategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          
          </select>
        </div>
        <div>
          <p className='text-gray-500 mt-1'>select Sub Category</p>
          <select onChange={(e)=>setsubCategory(e.target.value)}  className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          
          </select>
        </div>
        <div>
          <p  className='text-gray-500 mt-1'> Enter Product Price</p>
          <input onChange={(e)=>setprice(e.target.value)} value={price} type="number" className='w-full px-2 py-2 outline-none' placeholder='Enter price of Prouct'  />
        </div>
      </div>

      <div>
        <p className='mb-3'>Product Sizes</p>
        <div className='flex gap-4'>
          <div onClick={()=>setsizes(prev=>prev.includes("S")?prev.filter(item=>item!=="S"):[...prev,"S"])}>
            <p className={`${sizes.includes("S")?"bg-red-400":"bg-slate-300"}  px-3 py-1 cursor-pointer`}>S</p>
            </div>
            <div onClick={()=>setsizes(prev=>prev.includes("M")?prev.filter(item=>item!=="M"):[...prev,"M"])}>
            <p className={`${sizes.includes("M")?"bg-red-400":"bg-slate-300"}  px-3 py-1 cursor-pointer`}>M</p>
            </div>
            <div onClick={()=>setsizes(prev=>prev.includes("L")?prev.filter(item=>item!=="L"):[...prev,"L"])}>
            <p className={`${sizes.includes("L")?"bg-red-400":"bg-slate-300"}  px-3 py-1 cursor-pointer`}>L</p>
            </div>
            <div onClick={()=>setsizes(prev=>prev.includes("XL")?prev.filter(item=>item!=="XL"):[...prev,"XL"])}>
            <p className={`${sizes.includes("XL")?"bg-red-400":"bg-slate-300"}  px-3 py-1 cursor-pointer`}>XL</p>
            </div>
            <div onClick={()=>setsizes(prev=>prev.includes("XXL")?prev.filter(item=>item!=="XXL"):[...prev,"XXL"])}>
            <p className={`${sizes.includes("XXL")?"bg-red-400":"bg-slate-300"}  px-3 py-1 cursor-pointer`}>XXL</p>
            </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={()=>setbestseller(!bestseller)} checked={bestseller} type="checkbox" id='bestseller' />
      <label htmlFor="bestseller" className='cursor-pointer'>Add To Best Seller</label>
      </div>
      <button type='submit' className='px-2 text-white text-xl py-2 outline-none bg-red-500 rounded-lg'>Add Product</button>
    </form>
    </>
  )
}

export default Add
