import { View, Text, ImageBackground, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core'
// import LoadingScreen from './LoadingScreen'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'
import * as Progress from "react-native-progress"

const LandingScreen = () => {

  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])


  // let backgroundImage = require(`../assets/bg1.jpg`);

  // const [backgroundImage, setBackgroundImage] = useState(require(`../assets/bg1.jpg`));

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const nextImage = (currentImage) => {
  //       const images = [
  //         require(`../assets/bg1.jpg`),
  //         require(`../assets/bg2.jpg`),
  //         require(`../assets/bg3.jpg`),
  //         // ... add more images here
  //       ];
  //       const index = images.indexOf(currentImage);
  //       return images[(index + 1) % images.length]; // Cycle back to the first image
  //     };
  //     setBackgroundImage(nextImage(backgroundImage));
  //   }, 5000)
  //   return () => clearInterval(interval); // Clear interval on unmount
  // }, [backgroundImage]);

  let backgroundImage = require(`../assets/bg1.jpg`);


  return (
    <SafeAreaView className={`h-full w-full `}>
      <ImageBackground source={backgroundImage} style={styles.container} className={`flex-1 items-center justify-end `}>
        <StatusBar style="light" />
        <View className={`w-screen h-screen px-2 pt-14 bg-[#00000070]`}>
          <View className={`h-10 items-center justify-center`}>
            <Text className={`text-white font-extrabold tracking-widest text-5xl uppercase`}>A n i m a x</Text>
          </View>
          <View className={`h-8 items-end justify-start px-8`}>
            <Text className={`text-white tracking-widest text-lg uppercase`}>こんにちは, 今日は</Text>
          </View>
          <View className={`w-full flex-1 justify-end items-center`}>
            <View className={`w-full h-48 items-center justify-center px-2 `}>
              <Animatable.Text
                animation={"slideInUp"}
              iterationCount={1}
              className={`text-white text-sm text-center mb-5 tracking-widest leading-6 font-light`}
              >
                Loading...
              </Animatable.Text>

              {/* <Text className={`text-white text-sm text-center mb-5 font-light tracking-wide`}>The best anime streaming app of the century, to entertain you everyday</Text> */}

              <TouchableOpacity
                className={`w-[90%] h-12 mb-2 rounded-full items-center justify-center bg-[#049739]`}
                onPress={() => navigation.navigate("Login")}
              >
                <Text className={`text-white font-extrabold tracking-widest text-sm  `}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View className={`w-14 h-auto flex-col items-center justify-center absolute left-2 top-0 bottom-0`}>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360 `}>勇</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>気</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>が</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>あ</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>れ</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>ば</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>入</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>っ</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>て</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>く</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>だ</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>さ</Text>
            </View>
            <View className={`items-center`}>
              <Text className={`text-white tracking-widest text-lg rotate-360  `}>い</Text>
            </View>

          </View> */}
        </View>
      </ImageBackground>

    </SafeAreaView>

  )
}

export default LandingScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    resizeMode: 'cover', // Or 'contain', 'stretch', 'repeat'
  },
});