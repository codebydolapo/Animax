import { View, Text, StatusBar, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import MainCategories from '../components/MainCategories';
import LowerNav from '../components/LowerNav';
import HomeScreen from './HomeScreen';
import { useRef } from 'react';
import ListScreen from './ListScreen';
import DownloadsScreen from './DownloadsScreen';
import ProfileScreen from './ProfileScreen';

const MainView = () => {

    const navigation = useNavigation();
    const scrollRef = useRef(0);
    const [scrollIndex, setScrollIndex] = useState(0)


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    function handleScroll(event) {

        const { contentOffset: { x } } = event.nativeEvent;
        const screenWidth = Dimensions.get('window').width; // Get screen width

        const currentIndex = Math.round(x / screenWidth); // Calculate index

        setScrollIndex(currentIndex)
        scrollRef.current = currentIndex
    }





    return (
        <SafeAreaView className={`bg-white h-full w-auto `}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onScroll={handleScroll}
                ref={scrollRef}
                pagingEnabled={true}
                className={`w-[100vw]`}
            >

                <HomeScreen />
                <ListScreen />
                <DownloadsScreen />
                <ProfileScreen />
            </ScrollView>
            <View className={`absolute bottom-1 h-14 w-full px-2 space-x-2 flex-row items-around justify-around rounded-t-2xl bg-white shadow-2xl`}>
                {/* {navMap.map(({icon, title}, index) => {

               return  <LowerNav
                    icon= {icon}
                    title={title}
                    active={scrollIndex.current == index ? true : false}
                    key = {icon}
                />
                })}
                 */}
                <View className={` h-full w-[23%] rounded-xl items-center justify-center`}>
                    <Icon name={"home"} size={35} color={`${scrollIndex == 0 ? "#39df76" : "#00000088"}`} />
                    {/* <Text className={`${active ? "text-[#39df76]" : "text-[#00000088]"} tracking-widest text-xs font-bold `}>{title}</Text> */}
                </View>
                <View className={` h-full w-[23%] rounded-xl items-center justify-center`}>
                    <Icon name={"menu"} size={35} color={`${scrollIndex == 1 ? "#39df76" : "#000000"}`} />
                    {/* <Text className={`${active ? "text-[#39df76]" : "text-[#00000088]"} tracking-widest text-xs font-bold `}>{title}</Text> */}
                </View>
                <View className={` h-full w-[23%] rounded-xl items-center justify-center`}>
                    <Icon name={"download"} size={35} color={`${scrollIndex == 2 ? "#39df76" : "#000000"}`} />
                    {/* <Text className={`${active ? "text-[#39df76]" : "text-[#00000088]"} tracking-widest text-xs font-bold `}>{title}</Text> */}
                </View>
                <View className={` h-full w-[23%] rounded-xl items-center justify-center`}>
                    <Icon name={"account"} size={35} color={`${scrollIndex == 3 ? "#39df76" : "#000000"}`} />
                    {/* <Text className={`${active ? "text-[#39df76]" : "text-[#00000088]"} tracking-widest text-xs font-bold `}>{title}</Text> */}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MainView

