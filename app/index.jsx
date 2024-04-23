import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, ScrollView, View,Image, StyleSheet} from 'react-native';
import { Redirect,router} from 'expo-router';
import {images} from '../constants';
import CustomButton from '../components/CustomButton';

const App =()=>{
    return (
        <SafeAreaView className="h-full  bg-primary">
          <ScrollView contentContainerStyle={{height:'100%'}}>
             <View className="justify-center items-center h-full px-4">
                <Image 
                  source={images.virtualnone}
                  resizeMode="contain"
                  className="h-72 w-full rounded-md"
                />
    
                <View className="relative mt-5">
                    <Text className=" text-3xl font-bold text-center text-white">Discover endless possibilities with <Text className="text-secondary-200">Arcanum</Text></Text>
                    <Text className="text-sm text-gray-200 font-pregular text-center mt-7">Where creativity meets innovation: embark on a journey of limitless with Arcanum</Text>
                </View>
    
               <CustomButton title="Continue with Email" 
                handlePress={()=>{router.push('login')}}
                contentContainerStyle = "w-full mt-7"
               />
             </View>
             
             <StatusBar backgroundColor="#161622" style="light"/>
          </ScrollView>
        </SafeAreaView>
      );
}

export default  App

