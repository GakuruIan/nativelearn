import { View, Text,SafeAreaView,ScrollView,Image, Alert } from 'react-native'
import React,{useState} from 'react'
import { StatusBar } from 'expo-status-bar'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'

import {images} from '../../constants'

import { CreateUser } from '../../lib/Appwrite'

const register = () => {
   const [form, setForm] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
   });

   const [submitting,setSubmitting] = useState(false)

   const submit =async()=>{
      setSubmitting(true)

      const {username,email,password,confirmPassword} = form

      if(!username || !email || !password || !confirmPassword){
        Alert.alert("error","Please fill all the inputs")
      }

      if(password !== confirmPassword){
       Alert.alert('Error',"password dont match")
       setSubmitting(false)
        return;
      }

      try {
        
         const result = await CreateUser(username,email,password)
        //  context
        router.replace('/home')
      } catch (error) {
        Alert.alert('Error',error.message)
      }
      finally{
        setSubmitting(false)
      }

   } 

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className="relative py-4 px-4 w-full justify-center items-center min-h-[100vh]">
          <Text className="text-white text-4xl text-center font-bold">Arcanum</Text>
            
          <Image 
            source={images.path}
            resizeMode="contain"
            className="h-4 w-full justify-center items-center"
           />

          <Text className="text-gray-300 text-center font-pmedium text-sm mt-2 mb-4">Create an Arcanum account</Text>
          
          <FormField 
           title="Username"
           value={form.username}
           placeholder="username"
           handleChange={(e)=>setForm({...form,username:e})}
           secureTextEntry={false}
           otherStyles=""
           />

          <FormField 
           title="Email"
           value={form.email}
           placeholder="JohnDoe@gmail.com"
           handleChange={(e)=>setForm({...form,email:e})}
           secureTextEntry={false}
           otherStyles=""
           />

          <FormField 
           title="Password"
           value={form.password}
           placeholder="Password"
           handleChange={(e)=>setForm({...form,password:e})}
           secureTextEntry={false}
           otherStyles=""
          />

          <FormField 
            title="Confirm Password"
            value={form.confirmPassword}
            placeholder="Confirm password"
            handleChange={(e)=>setForm({...form,confirmPassword:e})}
            secureTextEntry={false}
            otherStyles=""
           />

          <CustomButton  title="Sign In"
             handlePress={submit}
             contentContainerStyle = "w-full mt-4"
             isLoading={submitting}
          />

          <Text className="text-white mt-7 font-pregular text-sm">Already have an account ? <Link href='/login' className='text-secondary-200'> Sign In</Link></Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  )
}

export default register