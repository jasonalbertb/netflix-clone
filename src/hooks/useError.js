import {useEffect} from 'react'
import {useGlobalContext} from "../context/globalContext";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../constants/routes";

export const useError = () => {
    const {isError}= useGlobalContext(); 
    const navigate = useNavigate();
    return (
        useEffect(()=>{
            if (isError) {
                navigate(ROUTES.ERR);
            }
        }, [isError, navigate])
    )
}
