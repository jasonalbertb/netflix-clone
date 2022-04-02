import React ,{useState} from 'react';
import ReactDOM from "react-dom";

export const PlayerBtn = ({children, src, ...restProps}) => {
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    return (
        <>
            <button 
                {...restProps} 
                onClick={()=>{
                    setIsPlayerOpen(true)
                }}
            >
                {children}
            </button>
            {isPlayerOpen && (
                ReactDOM.createPortal(
                    <div 
                        className={`w-screen h-screen bg-gray-clear2 grid place-items-center fixed top-0 left-0 z-100`}
                        onClick={()=>setIsPlayerOpen(false)}
                    >
                        <video width={480} height={360} controls>
                        <source src={src} type="video/mp4"/>
                        Your browser does not support the video tag.
                        </video>
                    </div>,
                    document.body
                )
            )}
        </>
    )
      
}
