import { View, Text, SafeAreaView, FlatList, Image, RefreshControl } from 'react-native'
import React,{useState,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import {images} from '../../constants'
import SearchField from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'

import { GetVideos,GetLatestVideos } from '../../lib/Appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const home = () => {
  const [refreshing,setRefreshing] = useState(false)
  const {data:videos,refetch,isLoading} = useAppwrite(GetVideos)
  const {data:Lastest} = useAppwrite(GetLatestVideos)

  const onRefresh =async()=>{
    setRefreshing(true)
    await refetch()

    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
       <FlatList
       
        data={videos}
         keyExtractor={(item)=>item.id}
         renderItem={({item})=>(
           <VideoCard video={item}/>
         )}
         ListHeaderComponent={()=>(
          <View className="mt-8 px-4 pt-4 space-y-4">
            <View className="justify-between items-center flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100 mb-1">Welcome</Text>
                  <Text className="text-2xl text-white font-psemibold">Gakuru</Text>
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
            />

            <View className="w-full">
              <Text className="text-base font-pregular text-white">Latest Videos</Text>
            </View> 
            {/* trending */}
            <Trending  posts={Lastest ?? []}/>
          </View>
         )}

         ListEmptyComponent={()=>(
          <EmptyState title="No videos found" subtitle="Be the first to upload"/>
         )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
       />
       <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default home