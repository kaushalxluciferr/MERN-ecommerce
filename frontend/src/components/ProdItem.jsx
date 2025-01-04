import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

function ProdItem({id,img,name,price}) {

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img src={img[0]} className='hover:scale-110 transition ease-in-out' alt="" />
        </div>
        <p className='pt-4 pb-3 text-sm'>
            {name}
        </p>
        <p className='text-sm font-medium'>$ {price}</p>
    
    </Link>
  )
}

export default ProdItem
