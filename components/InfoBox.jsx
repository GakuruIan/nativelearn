import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title,subtitle}) => {
  return (
    <View className="items-center mx-6">
      <Text className="text-white  text-base font-psemibold">{title}</Text>
      <Text className="text-white text-sm font-pregular">{subtitle}</Text>
    </View>
  )
}

export default InfoBox