import React from 'react'

function Title({txt1,txt2}) {
  return (
    <div className='inline-flex gap-2 items-center mb-4'>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
        <p className='text-gray-500'>{txt1} <span className='text-gray-700 font-medium'>{txt2}</span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
      
    </div>
  )
}

export default Title
