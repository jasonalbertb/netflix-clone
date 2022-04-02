import React from 'react'
import data from "../data/jumbo.json";
export const Jumbotron = () => {
  return (
    <>
      {data.map(item=>{
       
          return (
            <div
              key={item.id} 
              className={` my-1.5 bg-black text-white flex flex-col items-center ${item.direction === "row"? 'md2:flex-row': 'md2:flex-row-reverse'}`}
            >
              <div className='text-center pt-12 px-6 max-w-3xl md2:w-1/2 md2:pt-0 md2:px-12'>
                <h4 className='text-3xl font-bold py-4 sm:text-4xl sm:pt-6 md2:text-5xl md2:text-left md2:py-6'>{item.title}</h4>
                <p className='text-lg leading-5 sm:text-xl md2:text-2xl md2:text-left '>{item.subTitle}</p>
              </div>
              <img src={item.image} alt={item.title} className="block md2:w-1/2"/>
            </div>
          )
        })}
    </>
      
  )
}
