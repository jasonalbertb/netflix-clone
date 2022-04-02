import {useEffect} from 'react'
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useGlobalContext} from "../context/globalContext";
export const useAuthListener = () => {
    const {setUserEmail, isFirebaseInit, setIsLoading, switchOutProfile} = useGlobalContext();
    
    return (
        useEffect(()=>{
            if (isFirebaseInit) {
                const auth = getAuth();
                const unsub = onAuthStateChanged(auth, user=>{
                    if (user) {
                        setUserEmail(user.email)
                    }else{
                        setUserEmail(null);
                        switchOutProfile("");
                    }

                    setIsLoading(false); 
                })
                return ()=>{
                    unsub();
                }
            }
        }, [isFirebaseInit,setIsLoading, setUserEmail, switchOutProfile])
  )
}
