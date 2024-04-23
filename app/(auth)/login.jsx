import { View, Text, ScrollView,Image, Alert } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Link, router } from 'expo-router'

import CustomButton from '../../components/CustomButton'
import FormField from '../../components/FormField'

import {images} from '../../constants'

import { signIn } from '../../lib/Appwrite'

const Login = () => {
  const [form,setForm] = useState({
    email:'',
    password:''
  })

  const [submitting,setSubmitting] = useState(false)

  const submit=async()=>{
    setSubmitting(true)
   const {email,password} = form

   if(!email || !password){
    Alert.alert('Error',"Please Fill in all the inputs")
   }
   try {
     await signIn(email,password)

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
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView contentContainerStyle={{height:'100%'}}>
      <View className="relative  px-4 w-full justify-center  min-h-[100vh]">
          <Text className="text-white text-4xl text-center font-bold">Arcanum</Text>
            
          <Image 
            source={images.path}
            resizeMode="contain"
            className="h-4 w-full justify-center items-center"
           />

          <Text className="text-gray-300 text-center font-pmedium text-sm mt-2 mb-4">Login to Arcanum</Text>
           
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

          <CustomButton  title="Sign In"
             handlePress={submit}
             contentContainerStyle = "w-full mt-4"
             isLoading={submitting}
          />

          <Text className="text-white text-center mt-7 font-pregular text-sm">Don't have an account ? <Link href='/register' className='text-secondary-200'> Sign In</Link></Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default Login