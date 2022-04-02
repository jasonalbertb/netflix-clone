import React, {useEffect} from 'react'

export const ModalMsg = ({content, closeModal}) => {
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            closeModal()
        }, 5000);
        return ()=>{
            clearTimeout(timeout);
        }
    })
    return (
        <div className='text-white text-sm bg-[#e87c03] px-4 py-2 my-4 rounded-sm'>
            {content}
        </div>
    )
}
