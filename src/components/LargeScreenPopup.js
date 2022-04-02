import React, {useContext} from 'react'
import {BrowseContext} from "../context/BrowseContext";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";
import {FiLogOut} from "react-icons/fi";
import {useGlobalContext} from "../context/globalContext";
import {signOutAccount} from "../services/firebase";
export const LargeScreenPopup = () => {
  const {isPopupOpen, setIsPopupOpen} = useContext(BrowseContext);
  const {switchOutProfile, profileInfo} = useGlobalContext();
  return (
    <div 
      onMouseEnter={()=>setIsPopupOpen(true)}
      onMouseLeave={()=>setIsPopupOpen(false)}
      className={`${isPopupOpen?"block": "hidden"} opacity-0 md:opacity-100 absolute top-14 right-12 z-50 w-40 bg-gray-clear p-4 text-white transiton-scale duration-200 ease-in-out`}>
      <div className='flex justify-between mb-1'>
        <p>{profileInfo.username}</p>
        <button onClick={()=>switchOutProfile("")}>
          <HiOutlineSwitchHorizontal className='w-5 h-5 hover:scale-110'/>
        </button>
      </div>
      <div className='flex justify-between'>
        <p>logout</p>
        <button onClick={()=>signOutAccount("")}>
          <FiLogOut className='inline w-5 h-5 hover:scale-110'/>
        </button>
      </div>
    </div>
  )
}
