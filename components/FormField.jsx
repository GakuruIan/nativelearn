import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native'
import React, {useState} from 'react'

import { icons } from '../constants';

const FormField = ({title,value,handleChange,otherStyles,placeholder,secureTextEntry,...props}) => {
  const [showPassword,setShowPassword] =  useState(false);
  return (
    <View className={`my-1 ${otherStyles}`}>
      <Text className="text-white text-sm font-pregular mb-2">{title}</Text>
      <View className="bg-black-100 mb-4  w-full h-14 rounded-sm flex-row items-center pr-2">
          <TextInput 
            className="flex-1 px-2  text-white font-pregular text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChange}
            secureTextEntry={ ( title === 'Password' || title === 'Confirm Password') && !showPassword}
          />
          {
           ( title === 'Password' || title === 'Confirm Password') && (
              <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
                  <Image source={!showPassword ? icons.eye : icons.eyeHide} resizeMode="contain" className="h-6 w-6"/>
              </TouchableOpacity>
            )
          }
      </View>
    </View>
  )
}

export default FormField