import { View, Text, FlatList, TouchableOpacity, ImageBackground ,Image} from 'react-native'
import React,{useState} from 'react'
import * as Animatable from 'react-native-animatable'
import {ResizeMode, Video} from 'expo-av'

import { icons } from '../constants'

const zoomIn = {
  0:{
    scale:0.9
  },
  1:{
    scale:1.02
  }
}

const zoomOut = {
  0:{
    scale:1.02
  },
  1:{
    scale:0.9
  }
}

const TrendingItem = ({activeItem,item})=>{
  const [playing,setPlaying] = useState(false)
 
  return (
    <Animatable.View
     className="mr-3"
     animation={activeItem === item.$id ? zoomIn : zoomOut}
     duration={500}
    >
      {
        playing ? 
        <Video
          source={{uri:item.video}}
          className="w-52 h-72 rounded-md bg-white/40"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status)=>{
            if(status.didJustFinish){
                setPlay(false)
            }
          }}
      /> 
        :
        <TouchableOpacity activeOpacity={0.7} onPress={()=>setPlaying(true)} className="mt-3  overflow-hidden rounded-md w-full relative justify-center items-center">
             <ImageBackground source={{uri:item.thumbnail}} resizeMode='cover' className="h-72 w-52 rounded-md"/>
             <Image source={icons.play} resizeMode='contain' className="h-10 w-10 absolute "/>
        </TouchableOpacity>
      }
    
    </Animatable.View>
  )
}

const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  
  const viewableItemChanged =({viewableItems})=>{

       if(viewableItems.length > 0){
        setActiveItem(viewableItems[0].key)
       }
  }

    return (
   <FlatList
      className="mb-6 py-4"
      data={posts}
      keyExtractor={(item)=>item.$id}
      renderItem={({item})=>(
        <TrendingItem activeItem={activeItem} item={item}/>
      )}
      onViewableItemsChanged={viewableItemChanged}
      viewabilityConfig={{itemVisiblePercentThreshold:70}}
      contentOffset={{x:170}}
      horizontal
    />
  )
}

export default Trending