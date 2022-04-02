import React , {useContext} from 'react'
import {Link} from "react-router-dom";
import logo from "../../logo.svg";
import {FaSearch} from "react-icons/fa";
import {SiNetflix} from "react-icons/si";
//constants
import {ROUTES} from "../../constants/routes";
import {BROWSE_TABS} from "../../constants/browseTabs";
//context
import {BrowseContext} from "../../context/BrowseContext";
import {useGlobalContext} from "../../context/globalContext";
//components
import {HeroLargeDesc} from "../HeroLargeDesc";
import {HeroMobileDesc} from "../HeroMobileDesc";
export const BrowseHeader = () => {
  const {
    changeTab,
    searchInput, setSearchInput, handleSearchSubmit,
    setIsPopupOpen
  } = useContext(BrowseContext);
  const {profileInfo} = useGlobalContext();
  return (
      <div className={`relative bg-[url('../public/images/misc/joker1.jpg')] h-[450px] bg-center bg-cover
                        lg:h-[700px]  lg:bg-left-top lg:bg-cover lg:py-2 lg:px-4`}>
        <div 
          className={ `flex bg-transparent px-4 w-full items-center py-1 text-white top-0 left-0 h-14
                      sm:py-4 sm:px-8 sm:h-auto
                      lg:bg-transparent`}
        >
          <div className='flex flex-1 w-full items-center'>
            <Link to={ROUTES.BROWSE} className="block">
              <SiNetflix className='w-8 h-8 sm:hidden text-netflix-red'/>
              <img 
                className='h-8 hidden sm:block lg:mr-8'
                src={logo} alt="logo"
              />
            </Link>
            <ul 
              className='flex w-full justify-around lg:pr-20 lg:py-1 lg:bg-gray-clear lg:w-auto'>
              {BROWSE_TABS.map((tab, i)=>{
                return (
                  <li 
                    onClick={()=>changeTab(tab)}
                    key={i} 
                    className={`capitalize px-4 tracking-wider font-medium cursor-pointer hover:font-bold hover:scale-110`} 
                  >
                    {tab}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='hidden md:block'> 
            <form
              className='flex'
              onSubmit={handleSearchSubmit}
            >
              <button 
                type='submit' 
                className='px-2 cursor-pointer transition-scale duration-200 ease-out hover:scale-125'
              >
                <FaSearch />
              </button>
              <input 
                className={`bg-gray-light rounded-md focus:bg-transparent text-white px-2 py-0.5 text-sm focus:text-gray-100
                            lg:bg-gray-clear lg:border-0 lg:focus:bg-gray-clear2 focus:outline-none focus:border`}
                type="text" value={searchInput} placeholder="Search"
                onChange={e=>setSearchInput(e.target.value)}
              />
              <img
                onClick={()=>setIsPopupOpen(prev=> !prev)}
                onMouseEnter={()=>setIsPopupOpen(true)}
                onMouseLeave={()=>setIsPopupOpen(false)}
                className='ml-2 w-8 h-8 cursor-pointer'
                src={profileInfo.profilePic} alt={profileInfo.username}
              />
            </form>
          </div>
        </div>
        <HeroMobileDesc />
        <HeroLargeDesc />
      </div>
    
  )
}
