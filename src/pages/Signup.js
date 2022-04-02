import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {BtnSpinner} from "../components/loading/BtnSpinner";
import {ROUTES} from "../constants/routes";
//services
import {createUser} from "../services/firebase";
//hooks
import {useError} from "../hooks/useError";
//component
import {ModalMsg} from "../components/ModalMsg";
import { Footer } from "../components/Footer";
import {FloatingInputTemp} from "../components/FloatingInputTemp";
import {BasicHeader} from "../components/headers/BasicHeader";
const Signup = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const closeModal = ()=>{
    setModalMessage(null);
  }
  const handleSubmit = async(e)=>{
    try {
      e.preventDefault();
      setIsSubmitDisabled(true);
      setIsSubmitLoading(true);
      await createUser({username, email, password});
    } catch (error) {
      setModalMessage(error.message);
      setIsSubmitDisabled(false);
      setIsSubmitLoading(false);
    } 
  }
  const changeHandler = (f)=>{
    return (e)=>{
      f(e.target.value);
    }
  }
  useError();
  useEffect(() => {
    if (!username|| !email || !password) {
      setIsSubmitDisabled(true);
    }else{
      setIsSubmitDisabled(false);
    }
  }, [username, email, password])
  
  return (
    <>
      <div className='bg-black text-white p-6 border-b border-white'>
        <BasicHeader />
        <form 
          onSubmit={handleSubmit}
          className="sign py-6 md:max-w-xs md:mx-auto">
          <p className='text-4xl font-semibold mb-6'>
            Sign Up
          </p>
          {modalMessage && <ModalMsg content={modalMessage} closeModal={closeModal}/>}
          <FloatingInputTemp 
            className="my-2" 
            type="text" label="Username" 
            value={username} 
            onChange={changeHandler(setUsername)}/>
          <FloatingInputTemp 
            className="my-4" 
            type="text" label="Email or phone number" 
            value={email} 
            onChange={changeHandler(setEmail)}/>
          <FloatingInputTemp 
            className="my-2" 
            type="password" label="Password" 
            value={password} 
            onChange={changeHandler(setPassword)}/>
          
          <button 
            disabled={isSubmitDisabled}
            type='submit'
            className='inline-flex w-full rounded-sm bg-netflix-red hover:bg-netflix-hover transition-bg duration-200 ease-in-out cursor-pointer py-2 font-semibold mt-6 disabled:opacity-70'
          >
            <span className={`inline-block mx-auto ${isSubmitLoading && "py-0.5"}`}>
              {(isSubmitLoading?
                <BtnSpinner/> : "Sign Up")}
            </span>
          </button>
          <div className='flex justify-between text-gray-lighter text-sm items-center'>
            <p className='py-2'>
              <input
                type="checkbox" 
                className='checked:bg-gray-500'
              /> 
              <label> Remember me</label>
            </p>
            <p><Link to="/" className='cursor-pointer hover:underline'>Need help?</Link></p>
          </div>
        </form>
        <p className='md:max-w-xs md:mx-auto mb-24 md:mb-60 text-gray-lighter'>
          Already have an account? <Link to={ROUTES.SIGNIN} className="cursor-pointer text-white hover:underline">Login</Link>
        </p>
      </div>
    <Footer />
    </>
  )
}

export default Signup