import { View, Text, ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import dummyData from '../dummyData'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const MainCategories = ({ title, link }) => {


    const [randomizedArray, setRandomizedArray] = useState([]);

    useEffect(() => {
        const shuffledArray = dummyData.slice().sort(() => Math.random() - 0.5); // Randomize using Fisher-Yates shuffle
        setRandomizedArray(shuffledArray);
    }, [dummyData]); // Run only when dummyData changes




    return (
        <View className={`h-auto w-full my-1 z-40`}>
            <View className={`h-14 w-full px-2 flex-row justify-between items-center`}>
                <Text className={`text-[#000000d2] tracking-widest text-lg font-bold `}>{title}</Text>
                <TouchableOpacity>
                    <Text className={`text-[#39df76] text-sm font-bold `}>See all</Text>
                </TouchableOpacity>
            </View>
            < ScrollView horizontal = {true} className={`w-full h-auto py-2 `} showsHorizontalScrollIndicator={false}>
                {Object.entries(randomizedArray).map(([key, item]) => {
                    return (

                        <ImageBackground source={{ uri: item.image }} style={styles.container} className={`h-64 w-40 mx-1 z-10 `} imageStyle={{ borderRadius: 10 }} key={key}>
                            <View className={`absolute top-2 left-2 min-w-12 h-6 w-auto rounded-lg bg-[#39df76] items-center justify-center space-x-1 flex-row px-2`}>
                                <Icon name={"eye-outline"} size={20} color="#fff" />
                                <Text className={`text-white text-xs font-bold `}>{item.views}</Text>
                            </View>
                            <View className={`absolute bottom-0 w-full h-14 rounded-b-lg bg-[#000] items-center justify-start space-x-1 flex-row px-1`}>
                                <Icon name={"play"} size={20} color="#39df76" />
                                <Text className={`text-white text-xs font-bold `}>{item.name}</Text>
                            </View>

                        </ImageBackground>
                    )
                })}

            </ScrollView>
        </View>
    )
}

export default MainCategories

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        resizeMode: 'cover', // Or 'contain', 'stretch', 'repeat'
        // borderRadius: "100px"
    },
});