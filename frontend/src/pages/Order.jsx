import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { toast } from 'react-toastify'
import axios from 'axios'

function Order() {
  // userorders
  const {token,backendUrl}=useContext(ShopContext)
  const [data,setdata]=useState([])


const getorderdata=async()=>{
  try{
    if(!token)
    {
      return null;
    }

    const response=await axios.post(backendUrl + `/api/order/userorders`,{},{headers:{token}})
    if(response.data.success)
    {
      let ordersItem=[]
      response.data.orders.map((order)=>{
        order.items.map((item)=>{
           item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            ordersItem.push(item)
        })
      })
     setdata(ordersItem.reverse());
      
    }

  }catch(error)
  {
toast.error(error.message)
  }
}

useEffect(()=>{
getorderdata()
},[token])

  return (
    <div className='border-t pt-16'>
          <div className='text-2xl'>
             <Title txt1={'My'} txt2={'Orders'}/>
          </div>
          <div>
            {
              data.map((item,index)=>(
                <div key={index} className='py-4 border-t border-b text-gray-700 flex fel-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div className='flex items-start gap-6 text-sm'>
                              <img src={item.image[0]} className='w-16 sm:w-20' />
                              <div className=''>
                                <p className='sm:text-base font-medium'>{item.name}</p>
                                <div className='flex items-center gap-3 mt-2 text-base text-blue-400'>
                                  <p className='text-lg'>$ {item.price}</p>
                                  <p>Quantity: {item.quantity}</p>
                                  <p>Size: {item.size}</p>
                                  </div>
                                  <p className='mt-5'>Date <span className='text-gray-500'>{new Date(item.date).toLocaleDateString()}</span></p>
                                  <p className='mt-5'>Payment <span className='text-gray-500'>{item.paymentMethod}</span></p>
                              </div>
                            </div>
                            <div className='md:w-1/2 flex justify-between'>
                            <div className='flex items-center gap-2'> 
                              <p className='min-w-3 h-3 rounded-full bg-green-500'></p>
                              <p className='text-sm md:text-base'>{item.status}</p>
                              </div>
                              <button onClick={getorderdata} className='border px-3 py-3 text-sm font-medium'>Track Order</button>
                            </div>
                </div>
              ))
            }
          </div>
    </div>
  )
}

export default Order
