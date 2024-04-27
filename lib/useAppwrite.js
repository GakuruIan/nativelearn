import { useState,useEffect } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn)=>{

const [data,setData] = useState([]);
const [isLoading,setIsLoading] = useState(true)

const FetchData = async()=>{
  setIsLoading(true)
 try {
  const response = await fn()
  setData(response)
 } catch (error) {
   Alert.alert('Error',error.message)
 }
 finally{
  setIsLoading(false)
 }
}

  useEffect(()=>{
    FetchData()
  },[])

 const refetch =()=> FetchData()

  return {data,isLoading,refetch}
}

export default useAppwrite