import { View, Text, StatusBar, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, Image } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dummyData from '../dummyData'
import ListCards from '../components/ListCards';
import sukuna from "../assets/sukuna.jpg"


const ListScreen = () => {
  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const [randomizedArray, setRandomizedArray] = useState([]);

  useEffect(() => {
    const shuffledArray = dummyData.slice().sort(() => Math.random() - 0.5); // Randomize using Fisher-Yates shuffle
    setRandomizedArray(shuffledArray);
  }, [dummyData]); // Run only when dummyData changes


  return (
    <ScrollView className={`w-[100vw] relative mb-14 px-2 pt-3`} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      <View className={`h-14 w-full flex-row items-center justify-start px-2 absolute top-0 z-10 bg-white`}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} className={`flex-row mx-2 items-center space-x-2`}>
          <Image
            source={{ uri: Image.resolveAssetSource(sukuna).uri }}
            className={`h-10 w-10 rounded-full`}
          />
          <Text className={`text-2xl font-extrabold text-[#00000088]`}>My List</Text>
        </TouchableOpacity>
        {/* <View className={`flex-row space-x-4 px-2 `}>
          <TouchableOpacity>
            <Icon name={"magnify"} size={35} color="#00000088" className={`font-light border-[1px]`} />
          </TouchableOpacity>
        </View> */}
      </View>

      {/* <ScrollView className={`h-full w-screen border-2 border-red-500 mt-14`} horizontal={false}> */}

      < View className={`h-full flex-row w-[100vw] flex-wrap mt-16`} >
        {randomizedArray.map(({ image, views }) => {
          return (
            <ListCards
              image={image}
              views={views}
              key={image}
            />
          )
        })}

      </View>

      {/* </ScrollView> */}

    </ScrollView>
  )
}

export default ListScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    resizeMode: 'cover', // Or 'contain', 'stretch', 'repeat'
    // borderRadius: "100px"
  },
});