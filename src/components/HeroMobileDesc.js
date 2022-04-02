import React from 'react'
import {FaPlay} from "react-icons/fa";
import {SiNetflix} from "react-icons/si";
import {PlayerBtn} from "./PlayerBtn";
export const HeroMobileDesc = () => {
  const tags = ["crime", "drama", "thriller"]
  return (
    <div className='sm:hidden flex flex-col items-center text-white absolute bottom-8 left-1/2 translate-x-[-50%] bg-transparent'>
      <p className='flex items-center'>
        <SiNetflix className='w-8 text-netflix-red inline'/>
        <span className='uppercase tracking-[2px] text-xs'>Movie</span>
      </p>
      <p className='text-5xl tracking-wider font-semibold mb-1'>Joker</p>
      <ul className='flex mb-4'>
        {tags.map((tag, i)=>{
          return <li key={i} className='px-2 text-xs capitalize'>{tag}</li>
        })}
      </ul>
      <p>
        <PlayerBtn 
              src="/videos/bunny.mp4" 
              className={`inline-flex items-center bg-white text-black text-md px-4 py-1 rounded-md 
                            hover:bg-netflix-red hover:text-white transition-bg duration-500 ease-out` }>
          <FaPlay className='inline mx-1 w-3 h-3'/>
          <span className='font-bold'>Play</span>
        </PlayerBtn>
      </p>
    </div>
  )
}
