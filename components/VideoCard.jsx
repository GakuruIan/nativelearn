import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React,{useState} from 'react'
import { icons } from '../constants'

import {ResizeMode, Video} from 'expo-av'

const VideoCard = ({video:{title,thumbnail,video,users:{avatar,username}}}) => {
  const [play, setPlay] = useState(false);
   
  return (
    <View className="flex-col items-center px-4 mb-4">
       {
        play ? 
         <Video
            source={{uri:video}}
            className="w-full h-48 items-center rounded-md bg-white/40 mt-3"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status)=>{
               console.log("playing",status.error);
               if(status.error){
                  Alert.alert("Error","An error occurred when playing the video")
                  setPlay(false)
               }
               if(status.didJustFinish){
                  setPlay(false)
               }
            }}
          />
          :
        <TouchableOpacity activeOpacity={0.7} onPress={()=>setPlay(true)} className="mt-3 h-48 overflow-hidden rounded-md w-full relative justify-center items-center">
             <Image source={{uri:thumbnail}} resizeMode='cover' className="h-full w-full"/>
             <Image source={icons.play} resizeMode='contain' className="h-10 w-10 absolute "/>
        </TouchableOpacity>
       }

      <View className="flex-row gap-3 items-start mt-1">
               <Image source={{uri:avatar}} resizeMode="cover" className="h-8 w-8 rounded-full object-contain"/>
               <View className="justify-center flex-1">
                  <Text className="text-white text-sm font-psemibold mb-0.1" numberOfLines={1}>{title}</Text>
                  <Text className="text-xs font-pregular text-gray-100" numberOfLines={1}>{username}</Text>
               </View>

            <View>
                <Image source={icons.menu} resizeMode="contain" className="h-4 w-4"/>
            </View>
       </View>
    </View>
  )
}

export default VideoCard