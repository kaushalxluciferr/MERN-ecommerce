import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

function Sidebar() {
  return (
    <div className='w-[18%] bg-gray-700 min-h-screen border-r-2'>
     <div className='flex  flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink to='/add' className='flex  bg-white items-center gap-5  border border-gray-400 border-r-0 px-5 py-3 rounded-lg'>
<img src={assets.add_icon} className='w-2 lg:w-5 h-5'  />
<p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink to='/list' className='flex  bg-white items-center gap-5  border border-gray-400 border-r-0 px-5 py-3 rounded-lg'>
<img src={assets.order_icon} className='w-5 h-5'  />
<p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink to='/orders' className='flex  bg-white items-center gap-5  border border-gray-400 border-r-0 px-5 py-3 rounded-lg'>
<img src={assets.order_icon} className='w-5 h-5'  />
<p className='hidden md:block'>Order Items</p>
        </NavLink>
     </div>
    </div>
  )
}

export default Sidebar
