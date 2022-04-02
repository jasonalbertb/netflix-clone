import React from 'react'

export const FloatingInput = () => {
  return (
    <div className='w-full text-gray-500 border border-gray-200 my-4 focus-within:border-blue-500 relative bg-white lg:my-0 lg:flex-1'>
        <input type="text" name="email" placeholder=" " 
            className='w-full h-full appearance-none z-[2] focus:outline-none block bg-transparent pt-4 pb-1 px-2 border border-gray-300'/>
        <label
            className='block absolute z-[1] text-gray-400 pointer-events-none text-sm origin-[0%] top-3 left-2 transition duration-150 ease-in-out lg:text-lg'>
            Email Address
        </label>
    </div>
  )
}
