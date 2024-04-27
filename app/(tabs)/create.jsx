import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React,{useState} from 'react'

import { icons } from '../../constants'
import {Video,ResizeMode} from 'expo-av'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { Createvideo } from '../../lib/Appwrite'
import { useGlobalContext } from '../../context/ContextProvider'

import * as ImagePicker from 'expo-image-picker'
import {router} from 'expo-router'

const Create = () => {
  const {user} = useGlobalContext()

  const [uploading,setUploading] = useState(false)

  const [form, setForm] = useState({
       title:'',
       video:null,
       thumbnail:null
  });

  const openPicker = async(selectType) =>{
      const results = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
        aspect: [4, 3],
        quality: 1,
      });

      if(!results.canceled){
            if(selectType === 'image'){
              setForm({...form,thumbnail:results.assets[0]})
            }

            if(selectType === 'video'){
              setForm({...form,video:results.assets[0]})
            }
      }

  }

  const submit = async()=>{
    setUploading(true)
      if(!form.title || !form.thumbnail || !form.video){
        Alert.alert("Empty Inputs","Please fill all the inputs")
      }
      try {
        await Createvideo({...form,userID:user.$id})
        Alert.alert('Success',"video posted successfully ")
        router.push('/home')
      } catch (error) {
        Alert.alert('Error',error.message)
      }
      finally{
        setUploading(false)
      }
      
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="mt-10 px-4 py-2">
         <Text className="text-2xl text-white font-psemibold my-4">Upload Video</Text>
         
         <FormField 
           title="Video title"
           placeholder="Give your video title"
           handleChange={(e)=>setForm({...form,title:e})}
          />

         <Text className="text-white text-sm font-pregular mb-2">Upload Video</Text>
         <TouchableOpacity 
           activeOpacity={0.7}
           onPress={()=>openPicker('video')}
         >
          {
            form.video ? 
            (
              <Video 
                 source={{uri:form.video.uri}}
                 resizeMode={ResizeMode.CONTAIN}
                 className="w-full h-40"
              />
             ) 
              : 
            (
              <View>
                <View className="bg-black-100 mb-4  w-full h-40 justify-center items-center rounded-sm flex-row pr-2">
                    <View className="items-center">
                       <Image 
                        source={icons.upload}
                        resizeMode="contain"
                        className="h-10 w-1o object-cover"
                       /> 
                       <Text className="text-gray-100 text-xs mt-4 font-pregular">Choose a video</Text>
                    </View>
                </View>
              </View>
            )
          }
         </TouchableOpacity>

         <Text className="text-white text-sm font-pregular mb-2">Thumbnail Image</Text>

         <TouchableOpacity
          className="mb-4"
          activeOpacity={0.7}
          onPress={()=>openPicker('image')}
         >
          {
            form.thumbnail ? 
            (
              <Image
                 source={{uri:form.thumbnail.uri}}
                 resizeMode="contain"
                 className="w-full h-40"
              />
             ) 
              : 
            (
              <View>
                <View className="bg-black-100 mb-4  w-full h-24 py-2 justify-center items-center rounded-sm flex-row pr-2">
                    <View className="items-center">
                       <Image 
                        source={icons.upload}
                        resizeMode="contain"
                        className="h-8 w-8 object-cover"
                       /> 
                       <Text className="text-gray-100 text-xs mt-4 font-pregular">Choose an Image for Thumbnail</Text>
                    </View>
                </View>
              </View>
            )
          }
         </TouchableOpacity>

          <CustomButton title="Upload Video" handlePress={submit} isLoading={uploading}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create