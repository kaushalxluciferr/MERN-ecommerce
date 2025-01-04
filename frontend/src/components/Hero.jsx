import React from 'react'
import { assets } from '../assets/assets'

function Hero() {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* left */}
        <div className='w-full sm:w-1/2 bg-[#64748b] flex items-center justify-center pu-10 sm:py-0'>
<div className='text-[#414141'>
<div className='flex items-center gap-2'>
<p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
<p className='font-medium text-sm md:text-base'>Our Best Product</p>
</div>
<h1 className=' agdasima-regular text-3xl sm:py-3 lg:text-5xl leading:relaxed'>Today's Colllection</h1>
<div className='flex items-center gap-3'>
    <p className='font-semibold text-sm md:text-base'>Shop Now</p>
    <p className='w-8 mf:w-11 h-[1px] bg-[#414141]'></p>

</div>
</div>
</div>
{/* right side */}
<img src={assets.hero_img} className='w-full sm:w-1/2 h-[450px]' alt="" />
      
    </div>
  )
}

export default Hero
