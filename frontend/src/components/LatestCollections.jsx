import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProdItem from './ProdItem'

function LatestCollections() {
    const [latestpd,setlatestpd]=useState([])
    const {products}=useContext(ShopContext)

    useEffect(()=>{
setlatestpd(products.slice(0,10));
    },[products])


  return (
    <div className='my-12 '>
        <div className='text-center py-8 text-3xl'>
            <Title txt1={"Today's"} txt2={'Collelction'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-black '>
            Here you will see lastest today's Collections. The Collections are Best Branded and best made available in our store
            </p>
        </div>
      {/* displayong product by using map */}
<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4'>
{
    latestpd.map((item,index)=>(
<ProdItem key={index} id={item._id} img={item.image} name={item.name} price={item.price}/>
    ))
}
</div>

    </div>
  )
}

export default LatestCollections
