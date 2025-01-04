import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function Verify() {

    const navigate=useNavigate()

    const {backendUrl,token,setCartitems}=useContext(ShopContext)
const [search,setsearch]=useSearchParams()
const success=search.get('success')
const orderId=search.get('orderId')

    const paymentverify=async ()=>
    {
          try{
if(!token)
{
    return null;
}
const response=await axios.post(backendUrl+`/api/order/verifyStripe`,{success,orderId},{headers:{token}})
if(response.data.success)
{
    setCartitems({})
    navigate('/orders')
}
else{
    toast.error("payment is failed")
    navigate('/cart')
}

          }catch(error)
          {
            toast.error(error.message)
          }

    }

useEffect(()=>{
paymentverify()
},[token])


  return (
    <div>
       
    </div>
  )
}

export default Verify
