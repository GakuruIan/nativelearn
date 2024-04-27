import { View, Text,SafeAreaView,FlatList,Image } from 'react-native'
import React,{useEffect} from 'react'

import { StatusBar } from 'expo-status-bar'
import useAppwrite from '../../lib/useAppwrite'
import { searchVideos } from '../../lib/Appwrite'
import { useLocalSearchParams } from 'expo-router'

import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'
import SearchField from '../../components/SearchInput'

import {images} from '../../constants'


const Search = () => {
  const {query} = useLocalSearchParams()
  const {data:videos,refetch} = useAppwrite(()=>searchVideos(query))

  useEffect(() => {
    refetch()
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
       <FlatList
       
        data={videos}
         keyExtractor={(item)=>item.$id}
         renderItem={({item})=>(
           <VideoCard video={item}/>
         )}
         ListHeaderComponent={()=>(
          <View className="mt-8 px-4 pt-4 space-y-4">
            <View className="justify-between items-center flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100 mb-1">Search results</Text>
                  <Text className="text-2xl text-white font-psemibold">{query}</Text>
                </View>
                <View>
                  <Image 
                    source={images.facespace}
                    resizeMode="contain"
                    className="h-10 w-10 rounded-full"
                  />
                </View>
            </View>

            <SearchField 
             placeholder="Search for video"
             initialQuery={query}
            />

          </View>
         )}

         ListEmptyComponent={()=>(
          <EmptyState title="No videos found" subtitle="Be the first to upload"/>
         )}
         
       />
       <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default Search