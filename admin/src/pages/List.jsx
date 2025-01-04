import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

function List({token}) {
  const [list,setlist]=useState([])


  const getlist=async ()=>{
try{
const response=await axios.get(backendUrl+`/api/product/list`)
if(response.data.success)
{
  setlist(response.data.products)
}
else{
  toast.error(response.data.message)
}

}catch(error)
{
  toast.error(error.message)
}
  }
  useEffect(()=>{
getlist()
  },[])


  const delproduct=async (id)=>{
try{
const response=await axios.post(backendUrl+`/api/product/delete`,{id},{headers:{token}})
if(response.data.success)
{
  toast.success("deleted successfully")
  await getlist()
}
}catch(error)
{
  toast.error(error.message)
}
  }
  return (
   <>
   <p className='mb-2'>All Products list</p>
   <div className='flex flex-col gap-2'>
    <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center pu-1 px-2'>
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b className='text-center'>Action</b>
    </div>
{/* displaying th products here */}
{
  list.map((item,index)=>(
    <div
     className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
    key={index}>
   <img className='w-20' src={item.image[0]} alt="" />
     <p>{item.name}</p>
     <p>{item.category}</p>
     <p>$ {item.price}</p>
     <p 
     onClick={()=>delproduct(item._id)}
     className='text-right md:text-center cursor-pointer text-lg rounded-md bg-red-400 w-10 px-3 md:ml-10 ml-20 '>X</p>
    </div>
  ))
}
   </div>
   </>
  )
}

export default List
