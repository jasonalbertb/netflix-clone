import React , {useState} from 'react'
import data from "../data/faqs.json";

import {HiOutlineChevronRight} from "react-icons/hi";
import {VscClose} from "react-icons/vsc";
import {FiPlus} from "react-icons/fi";
import {FloatingInput} from "../components/FloatingInput";

export const FAQs = () => {
  const [open, setOpen] = useState(0);
  const handleClick = (i)=>{
    setOpen(i);
  }

  return (
    <div className='bg-black text-white py-4 px-[10%] flex flex-col items-center text-center mb-1.5'>
      <h2 className='text-center mt-8 text-2xl font-bold mb-4 sm:text-4xl sm:pt-6 sm:max-w-lg md2:text-5xl md2:max-w-full  md2:pb-8'>
        Frequently Asked Questions
      </h2>

      {data.map((item, index)=>{
        return (
          <div key={index} className={`my-1.5 overflow-hidden ${open === index+1? "max-h-max": "max-h-12 md2:max-h-16"}`}>
            <button
                className='text-left inline-flex w-full justify-between bg-gray-light mb-[2px] items-center px-6 text-lg font-medium h-12 md2:text-3xl md2:px-8 md2:py-8 '
            >
                {item.header}
                {open === index+1? 
                <VscClose onClick={()=>handleClick(0)} className='h-6 w-6 md2:h-8 md2:w-8'/>:
                <FiPlus onClick={()=>handleClick(index+1)} className='h-6 w-6  md2:h-8 md2:w-8'/>
                }
            </button>
            <div 
                className="text-left bg-gray-light text-lg font-medium px-6 py-3 md2:text-3xl md2:px-8 md2:py-8"
            >
                {item.body}
            </div>
          </div>
        )
      })}
        <p className='max-w-sm text-center text-lg font-medium leading-5 mt-4 md:text-2xl md:max-w-lg md2:pb-4'> 
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className='sm:max-w-lg lg:flex lg:my-5 w-full lg:max-w-full lg:w-[700px]'>
            <FloatingInput />
            <button
              className='inline-flex items-center px-4 py-2  font-semibold rounded bg-netflix-red hover:bg-netflix-hover transition duration-200 ease-linear cursor-pointer lg:text-2xl lg:px-8 lg:py-3'
            >
              Get Started <HiOutlineChevronRight className='lg:translate-y-0.5 inline'/>
            </button>
        </div>
      
    </div>
  )
}
