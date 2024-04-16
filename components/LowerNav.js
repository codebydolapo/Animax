import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const LowerNav = ({ icon, title, active }) => {


    return (
        <View className={` h-full w-[23%] rounded-xl items-center justify-center`}>
            <Icon name={icon} size={30} color={`${active ? "#39df76" : "#00000088"}`} />
            <Text className={`${active ? "text-[#39df76]" : "text-[#00000088]"} tracking-widest text-xs font-bold `}>{title}</Text>
        </View>
    )
}

export default LowerNav