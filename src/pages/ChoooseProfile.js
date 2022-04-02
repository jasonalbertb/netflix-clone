import React, {useState, useEffect} from 'react'

import logo from "../logo.svg";
import {HiPlus} from "react-icons/hi";
import {FaLock} from "react-icons/fa";
import {Link , useNavigate} from "react-router-dom";
import {getUserProfiles} from "../services/firebase";
import {getAuth} from "firebase/auth";
//constants
import {ROUTES} from "../constants/routes";
//compon ents
import {Spinner} from "../components/loading/Spinner";
//hooks
import {useError} from "../hooks/useError";
//context
import {useGlobalContext} from "../context/globalContext";
const ChoooseProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const {setIsError, switchOutProfile} = useGlobalContext();
  const navigate = useNavigate();
  const gotoAddProfiles = ()=>{
    navigate(ROUTES.ADD_PROFILE);
  }

  const handleProfileClick = (username)=>{
    //check for locked profile
    //goto pin input if locked
    //set some kind of auth-like ref in firebase (session?)
    switchOutProfile(username);
    navigate(ROUTES.BROWSE);
  }
  //load profiles
  useEffect(()=>{
    (async()=>{
      try {
        const uid = getAuth().currentUser.uid;
        if (!uid) {
          throw new Error("Invalid Credentials");
        }
        const data = await getUserProfiles(uid);
        setProfiles(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(error);
      }
    })()
  }, [setIsError]);

  useError();
  if (isLoading) {
    return <Spinner />
  }
  
  return (
    <div className='flex flex-col items-center bg-black text-white p-8 sm:p-12 w-screen h-screen'>
      <Link className='block mb-8 md:mb-12' to={ROUTES.DASHBOARD}>
          <img className='h-6 md:h-12' src={logo} alt="logo" />
      </Link>
      <h4 className='mb-8 md:text-xl font-semibold'>Who's watching?</h4>
      <ul className='grid grid-cols-2 gap-6 mx-8 sm:grid-cols-3 md:grid-cols-4'>
        {profiles.map((profile, i)=>{
          return (
            <li 
              onClick={()=>handleProfileClick(profile.username)}
              key={i} className='flex flex-col hover:bg-gray-light'
            >
              <img 
                className='w-28 h-28'
                src={profile.profilePic} alt={profile.username}
              />
              <p className='text-center md:text-lg inline-flex items-center'>
                <span className='mx-auto'>
                  {profile.locked && <FaLock className='inline text-gray-lighter w-4 h-4'/>} {profile.username}
                </span>
              </p>
            </li>
          ) 
        })}
        <li className='hover:bg-gray-light' onClick={gotoAddProfiles }>
          <p className='grid place-items-center w-28 h-28'>
            <button className='bg-gray-light p-2 rounded-full'>
              <HiPlus className='w-12 h-12'/>
            </button>
          </p>
          <p className='text-center md:text-lg'>Add Profile</p>
        </li>
      </ul>
    </div>
  )
}

export default ChoooseProfile