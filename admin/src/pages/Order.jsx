import React from 'react'
import { backendUrl } from '../App'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../assets/assets'




function Order({ token }) {
  const [orders, setorders] = useState([])

// function to display the order items of users
  const getorder = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + `/api/order/list`, {}, {
        headers: { token }
      })
      if (response.data.success) {
        setorders(response.data.orders)
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }


  // function to store the status of the user from the admin side
  const updateStatus=async (e,orderId)=>{
    try{
        const response=await axios.post(backendUrl+`/api/order/status`,{orderId,status:e.target.value},{headers:{token}})
        await getorder()
    }catch(error)
    {
      toast.error(error.message)
    }
  }


  // whenever the page reloads it fethses the orders reveived by the userr 
  useEffect(() => {
    getorder()
  }, [token])


  return (
    <div>
      <div className='flex justify-center items-center mb-10 '>
      <h2 className='text-2xl text-[#3730a3] font-bold '>Order Page</h2>

      </div>
      <div>
        {
          orders.map((order,index)=>(
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] bg-[#cbd5e1] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-300 p-4 md:p-8 my-3 md:my-3 text-xs sm:text-sm text-gray-600' key={index}>
              <img className='w-20 mt-4 rounded-md' src={assets.parcel_icon} />
              <div>
             <div>
                {
                  order.items.map((item,index)=>{
                    // last item to deliver
                    if(index===order.items.length-1)
                    {
                      return <p className='py-0.5' key={index}>{item.name}X{item.quantity} <span>{item.size}</span></p>
                    }
                    else{
                      return <p  className='py-0.5' key={index}>{item.name}X{item.quantity} <span>{item.size},</span></p>

                    }
                  })
                }
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstName+" "+order.address.lastName}</p>
              <div>
                <p>{order.address.street},{order.address.zipcode}</p>
                <p>{order.address.city}, {order.address.state+", "+order.address.country} </p>
              </div>
              <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px] font-bold'>Items: {order.items.length}</p>
                <p className='mt-3'>Payment Method:{order.paymentMethod}</p>
                <p>Payemnt:{order.payment?"Completed":"pending"}</p>
                 <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='font-bold ml-5 text-blue-700 '>$ {order.amount}</p>
              <select onChange={(e)=>updateStatus(e,order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing"> Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order
