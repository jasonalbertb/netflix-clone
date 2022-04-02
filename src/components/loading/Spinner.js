import React from 'react'

export const Spinner = () => {
  return (
    <div className='bg-black w-screen h-screen grid place-items-center'>
      <img
        className='animate-spin w-12 h-12'
        src='/images/misc/spinner.png' alt='spinner'/>
    </div>
  )
}
