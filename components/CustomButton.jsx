import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title,handlePress,contentContainerStyle,isLoading,textSytles}) => {
  return (
    <TouchableOpacity 
      className={`justify-center items-center rounded-md bg-secondary px-2 py-4 ${contentContainerStyle} ${isLoading ? 'opacity-50' : ''}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-base text-primary font-psemibold ${textSytles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton