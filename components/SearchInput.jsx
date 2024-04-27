import { View, Text, TextInput, TouchableOpacity,Image, Alert } from 'react-native'
import React, {useState} from 'react'

import { icons } from '../constants';

import { router, usePathname } from 'expo-router';

const SearchField = ({otherStyles,placeholder,initialQuery}) => {
  const [query,setQuery] = useState(initialQuery || '')
  const pathname = usePathname()

  return (
    <View className={`my-1 ${otherStyles}`}>
      <View className="bg-black-100 mb-4  w-full h-14 rounded-sm flex-row items-center pr-2 space-x-4 ">
          <TextInput 
            className="flex-1 px-2  text-white font-pregular text-base "
            value={query}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={(e)=>setQuery(e)}
          />
          
          <TouchableOpacity
            onPress={()=>{
              if(!query){
                return Alert.alert('Missing query',"Please enter search term")
              }
              if(pathname.startsWith('/search')) {
                router.setParams({query})
              }
              else{
                router.push(`/search/${query}`)
              }
            }}
          >
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