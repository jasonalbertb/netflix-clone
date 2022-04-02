import {useEffect} from 'react'
import { initializeApp } from "firebase/app";
import {useGlobalContext} from "../context/globalContext";
export const useFirebaseInit = () => {
    const {setIsFirebaseInit} = useGlobalContext();
    return (
        useEffect(()=>{
            try {
                setIsFirebaseInit(false);
                const firebaseConfig = {
                    apiKey: process.env.REACT_APP_apiKey,
                    authDomain: process.env.REACT_APP_authDomain,
                    projectId: process.env.REACT_APP_projectId,
                    storageBucket: process.env.REACT_APP_storageBucket,
                    messagingSenderId: process.env.REACT_APP_messagingSenderId,
                    appId: process.env.REACT_APP_appId
                };
                initializeApp(firebaseConfig);
                setIsFirebaseInit(true);
            } catch (error) {
                setIsFirebaseInit(false);
                console.log(error);
            }
        }, [setIsFirebaseInit])
    )
}
