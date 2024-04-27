import { SafeAreaView,Text,View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import useAppwrite from '../../lib/useAppwrite' 
import { UserVideos,SignOut } from '../../lib/Appwrite'
import { useGlobalContext } from '../../context/ContextProvider'

import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'

import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
   const {user,setUser,setIsLoggedIn} = useGlobalContext()
   const {data:videos} = useAppwrite(()=>UserVideos(user.$id))

   const Logout =async()=>{
      await SignOut()
      setUser(null)
      setIsLoggedIn(false)

      router.replace('/login')
   }

  return (
   <SafeAreaView className="bg-primary h-full">
      <FlatList
       data={videos}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>(
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={()=>(
         <View className="w-full justify-center items-center mt-10 py-3">
                <View className="py-2 px-4 w-full items-end">
                    <TouchableOpacity
                     onPress={Logout}
                    >
                      <Image 
                        source={icons.logout}
                        resizeMode="contain"
                        className="h-6 w-6 object-contain"
                      />
                    </TouchableOpacity>
                </View>

                <View className="mb-4 py-4 justify-center items-center">
                  <Image
                    source={{uri:user?.avatar}}
                    resizeMode='contain'
                    className="h-14 w-14 rounded-full"
                   /> 
                   <Text className="text-white text-xl psemibold mt-1 capitalize">
                     {user?.username}
                   </Text>

                </View>
                   <View className=" flex-row mb-4 justify-between">
                    <InfoBox title={videos.length ?? 0} subtitle="Posts"/>
                    <InfoBox title="1.2k" subtitle="Followers"/>
                   </View>

                
         </View>
        )}

        ListEmptyComponent={()=>(
         <EmptyState title="No videos found" subtitle="Be the first to upload"/>
        )}
        
      />
   </SafeAreaView>
  )
}

export default Profile

