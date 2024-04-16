import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ListCards = ({ image, views }) => {
    return (
        <ImageBackground source={{ uri: image }} style={styles.container} className={`h-[65vw] w-[45vw] m-1 relative`} imageStyle={{ borderRadius: 10 }} >
            <View className={`absolute top-2 left-2 min-w-12 h-6 w-auto rounded-lg bg-[#39df76] items-center justify-center space-x-1 flex-row px-2`}>
                <Icon name={"eye-outline"} size={20} color="#fff" />
                <Text className={`text-white text-xs font-bold `}>{views}</Text>
            </View>


        </ImageBackground>
    )
}

export default ListCards

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        resizeMode: 'cover', // Or 'contain', 'stretch', 'repeat'
        // borderRadius: "100px"
    },
});