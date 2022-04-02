import React from 'react'

export const FloatingInputTemp = ({type, value, onChange, label, className}) => {
  return (
    <div className='text-white block relative'>
      <input
        className={`${className} rounded-sm focus:outline-none block w-full appearance-none bg-gray-700 focus:bg-gray-600 px-4 pt-4 pb-1`}
        placeholder=" "
        type={type} value={value}
        onChange={onChange}/>
      <label className='absolute top-3 left-4 pointer-events-none origin-[0%] text-white-clear text-sm transition-all duration-200 ease-in-out'>{label}</label>
    </div>
  )
}
