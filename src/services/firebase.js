import { getAuth, createUserWithEmailAndPassword,signOut } from "firebase/auth";
import { 
    getFirestore, setDoc, doc, getDoc,updateDoc,
    Timestamp, arrayUnion,
    collection, query, getDocs
} from "firebase/firestore";
//constants
import {PICS} from "../constants/profilePics";
import {BROWSE_TABS} from "../constants/browseTabs";
export const createUser = async({username, email, password})=>{
    try {
        const auth = getAuth();
        const cred = await createUserWithEmailAndPassword(auth, email, password);  

        if (!cred || !cred.user || !cred.user.uid) {
            throw new Error("Invalid Credentials");
        }
        const db = getFirestore();
        await setDoc (doc(db, "accounts", cred.user.uid),{
            profiles: [{
                username, 
                pin: "", 
                locked: false,
                profilePic : PICS[Math.floor(Math.random() * PICS.length)],
                restriction : 0,
                createdAt: Timestamp.now(), 
            }],
            createdAt: Timestamp.now()
        });
    } catch (error) {
        throw(error)
    }
}

export const getUserProfiles = async (id)=>{
    try {
        const db = getFirestore();
        const docRef = doc(db, "accounts", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error("Invalid Credentials");
        } 
        return docSnap.data().profiles.map(profile=>{
            const {username, locked, profilePic} = profile;
            return {username, locked, profilePic};
        })

    } catch (error) {
        throw(error);
    }
}

export const addProfile = async({accId, username, restriction=0})=>{
    try {
        if (!username) {
            throw new Error("Profile name can't be empty!");
        }
        const db = getFirestore();
        const docRef = doc(db, "accounts", accId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const exists = docSnap.data().profiles.find(profile => profile.username === username);
            if (exists) {
                throw new Error("Profile name already exists!");
            }
            await updateDoc(docRef, {
                profiles : arrayUnion({
                    createdAt : Timestamp.now(),
                    locked : false,
                    pin : "",
                    restriction,
                    username,
                    profilePic : PICS[Math.floor(Math.random() * PICS.length)],
                })
            });
        } else{
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        throw error;
    }
}


export const getProfileByUsername = async({accId, username})=>{
    const db = getFirestore();
    const docRef = doc(db, "accounts", accId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data().profiles.find(profile=> profile.username === username);
        if (data) {
            return {profilePic: data.profilePic, username: data.username}
        } 
    }
    return null;
}

export const signOutAccount = async()=>{
    try {
        const auth = getAuth();
        await (signOut(auth)); 
    } catch (error) {
        throw error
    }
}

export const getShowsByType = async(type)=>{
    const data = [];
    const db = getFirestore();
    if (type.toLowerCase() === BROWSE_TABS[0]) {
        await Promise.all(BROWSE_TABS.slice(1).map(async (tab) => {
            const q = query(collection(db, tab));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => data.push({id:doc.id, ...doc.data(), type: tab}));
        }));
        // for (let i = 1; i < BROWSE_TABS.length; i++){
        //     const q = query(collection(db, BROWSE_TABS[i]));
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.forEach((doc) => data.push({is:doc.id, ...doc.data()}));
        // }
    }else{
        const q = query(collection(db, type));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => data.push({id:doc.id, ...doc.data(), type}));
    }
    return data;   
}

export const getShowInfoByTypeAndId = async({type, showId})=>{
    try {
        const db = getFirestore();
        const docRef = doc(db, type, showId);

        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error("Resource not found")
        } 
        return {type, ...docSnap.data()};
    } catch (error) {
        console.log(error);
        throw(error)
    }
    
}   