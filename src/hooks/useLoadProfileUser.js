import {useState, useEffect} from "react";
const getSavedProfileUser = (key, initialValue)=>{
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) {
        return savedValue
    }
    return initialValue;
}

export const useLoadProfileUser = (key, initialValue)=>{
    const [currentUserProfile, setCurrentUserProfile] = useState(()=>{
        return getSavedProfileUser(key, initialValue)
    });

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(currentUserProfile));
    }, [currentUserProfile, key])

    return [currentUserProfile, setCurrentUserProfile];
}