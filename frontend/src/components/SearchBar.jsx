import React, { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function SearchBar() {
    const {search,setsearch,showsearch,setshowsearch}=useContext(ShopContext)
    const [display,setdisplay]=useState(false)
const location=useLocation()

useEffect(()=>{
    
    if(location.pathname.includes('collection') && showsearch)
        {
        setdisplay(true)
        }
        else{
            setdisplay(false)
        }
},[location,showsearch])

  return showsearch && display?(
    <div className='border-t border-b bg-gray-200 rounded-xl text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
             <input value={search} onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm ' />
             <img src={assets.search_icon} className='w-4' alt="" />
        </div>
        <img src={assets.cross_icon} className='inline w-3 cursor-pointer' onClick={()=>setshowsearch(false)} alt="" />

    </div>
  )
  :null
}

export default SearchBar
