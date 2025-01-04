import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
          <div>
            <img src={assets.logo} className='mb-5 w-32 rounded-[20px]' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, necessitatibus.</p>
          </div>
          <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Deleivery</li>
                <li>Pricacy Policy</li>
            </ul>
          </div>
          <div>
            <p className='text-xl font-meduim mb-5'>Get in contact anytime</p>
            <ul className='flex flex-col map-1 text-gray-600'>

                <li>+1212345678</li>
                <li>getdetail@email.com</li>
                </ul>
          </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'> copyright 2024@ forever.com-All Rights reserved under Kaushal's policy</p>
      </div>
    </div>
  )
}

export default Footer
