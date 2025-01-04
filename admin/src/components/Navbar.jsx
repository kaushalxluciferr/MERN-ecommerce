import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom'
function Navbar({settoken}) {
  
  return (
    <div className='flex justify-between bg-blue-100 py-2 px-[4%] items-center'>
     <Link to='/'><img src={assets.logo} className='w-[130px] rounded-md' alt="" /></Link> 
      <button onClick={()=>settoken('')} className='bg-red-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-lg text-xl sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
