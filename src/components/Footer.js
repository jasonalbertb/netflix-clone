import React from 'react'
import data from "../data/footer.json";
import {Link} from "react-router-dom";
export const Footer = () => {
  return (
    <div className=' bg-black text-gray-lighter px-12 sm:px-[10%] pb-16 sm:pb-4'>
      <h4 className='pt-8 md:pt-16'>Questions? Contact us.</h4>
      <ul className='grid grid-cols-2 gap-2 xs:gap-4 py-8 sm:grid-cols-3 md:grid-cols-4'>
        {data.map((item, i)=>{
          return (
            <li 
              key={i} 
              className='cursor-pointer  hover:underline underline-offset-1 text-xs xs:text-sm'
            >
              <Link to={item.link}>{item.text}</Link>
            </li>
          )
        })}
      </ul>
      <h4 className='pb-6 text-sm'>Netflix Philippines</h4>
    </div>
  )
}
 