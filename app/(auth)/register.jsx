import { View, Text,SafeAreaView,ScrollView,Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'

import {images} from '../../constants'

const register = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className="relative px-4 w-full justify-center  min-h-[100vh]">
          <Text className="text-white text-4xl text-center font-bold">Arcanum</Text>
            
          <Image 
            source={images.path}
            resizeMode="contain"
            className="h-4 w-full justify-center items-center"
           />

          <Text className="text-gray-300 text-center font-pmedium text-sm mt-2 mb-4">Login to Arcanum</Text>
           
          <FormField title="Email"/>
          <FormField title="Password"/>

          <CustomButton  title="Sign In"
             handlePress={()=>{}}
             contentContainerStyle = "w-full mt-4"
          />

          <Text className="text-white mt-7 font-pregular text-sm">Already have an account ? <Link href='/login' className='text-secondary-200'> Sign In</Link></Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  )
}

export default register