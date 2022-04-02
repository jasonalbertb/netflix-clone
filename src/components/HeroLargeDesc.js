import React from 'react'
import {BsFillPlayFill} from "react-icons/bs";
import {PlayerBtn} from "./PlayerBtn";
export const HeroLargeDesc = () => {

  return (
    <div className='hidden sm:block text-white sm:ml-12 sm:mt-24 sm:w-3/5 md:w-1/2 lg:mt-48'>
        <h2 className={`sm:text-3xl sm:font-semibold sm:mb-2
                        md:text-4xl 
                        lg:text-5xl lg:font-bold lg:mb-6`}
        >Watch Joker Now</h2>
        <p className={`sm:mb-4 sm:text-sm
                      md:mb-6
                      lg:text-xl lg:mb-8`}
        >Forever alone in a crowd, 
            failed comedian Arthur Fleck seeks connection as he
            walks the streets of Gotham City. Arthur wears 
            two masks -- the one he paints for his day job as a 
            clown, and the guise he projects in a futile attempt
            to feel like he's part of the world around him.
        </p>
        <p>
            <PlayerBtn 
              src="/videos/bunny.mp4"
              className={`flex items-center cursor-pointer bg-white  text-black   
                          hover:bg-netflix-red hover:text-white transition duration-500 ease-in-out
                          sm:px-3 sm:capitalize sm:rounded-md sm:text-sm sm:font-medium sm:py-0.5
                          md:text-lg md:uppercase md:tracking-wide
                          lg:rounded-md lg:font-bold lg:px-6 lg:py-2
                        `}>
                <BsFillPlayFill className='inline sm:mx-0.5 lg:w-6 lg:h-6'/> Play
            </PlayerBtn>
        </p>
    </div>
  )
}
