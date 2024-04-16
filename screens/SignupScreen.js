import { View, Text, ImageBackground, StyleSheet, StatusBar, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable'
// import { ScrollView } from 'react-native-gesture-handler'
import facebook from "../assets/facebook.png"
import google from "../assets/google.png"
import apple from "../assets/apple.png"

const WelcomeScreen = () => {

  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  // const backgroundImage = require('../assets/loginSignup.jpg');

  return (
    <SafeAreaView className={`h-full w-full bg-[#FFF]`}>
      {/* <ImageBackground source={backgroundImage} style={styles.container} className={`flex-1 items-center justify-end `}> */}
      {/* <View style={styles.container} className={`flex-1 items-center justify-b `}> */}
      <KeyboardAvoidingView
        automaticallyAdjustContentInsets={false}
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // contentContainerStyle={{ flex: 1 }}
        className={`w-full flex-1 justify-between items-center`}
      >
        <StatusBar style="light" />

        {/* <View className={`w-screen h-screen px-2 pt-14`}> */}
        <View className={`flex-1 w-full items-center border-2 border-black`} showsHorizontalScrollIndicator={false}>
          <View className={`w-full h-14 items-start justify-center px-5`}>
            <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
              <Icon name={"keyboard-backspace"} size={25} color="#000" />
            </TouchableOpacity>
          </View>
          <View className={`w-56 h-56 items-center justify-center rounded-full`}>
            <Animatable.Image
              source={require("../assets/signup.gif")}
              animation={"slideInUp"}
              // iterationCount={1}
              className={`w-52 h-52`}
            />
          </View>
          <View className={`w-full h-24 items-center justify-center`}>

            <View className={`h-14 items-center justify-center`}>
              <Animatable.Text
                animation={"slideInUp"}
                // iterationCount={1}
                className={`text-[#39df76] font-extrabold tracking-widest text-6xl `}
              >
                Sign Up!
              </Animatable.Text>
              {/* <Text className={`text-[#049739] font-extrabold tracking-widest text-5xl `}>Welcome!</Text> */}
            </View>
            <View className={` w-full h-8 items-end justify-center px-8`}>
              <Animatable.Text
                animation={"slideInUp"}
                // iterationCount={1}
                className={`text-black tracking-widest text-lg uppercase`}                        >
                サインアップ!
              </Animatable.Text>
              {/* <Text className={`text-black tracking-widest text-lg uppercase`}>いらっしゃいませ!</Text> */}
            </View>
          </View>

          <View className={`w-full h-48  items-center justify-around`}>

            <View className={`w-[90%] h-14 rounded-xl items-center flex-row justify-center space-x-2 px-2 border-[1px] border-[#00000018] `}>
              <Icon name={"account"} size={25} color="#00000044" />

              <TextInput
                placeholder={"Username"}
                placeholderTextColor="#00000044"
                className={`pl-6 h-full flex-1 text-base text-black font-extrabold`}
              />
            </View>

            <View className={`w-[90%] h-14 rounded-xl items-center flex-row justify-center space-x-2 px-2 border-[1px] border-[#00000018] `}>
              <Icon name={"lock"} size={25} color="#00000044" />

              <TextInput
                placeholder={"Password"}
                placeholderTextColor="#00000044"
                className={`pl-6 h-full flex-1 text-base text-black font-extrabold`}
              />
            </View>

            <TouchableOpacity className={`w-[90%] h-14 rounded-full bg-[#39df76] items-center justify-center`}>
              <Text className={`text-white font-bold tracking-widest text-sm`}>Sign Up!</Text>
            </TouchableOpacity>

          </View>

          <View className={`w-full h-40 items-center justify-around mb-2`}>

            <Text className={`text-black font-light tracking-widest text-sm`}>Or continue with</Text>

            <View className={`w-[90%] h-16 flex-row items-center justify-around`}>

              <TouchableOpacity className={`w-[28%] h-[80%] border-[1px] border-[#00000031] rounded-xl items-center justify-center`}>
                <Image
                  source={{ uri: Image.resolveAssetSource(facebook).uri }}
                  className={`h-7 w-7 rounded-full`}
                />
              </TouchableOpacity>

              <TouchableOpacity className={`w-[28%] h-[80%] border-[1px] border-[#00000031] rounded-xl items-center justify-center`}>
                <Image
                  source={{ uri: Image.resolveAssetSource(google).uri }}
                  className={`h-7 w-7 rounded-full`}
                />
              </TouchableOpacity>

              <TouchableOpacity className={`w-[28%] h-[80%] border-[1px] border-[#00000031] rounded-xl items-center justify-center`}>
                <Image
                  source={{ uri: Image.resolveAssetSource(apple).uri }}
                  className={`h-7 w-7 rounded-full`}
                />
              </TouchableOpacity>

            </View>

            <TouchableOpacity className={`w-full h-8 flex-row items-end justify-center space-x-1`} onPress={() => navigation.navigate("Main")}>
              <Animatable.Text
                animation={"slideInUp"}
                // iterationCount={1}
                className={`text-[#00000073] tracking-widest text-xs`}>Already have an account?
              </Animatable.Text>
              <Animatable.Text
                animation={"slideInUp"}
                // iterationCount={1}
                className={`text-[#39df76] font-extrabold tracking-widest text-sm`}>
                Log In!
              </Animatable.Text>
            </TouchableOpacity>

          </View>

        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
      {/* </ImageBackground> */}
      {/* </View> */}
    </SafeAreaView>

  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    resizeMode: 'cover', // Or 'contain', 'stretch', 'repeat'
  },
});