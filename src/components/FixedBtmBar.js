import React from 'react'
import {BiHome} from "react-icons/bi";
import {FaSearch} from "react-icons/fa";
import {BsPlayBtn} from "react-icons/bs";
import {HiDownload, HiMenu} from "react-icons/hi";
import {useGlobalContext} from "../context/globalContext";
import {ROUTES} from "../constants/routes";
import {Link} from "react-router-dom";
export const FixedBtmBar = () => {
  const {setIsSideBarOpen} =useGlobalContext();
  return (
    <div className=' fixed md:hidden bottom-0 bg-black py-1 text-white w-full'>
      <ul className='flex justify-around'>
        <li className='flex flex-col items-center cursor-pointer hover:scale-110'>
          <p> 
            <Link to={ROUTES.BROWSE}><BiHome className='w-6 h-6'/></Link>
          </p>
          <p className='text-[10px] capitalize'>home</p>
        </li>
        <li className='flex flex-col items-center cursor-pointer hover:scale-110'>
          <p><FaSearch className='w-6 h-6'/></p>
          <p className='text-[10px] capitalize'>search</p>
        </li>
        <li className='flex flex-col items-center cursor-pointer hover:scale-110'>
          <p><BsPlayBtn className='w-6 h-6'/></p>
          <p className='text-[10px] capitalize'>coming soon</p>
        </li>
        <li className='flex flex-col items-center cursor-pointer hover:scale-110'>
          <p><HiDownload className='w-6 h-6'/></p>
          <p className='text-[10px] capitalize'>downloads</p>
        </li>
        <li 
          onClick={()=>setIsSideBarOpen(true)}
          className='flex flex-col items-center cursor-pointer hover:scale-110'
        >
          <p><HiMenu className='w-6 h-6'/></p>
          <p className='text-[10px] capitalize'>more</p>
        </li>
      </ul>
    </div>
  )
}
