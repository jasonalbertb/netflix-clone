import React, {useContext, useState} from 'react';
// import {useLoadProfileUser} from "../hooks/useLoadProfileUser";
// import {TOKENS} from "../constants/tokens";
export const AppContext = React.createContext();

export const AppProvider = ({children})=>{
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [isFirebaseInit, setIsFirebaseInit] = useState(false);
    const [currentUserProfile, setCurrentUserProfile] = useState("");
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [profileInfo, setProfileInfo] = useState(null);
    const switchOutProfile = (profile)=>{
        try {
            if (profile) {
                //do something here
                setCurrentUserProfile(profile);
            } else{
                setCurrentUserProfile("");
            }
        } catch (error) {
           console.log(error); 
           setCurrentUserProfile("");
        }
    }
    return(
        <AppContext.Provider
            value={{
                isLoading, setIsLoading, 
                isError, setIsError,
                userEmail, setUserEmail,
                isFirebaseInit, setIsFirebaseInit,
                currentUserProfile, switchOutProfile,
                isSideBarOpen, setIsSideBarOpen,
                profileInfo, setProfileInfo
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    
    return (
        useContext(AppContext)
    )
}
