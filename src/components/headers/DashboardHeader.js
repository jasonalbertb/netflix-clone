import {useNavigate} from "react-router-dom";
import React , {useState}from 'react'
import logo from "../../logo.svg";
import {ROUTES} from "../../constants/routes";
import {useError} from "../../hooks/useError";
import {useGlobalContext} from "../../context/globalContext";
import {signOutAccount} from "../../services/firebase";

export const DashboardHeader = () => {
  const {userEmail} = useGlobalContext();
  const navigate = useNavigate();
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const handleBtnClick = async()=>{
    try {
      if (userEmail) { 
        setIsDisableBtn(true);
        await signOutAccount();
        setIsDisableBtn(false);
      }else{
        navigate(ROUTES.SIGNIN);
      }
    } catch (error) {
      setIsDisableBtn(false);
    }
  }
  useError();
  return (
    <div className='flex justify-between w-full items-center'>
        <img 
          className='h-8 sm:h-12'
          src={logo} alt="netflix" 
        />
        <button 
          disabled={isDisableBtn}
          onClick={handleBtnClick}
          className='block text-white bg-netflix-red px-2 py-1 rounded text-sm hover:bg-netflix-hover transition duration-200 ease-linear  sm:text-lg sm:px-4 disabled:opacity-50'
        >
          {userEmail? 'Sign Out': 'Sign In'}
        </button>
      </div>
  )
}
