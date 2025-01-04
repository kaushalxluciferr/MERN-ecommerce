import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLater from '../components/NewsLater'

function About() {
  return (
    <div>
   <div className='text-2xl text-center pt-8 border-t'>
   <Title txt1={"About "} txt2={'Us'}/>
   </div>
   <div className='my-10 h-[50%] flex flex-col md:flex-row gap-16'>
         <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p className='mt-[-100px]'>I am a skilled Full Stack developer with a strong foundation in HTML, CSS, and JavaScript, along with experience in modern frameworks like React and Vue and having good knowledge of Node js , Express and mongo Db. I excel in problem-solving and have a keen eye for detail, ensuring that the user experience is both seamless and visually appealing. My collaborative nature allows me to effectively communicate with team members and stakeholders, while my commitment to continuous learning keeps me updated on the latest trends in web development. </p>


         </div>
   </div>

   <div className='text-4xl py-4'>
    <Title txt1={'WHY TO'} txt2={'CHOOSE US'}/>
   </div>
   <div className='flex flex-col md:flex-row text-sm mb-20 gap-5'>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b>Quality Assurance:</b>
  <p className='text-blue-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias nesciunt ad corporis quo consequatur iusto praesentium harum corrupti dolores facere.</p>

</div>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b>Convenience:</b>
<p className='text-blue-500'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque, at aperiam? Temporibus unde molestias corrupti quos. Id velit quos facere.</p>
</div>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b>Exceptionl Customer Service:</b>
<p className='text-blue-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint accusantium ratione libero eaque quibusdam repellat dolore itaque? Aspernatur!</p>
</div>

   </div>

   <NewsLater/>
    </div>
  )
}

export default About
