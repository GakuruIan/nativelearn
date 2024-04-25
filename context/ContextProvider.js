import { createContext,useContext,useState,useEffect } from "react";
import { Getcurrentuser } from "../lib/Appwrite";
const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children})=>{

    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [user,setUser] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
        
    useEffect(()=>{
        Getcurrentuser().then((res)=>{
            if(res){
                setIsLoggedIn(true)
                setUser(res)
            }
            else{
                setIsLoggedIn(false)
                setUser(null)
            }
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[])

   return (
    <GlobalContext.Provider 
    value={{
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser
    }}>
           {children}
    </GlobalContext.Provider>
   )
}

export default GlobalProvider;