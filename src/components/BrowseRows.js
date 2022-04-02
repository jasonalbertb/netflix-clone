import React from 'react'
import {MdMoreHoriz} from "react-icons/md";
import {ROUTES} from "../constants/routes";
import {useNavigate} from "react-router-dom"
export const BrowseRows = ({genre, list}) => {
  const navigate = useNavigate();
  const handleGotoShow = ({id, type})=>{
    navigate(`${ROUTES.BROWSE}/${type}/${id}`);
  }
  return (
    <div className='py-4 px-3 md:px-8'>
      <p className='text-xs font-semibold capitalize mb-1 sm:text-base flex justify-between'>
        <span>{genre}</span>
        <button className='hidden sm:inline-block text-xs hover:underline text-gray-lighter'>See more &gt;&gt;</button>
      </p>
      <ul className='flex flex-row overflow-x-auto lg:overflow-hidden'>
        {list.slice(0, 5).map(item=>{
          return(
            <li 
              key={item.id} 
              onClick={()=>handleGotoShow({id: item.id, type: item.type})}
              className={`px-1 relative min-w-[150px] md:min-h-max 
                          hover:z-50 `}
            >
              <img 
                className={`block cursor-pointer `}
                src={`/images/${item.type}/${item.genre}/${item.slug}/small.jpg`} 
                alt={item.title}/>
              <div className='absolute text-white bottom-0 bg-gray-clear2 w-full'>
                <h4 className='text-sm font-semibold'>{item.title}</h4>
              </div>
            </li>
          )
        })}
        <li className='grid place-items-center bg-gray-clear2 h-20 relative flex-col items-center sm:hidden min-w-[100px] '>
            <span className='text-xs hover:underline'>See More <MdMoreHoriz className='inline'/></span>
        </li>
      </ul>
    </div>
  )
}
