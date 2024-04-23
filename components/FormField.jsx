import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormField = ({title,handleChange,otherStyles,}) => {
  return (
    <View className="my-1">
      <Text className="text-white text-sm font-pregular mb-2">{title}</Text>
      <View className="bg-black-100 mb-4  w-full h-14 rounded-sm">
          <TextInput className="flex-1 px-2  text-white font-pregular text-base"/>
      </View>
    </View>
  )
}

export default FormField