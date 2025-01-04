import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

function Cart() {
  const {navigate,products,cartItems,updateQuantity,token}=useContext(ShopContext);

  const[cartdata,setcartdata]=useState([])



  useEffect(()=>{

if(products.length>0)
{

  
  const data=[]
  
  for(const items in cartItems)
  {
    for (const item in cartItems[items])
    {
      if(cartItems[items][item]>0){
        data.push({
          _id:items,
          size:item,
          quantity:cartItems[items][item]
        })
      }
    }
  }
  setcartdata(data)
}
  },[cartItems,products])



  return (
    
    <div className='border-t pt-15'>

<div className="text-2xl mb-3">
  <Title txt1={"YOUR"} txt2={'CART'}/>
</div>

<div>
  {
    cartdata.map((item,index)=>{
      const prdtdata=products.find((product)=>product._id===item._id)
      return(
        <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5ffr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4' >

          <div className='flex items-start gap-6'>
            <img src={prdtdata.image} className='w-16 sm:w-20' alt="" />
                      <div>
                        <p className='text-sm sm:text-lg font-medium '>{prdtdata.name}</p>
                       <div className='flex items-center gap-5 mt-2'>
                        <p>$ {prdtdata.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-400 rounded-md '>{item.size}</p>
                       </div>
                      </div>
          </div>
          <input onChange={(e)=>e.target.value===''||e.target.value==='0'?numm:updateQuantity(item._id,item.size,Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className='border  max-w-10 sm:max-w-3o px-3 sm:px-2 py-1'/>
          <img src={assets.bin_icon} className='w-4 mr-5 sm:w-5 cursor-pointer ' onClick={()=>updateQuantity(item._id,item.size,0)} alt="" />
        </div>
      )
    })
  }
</div>
<div className='flex justify-end my-20'>
  <div className="w-full sm:w-[450px]">
  <CartTotal/>
  <div className="w-full text-end">
    <button onClick={()=>navigate('/place-order')} className='bg-red-600 text-white text-2xl px-3 py-4 rounded-md mt-10'>Proceed to pay</button>
  </div>
  </div>
</div>
    </div>
  )
}

export default Cart
