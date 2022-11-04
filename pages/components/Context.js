import { createContext,useState,useEffect } from "react";
import { onAuthStateChanged ,getAuth} from "firebase/auth";
import {firebaseapp} from "./firebase"

export const Auth = createContext()

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState({})
   
const auths = getAuth(firebaseapp)

    useEffect(()=>{
     onAuthStateChanged(auths,(user)=>{
            setUser(user)
            
        })
    },[auths])
    return(
        <Auth.Provider value={{user}}>
            {children}
        </Auth.Provider>
    )
}