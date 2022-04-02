import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {BtnSpinner} from "../components/loading/BtnSpinner";
import {addProfile} from "../services/firebase";
import {getAuth} from "firebase/auth";
//constants
import {PICS} from "../constants/profilePics";
//conponents
import {BasicHeader} from "../components/headers/BasicHeader";
import {ModalMsg} from "../components/ModalMsg";
import { ROUTES } from '../constants/routes';

const AddProfile = () => {
  const [nameInput, setNameInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(false);
  const [isAddBtnLoading, setIsAddBtnLoading] = useState(false);
  const [modalMessage, setModalMessage]= useState(null);

  const closeModal = ()=>{
    setModalMessage(null);
  }

  const navigate = useNavigate();
  const addBtnHandler = async()=>{
    try {
      setIsAddBtnDisabled(true);
      setIsAddBtnLoading(true);
      const uid = getAuth().currentUser.uid;
      const restriction = isChecked? 15 : 0;

      await addProfile({accId: uid, username : nameInput, restriction});
      navigate(ROUTES.CHOOSE_PROFILE);
    } catch (error) {
      console.log(error);
      setModalMessage(error.message)
      setIsAddBtnDisabled(false);
      setIsAddBtnLoading(false)
    }
  }

  useEffect(()=>{
    setIsAddBtnDisabled(nameInput === "");
  }, [nameInput]);

  return (
    <div className=' bg-black text-white p-8 w-screen h-screen'>
      <div className='w-full max-w-sm mx-auto'>
        <BasicHeader />
        <h2 className='text-4xl font-medium mt-8 mb-4'>Add Profile</h2>
        {modalMessage && <ModalMsg content={modalMessage} closeModal={closeModal}/>}
        <h4 className='text-gray-lighter pb-4 border-b m-0 border-gray-light'>Add a profile for another person watching Netflix</h4>
        <p className='py-4 m-0 flex items-center border-b border-gray-light'>
          <img 
            className='w-16 h-16 sm:w-24 sm:h-24'
            src={PICS[0]} alt="profile-pic"/>
          <input
            className='flex-1 mx-2 bg-gray-light text-sm px-4 py-1 focus:outline-none'
            type="text" placeholder="Name"
            value={nameInput} onChange={e=> setNameInput(e.target.value)}
          />
          <span>
            <input
              type="checkbox"
              value={isChecked} onClick={e=>setIsChecked(e.target.checked)}
            /> Kid?
          </span>
        </p>

        <p className='flex items-center'> 
          <button 
            disabled={isAddBtnDisabled}
            onClick={addBtnHandler}
            className={`${isAddBtnLoading && "px-14"} mr-4 my-4 uppercase tracking-widest text-sm bg-netflix-red  cursor-pointer px-4 py-1 rounded-sm disabled:opacity-50`}
          >
            {isAddBtnLoading? <BtnSpinner/> : "Continue"}
          </button>
          <button 
            onClick={()=>navigate(-1)}
            className='uppercase tracking-widest text-sm bg-transparent border border-gray-light hover:bg-gray-lighter hover:text-black hover:font-medium cursor-pointer px-4 py-1 transition-bg duration-200 ease-out rounded-sm'>
            Cancel
          </button>
        </p>
      </div>
    </div>
  )
}

export default AddProfile