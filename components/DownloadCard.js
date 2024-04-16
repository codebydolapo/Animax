import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const DownloadCard = ({ bannerImage, name, views }) => {


  function truncateString(str, maxLength) {
    // Check if the string is less than or equal to the maximum length
    if (str.length <= maxLength) {
      return str;
    }

    // Truncate the string to the maximum length
    return str.slice(0, maxLength) + "...";
  }


  return (
    <View className={`w-[95%] h-[26vw]  my-2 rounded-lg items-center justify-around flex-row`}>

      <ImageBackground source={{ uri: bannerImage }} className={`h-[26vw] w-[36vw] rounded-lg relative  `} imageStyle={{ borderRadius: 10, position: "relative" }} >
        <View className={`absolute top-6 left-10 w-10 h-10 rounded-full bg-[#000000] items-center justify-center`}>
          <Icon name={"play"} size={30} color="#39df76" />
        </View>
      </ImageBackground>

      <View className={`w-[60%] h-full px-2 justify-between`}>
        <Text className={`text-base font-bold text-[#00000099]`}>{truncateString(name, 22)}</Text>
        <Text className={`text-xs text-[#000000aa]`}>{views} Episodes</Text>
        <TouchableOpacity className={`w-16 h-5 rounded-md bg-[#3ef58162] items-center justify-center`}>
          <Text className={`text-xs text-[#000000aa] text-[#049739]`}>Update</Text>

        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DownloadCard