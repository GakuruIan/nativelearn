import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native'
import React, {useState} from 'react'

import { icons } from '../constants';

const SearchField = ({value,handleChange,otherStyles,placeholder,secureTextEntry,...props}) => {
  return (
    <View className={`my-1 ${otherStyles}`}>
      <View className="bg-black-100 mb-4  w-full h-14 rounded-sm flex-row items-center pr-2 space-x-4">
          <TextInput 
            className="flex-1 px-2  text-white font-pregular text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChange}
          />
          
          <TouchableOpacity>

           <Image
            source={icons.search}
            resizeMode="contain"
            className="h-5 w-5"
           />
          </TouchableOpacity>
          
      </View>
    </View>
  )
}

export default SearchField