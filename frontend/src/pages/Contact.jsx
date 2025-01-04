import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLater from '../components/NewsLater'
import OurPolicy from '../components/OurPolicy'

function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t '>
        <Title txt1={"Contact"} txt2={'Us'}/>
      </div>
      <div className=' flex flex-col justify-center md:flex-row gap-[100px] mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[400px] rounded-md' alt="" />
<div className='flex flex-col justify-center items-start gap-8'>
  <p className='font-semibold text-xl text-gray-600'>Our Store</p>
  <p className='text-gray-500'>bhubaneshwar -patiya, Odisha india</p>
  <p>Contact:123456789 <br />
  Email: kaushalrauniyar1@gmail.com
  </p>
  <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
  <p className='text-gray-500'> Learn more about ourStore</p>
  <button className='bg-red-400 hover:bg-gray-600 hover:text-white px-4 py-4 rounded-lg text-xl transition-all duration-500 ease-in'>Exporee Now</button>

</div>

      </div>
    </div>
  )
}

export default Contact
