import { View, Text, Image } from 'react-native'
import React from 'react'
import {images} from '../constants'
import CustomButton from '../components/CustomButton'
import {router} from 'expo-router'

const EmptyState = ({title,subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image 
        source={images.empty}
        resizeMode='contain'
        className="h-48 w-48"
      />
      
      <Text className="font-psemibold text-white text-xl">{title}</Text>
      <Text className="font-pregular text-white text-sm my-4">{subtitle}</Text>
      <CustomButton title="Create video" contentContainerStyle="w-full" handlePress={()=>router.push('/create')}/>
    </View>
  )
}

export default EmptyState