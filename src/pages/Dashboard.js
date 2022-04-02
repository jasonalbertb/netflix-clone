import React from 'react'
import {HiOutlineChevronRight} from "react-icons/hi";
import {Link} from "react-router-dom";
//components
import { DashboardHeader } from "../components/headers/DashboardHeader";
import {FloatingInput} from "../components/FloatingInput";
import {Jumbotron} from "../components/Jumbotron";
import {FAQs} from "../components/FAQs";
import {Footer} from "../components/Footer";
//context 
import {useGlobalContext} from "../context/globalContext";
//const
import {ROUTES} from "../constants/routes";
const Dashboard = () => {
  const {userEmail} = useGlobalContext();
  return (
   <div className='bg-gray-900'>
      <div className="bg-[url('../public/images/misc/home-bg.jpg')] p-8 text-white grid place-items-center" >
        <DashboardHeader />
        <div className='flex flex-col items-center py-20 text-center sm:py-36'>
          <h2 className='text-4xl font-bold lg:font-semibold pb-4 max-w-xl sm:text-6xl sm:leading-[1.05]'>Unlimited movies, TV shows, and more</h2>
          <p className='text-xl sm:font-medium pb-4 sm:text-3xl'>Watch anywhere. Cancel Anytime.</p>
          <p className='text-md leading-4 sm:text-2xl sm:font-medium max-w-sm sm:max-w-lg lg:text-xl sm:leading-5 lg:max-w-full'>Ready to watch? Enter your email to create or restart your membership</p>
          
          {(userEmail?
            <div className='mt-8'>
              <Link 
                className=' uppercase tracking-widest inline-flex items-center px-4 py-2  font-semibold rounded bg-netflix-red hover:bg-netflix-hover transition duration-200 ease-linear cursor-pointer lg:text-2xl lg:px-8 lg:py-3'
                to={ROUTES.BROWSE}>
                  Browse
              </Link>
            </div>
            :
              <div className='sm:max-w-lg lg:flex lg:my-5 w-full lg:max-w-full lg:w-[700px]'>
              <FloatingInput />
              <button
                className='inline-flex items-center px-4 py-2  font-semibold rounded bg-netflix-red hover:bg-netflix-hover transition duration-200 ease-linear cursor-pointer lg:text-2xl lg:px-8 lg:py-3'
              >
                Get Started <HiOutlineChevronRight className='lg:translate-y-0.5 inline'/>
              </button>
            </div>
            )}
          

        </div>
      </div>
      <Jumbotron />
      <FAQs />
      <Footer />
   </div>
  )
}

export default Dashboard