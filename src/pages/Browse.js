import React ,  {useState, useEffect} from 'react'
import {getProfileByUsername} from "../services/firebase";
import {getAuth} from "firebase/auth";
//context
import {BrowseContext} from "../context/BrowseContext"
import {useGlobalContext} from "../context/globalContext";
//constants
import {BROWSE_TABS} from "../constants/browseTabs";
//components
import {BrowseHeader} from "../components/headers/BrowseHeader";
import {BrowseTab} from "../components/BrowseTab";
import { BrowseSideBar } from '../components/BrowseSideBar';
import {FixedBtmBar} from "../components/FixedBtmBar";
import {Spinner} from "../components/loading/Spinner";
import {LargeScreenPopup} from "../components/LargeScreenPopup";
import {Footer} from "../components/Footer";
const Browse = () => {
  const {currentUserProfile, isSideBarOpen, setProfileInfo} = useGlobalContext();
  const [tabOpen, setTabOpen] = useState(BROWSE_TABS[0]);

  const [isLoading, setIsLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const changeTab = (tab)=>{
    if (BROWSE_TABS.includes(tab)) {
      setTabOpen(tab);
    }else{
      setTabOpen(BROWSE_TABS[0]);
    }
  }
  const handleSearchSubmit = async(e)=>{
    e.preventDefault();
  }
  useEffect(()=>{
    (async()=>{
      const accId = getAuth().currentUser.uid;
      const data = await getProfileByUsername({accId, username : currentUserProfile})
      if (data) {
        setProfileInfo(data);
        setIsLoading(false);
      }
    })();
  }, [currentUserProfile, setProfileInfo])
  if (isLoading) {
    return <Spinner />
  }
  let overflow = isSideBarOpen;
  return (
    <BrowseContext.Provider
      value={{
        tabOpen, setTabOpen,
        changeTab,
        searchInput, setSearchInput, handleSearchSubmit,
        isPopupOpen, setIsPopupOpen
      }}
    >
      <BrowseSideBar />
        <div className={`relative w-screen h-screen ${overflow && "overflow-y-hidden"}`}>
          <LargeScreenPopup />
          <BrowseHeader />
          <BrowseTab />
          <Footer/>
          <FixedBtmBar />
        </div>

    </BrowseContext.Provider>

  )
}

export default Browse