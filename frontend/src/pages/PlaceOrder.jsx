import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function PlaceOrder() {
  
  const navigate=useNavigate()

  const [show,setshow]=useState('cod')

  const [data,setdata]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''

  })
const {backendUrl,token,cartItems,setCartitems,getcartamount,delivery_fee,products}=useContext(ShopContext)



  const changehandle=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    setdata((item)=>({...item,[name]:value}))
  }



const onsubmitHandler=async (e)=>{
e.preventDefault()
try{
let orderItems=[]
for(const items in cartItems)
{
  for(const item in cartItems[items])
  {
    if(cartItems[items][item]>0)
    {
      const itemInfo=structuredClone(products.find(product=>product._id===items))
      if(itemInfo)
      {
        itemInfo.size=item
        itemInfo.quantity=cartItems[items][item];
        orderItems.push(itemInfo)
      }
    }

  }
}
let orderData={
  address:data,
  items:orderItems,
  amount:getcartamount()+delivery_fee,
}
switch(show)
  {
    case 'cod':
      const response=await axios.post(backendUrl+ `/api/order/place`,orderData,{headers:{token}})
      if(response.data.success)
      {
        setCartitems({})
        toast.success("order placed")
        navigate('/orders')
      }
      else{
        toast.error(response.data.message)
      }
      break;

    case 'stripe':
      const resStripee=await axios.post(backendUrl+`/api/order/stripe`,orderData,{headers:{token}})
      if(resStripee.data.success)
      {
        const {session_url}=resStripee.data
        window.location.replace(session_url)
      }
      else{
          toast.error(resStripee.data.message)
      }
      break;

    default:
      break;
  }
}catch(error)
{
  toast.error(error.message)
}
}


  return (
  <form onSubmit={onsubmitHandler} className=' flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left wala  */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
            <div className='text-xl sm:text-2xl my-3'>
              <Title txt1={'Delivery'} txt2={"Information"}/>
            </div>
            <div className='flex gap-3'>
<input onChange={changehandle} name='firstName' value={data.firstName} type="text" placeholder='Enter First Name' className='border border-gray-300 rounded py-1.5 px-3 w-full' />
<input onChange={changehandle} name='lastName' value={data.lastName}  type="text" placeholder='Enter Last Name' className='border border-gray-300 rounded py-1.5 px-3 w-full' />
            </div>
<input type="email" onChange={changehandle} name='email' value={data.email} placeholder='Enter Your Email ' className='border border-gray-300 rounded py-1.5 px-3 w-full' />
<div className='flex gap-3'>
<input type="text" onChange={changehandle} name='state' value={data.state} placeholder='Enter State' className='border border-gray-300 rounded py-1.5 px-3 w-full' />
<input type="text" onChange={changehandle} name='city' value={data.city} placeholder='Enter City' className='border border-gray-300 rounded py-1.5 px-3 w-full' />
            </div>
<input type="text" onChange={changehandle} name='street' value={data.street} placeholder='Enter Street' className='border border-gray-300 rounded py-1.5 px-3 w-full' />
<div className='flex gap-3'>
<input type="number" onChange={changehandle} name='zipcode' value={data.zipcode}  placeholder='Enter Zipcode' className='border border-gray-300 rounded py-1.5 px-3 w-full' />
<input type="text" placeholder='Enter country' onChange={changehandle} value={data.country} name='country' className='border border-gray-300 rounded py-1.5 px-3 w-full' />
            </div>
<input type="number" placeholder='Enter Contact Number:' onChange={changehandle} value={data.phone} name='phone' className='border border-gray-300 rounded py-1.5 px-3 w-full' />

      </div>
{/* right side details */}
<div className="mt-8">
  <div className="mt-8 min-w-80">
    <CartTotal/>
  </div>
  <div className='mt-12 '>
    <Title txt1={'Payment'} txt2={'Method'}/>
    {/* display different payment method selection */}
    <div className='flex gap-3 flex-col lg:flex-row'>
             <div onClick={()=>setshow('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p  className={`min-w-3.5 h-3.5 border rounded-full ${show==='stripe'?'bg-green-500':''}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-5' alt="" />
             </div>
            
             <div  onClick={()=>setshow('cod')}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${show==='cod'?'bg-green-500':''}`}></p>
             <p className='text-gray-500 text-sm font-medium mx-4'>Cash On Deliver</p>
             </div>
    </div>
<div className='w-full text-end mt-5'>
  <button type='submit'  className='bg-red-500 px-4 py-4 text-black text-2xl rounded-lg'>place Order</button>

</div>
  </div>
</div>

    </form>
  )
}

export default PlaceOrder
