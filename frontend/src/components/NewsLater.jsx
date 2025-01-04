import React from 'react'

function NewsLater() {

    const submit=()=>{
e.preventDefault()

    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-600'>Subscribe and get 25% off</p>
      <p className='text-gray=400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eaque?</p>

      <form onSubmit={submit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-7 border pl-3'>
<input required className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Email' name="" id="" />

<button type='submit' className='bg-black text-white text-xs px-10 py-4 rounded-lg '>Subscribe</button>


      </form>
    </div>
  )
}

export default NewsLater