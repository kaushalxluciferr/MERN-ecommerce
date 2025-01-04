import React from 'react'
import { assets } from '../assets/assets'

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={assets.exchange_icon} className='w-12 mx-auto mb-5' alt="" />
        <p className='font-semibold'>Easy Exchange policy</p>
        <p className='text-gray-400'>We Offer  Exchange policy</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 mx-auto mb-5' alt="" />
        <p className='font-semibold'>7 Days return Policy</p>
        <p className='text-gray-400'>We Offer  7 days free return policy</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 mx-auto mb-5' alt="" />
        <p className='font-semibold'>Easy Customer Support policy</p>
        <p className='text-gray-400'>We Offer 24/7 customer support</p>
      </div>
    </div>

  )
}

export default OurPolicy
