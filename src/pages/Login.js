import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import {TailSpin} from "react-loader-spinner";
//src
import {GrFacebook} from "react-icons/gr";
import {ROUTES} from "../constants/routes";
//hooks
import {useError} from "../hooks/useError";
//component
import {ModalMsg} from "../components/ModalMsg";
import { Footer } from "../components/Footer";
import {FloatingInputTemp} from "../components/FloatingInputTemp";
import {BasicHeader} from "../components/headers/BasicHeader";
//auth
import {signInWithEmailAndPassword, getAuth} from "firebase/auth";
const Login = () => {

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
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
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
    if (!email || !password) {
      setIsSubmitDisabled(true);
    }else{
      setIsSubmitDisabled(false);
    }
  }, [email, password])
  
  return (
    <>
      <div className='bg-black text-white p-6 border-b border-white'>
        <BasicHeader />
        <form 
          onSubmit={handleSubmit}
          className="sign py-6 md:max-w-xs md:mx-auto">
          <p className='text-4xl font-semibold mb-6'>
            Sign In
          </p>
          {modalMessage && <ModalMsg content={modalMessage} closeModal={closeModal}/>}
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
            className='inline-flex  w-full rounded-sm bg-netflix-red hover:bg-netflix-hover transition-bg duration-200 ease-in-out cursor-pointer py-2 font-semibold mt-6 disabled:opacity-70'
          >
            <span className={`inline-block mx-auto ${isSubmitLoading && "py-0.5"}`}>
              {(isSubmitLoading?
                <TailSpin color='white' width={20} height={20}/> : "Sign In")}
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
        <div className='md:max-w-xs md:mx-auto'>
          <p className='py-2'>
            <Link to="/" className='cursor-pointer hover:underline inline-flex items-center'>
              <GrFacebook className='inline-block w-4 h-4 text-blue-700 mr-2'/> <span>Login with facebook</span>
            </Link>
          </p>
          <p className='text-gray-lighter mb-24 md:mb-64'>
            New to Netflix? <Link to={ROUTES.SIGNUP} className="text-white cursor-pointer hover:underline">Sign up now</Link>.
          </p>
        </div>
      </div>
    <Footer />
    </>
  )
}

export default Login