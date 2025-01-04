import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProdItem from './ProdItem'

function RelatedProduct({category,subcategory}) {
    const {products}=useContext(ShopContext)
    const [related,setrelated]=useState([])

    useEffect(()=>{
        if(products.length>0)
        {
let prdcpy=products.slice();
prdcpy=prdcpy.filter((item)=>category===item.category)
prdcpy=prdcpy.filter((item)=>subcategory===item.subCategory)
setrelated(prdcpy.slice(1,6))
        }
    },[products])
  return (
    <div className='my-24'>
        <div className="text-center text-3xl py-2">
      <Title txt1={"RELATED"} txt2={"PRODUCTS"}/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-x-3">
            {related.map((item,index)=>(
                <ProdItem key={index} id={item._id} img={item.image} name={item.name} price={item.price} />
            ))}
        </div>
      
    </div>
  )
}

export default RelatedProduct
