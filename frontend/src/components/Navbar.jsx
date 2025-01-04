import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { set } from 'mongoose'
function Navbar() {
const [display,setdisplay]=useState(false)
const navigate=useNavigate()

const logout=()=>{
    navigate('/login')
    localStorage.removeItem('token')
    settoken('')
    setCartitems({})

}

const {setshowsearch,getcartcount,token,settoken,setCartitems}=useContext(ShopContext)
  return (
    <div className='flex items-center justify-between py-5 font-medium '>
   <Link to='/'> <img src={assets.logo}  className='w-36 rounded-[20px]' alt="" /></Link>

    <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>
<NavLink to='/' className='flex flex-col items-center gap-1'>
    <p>Home</p>
    <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>
<NavLink to='/collection' className='flex flex-col items-center gap-1'>
    <p>Collections</p>
    <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>
<NavLink to='/about' className='flex flex-col items-center gap-1'>
    <p>About</p>
    <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>
<NavLink to='/contact' className='flex flex-col items-center gap-1'>
    <p>Contact</p>
    <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>
<NavLink to='/orders' className='flex flex-col items-center gap-1'>
    <p>My orders</p>
    <hr  className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
</NavLink>
    </ul>

    <div className='flex items-center gap-6'>

        <img onClick={()=>setshowsearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' />
<div className='group relative'>
  <img onClick={()=>token?null:navigate("/login")} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" /> 
   {/* if login then this will display */}

   {
    token?  <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-black-500 rounded '>
        <p className='cursor-pointer hover:text-blue-500'>My Profile</p>
        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-blue-500'>My Order</p>
        <p onClick={logout} className='cursor-pointer hover:text-blue-500'>Logout</p>
     
    </div>
   </div>:null
   }
</div> 
<Link to='/cart' className='relative'>
<img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
<p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getcartcount()}</p>
</Link>
<img onClick={()=>setdisplay(true)} src={assets.menu_icon}className='w-5 cursor-pointer sm:hidden' alt="" />
    </div>

<div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${display?'w-full':'w-0'}`}>
<div className='flex flex-col text-gray-600'>
    <div onClick={()=>setdisplay(false)} className='flex items-center gap-4 p-3'> 
        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
<p>Back</p>
    </div>
    <NavLink onClick={()=>setdisplay(false)} to='/' className='by-3 pl-8 border'>
Home
    </NavLink>
    <NavLink onClick={()=>setdisplay(false)}  className='by-3 pl-8 border' to='/collection'>
Collection
    </NavLink>
    <NavLink onClick={()=>setdisplay(false)}  className='by-3 pl-8 border' to='/about'>
About Us
    </NavLink>
    <NavLink onClick={()=>setdisplay(false)}  className='by-3 pl-8 border' to='/ contact'>
Contact
    </NavLink>
</div>
</div>
    
    </div>
  )
}

export default Navbar
