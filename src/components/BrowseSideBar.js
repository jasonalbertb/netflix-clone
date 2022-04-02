import React from 'react'

import {MdOutlineClose} from "react-icons/md";
import {HiOutlineSwitchHorizontal} from "react-icons/hi";
import {BiLogOut} from "react-icons/bi";
import {signOutAccount} from "../services/firebase";
//context

import {useGlobalContext} from "../context/globalContext";
export const BrowseSideBar = () => {
    const {switchOutProfile, isSideBarOpen, setIsSideBarOpen, profileInfo}  = useGlobalContext();
    return (
        <div className={`text-white fixed top-0 left-0 z-50 w-screen h-screen transition duration-150 ease-linear ${isSideBarOpen? "translate-x-0": "translate-x-[-100%]"}`}>
            <div className='relative w-full h-full bg-gray-clear3 pt-16 px-8'>
                <button 
                    onClick={()=>setIsSideBarOpen(false)}
                    className='absolute block top-8 right-8 hover:scale-125 transition-scale duration-100 ease-in'
                >
                    <MdOutlineClose className='w-8 h-8'/>
                </button>
                <ul>
                    <li className='flex border-b pb-2 border-gray-lighter'>
                        <img 
                            className='w-16 h-16 mr-4'
                            src={profileInfo.profilePic} alt={profileInfo.username}
                        />
                        <p className='flex flex-col'>
                            <span className='text-2xl tracking-widest mb-1'>{profileInfo.username} </span>
                            <button 
                                onClick={()=>switchOutProfile("")}
                                className={`inline-flex items-center border rounded-full px-2 py-0.5 
                                            hover:bg-white hover:text-black transition-bg duration-200 ease-in-out`}>  
                                <span>Switch account</span> 
                                <HiOutlineSwitchHorizontal className='w-4 h-4 mx-1'/>
                            </button>
                        </p>   
                    </li>
                    <li className='py-2'>
                        <button 
                            onClick={signOutAccount}
                            className='inline-flex items-center hover:underline'
                        >
                            <BiLogOut className='inline w-6 h-6'/>
                            <span className='text-lg'>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
