import { View, Text, Image, StatusBar, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import geto from '../assets/geto.jpg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dp from '../assets/dp.jpg'
import aotBanner from "../assets/aotBanner.png"
import kimetsuBanner from "../assets/kimetsuBanner.png"
import deathNoteBanner from "../assets/deathNoteBanner.png"


const ProfileScreen = () => {





    return (
        <View className={`w-[100vw] `}>
            <StatusBar style="light" />
            {/* <View className={`h-14 w-full flex-row items-center justify-between absolute top-0 z-10 bg-white`}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} className={`flex-row mx-2 items-center space-x-2`}>
                    <Image
                        source={{ uri: Image.resolveAssetSource(geto).uri }}
                        className={`h-10 w-10 rounded-full`}
                    />
                    <Text className={`text-2xl font-extrabold text-[#00000088]`}>Profile</Text>
                </TouchableOpacity>
                <View className={`flex-row space-x-4 px-2`}>
                    <TouchableOpacity>
                        <Icon name={"magnify"} size={35} color="#00000088" className={`font-light border-[1px]`} />
                    </TouchableOpacity>
                </View>
            </View> */}


            <View className={`h-full w-screen pb-14 relative justify-between`}>

                <View className={`h-[35%] w-full items-center justify-start relative`}>
                    <ImageBackground source={require("../assets/cover.png")} className={`h-56 w-full `}>

                    </ImageBackground>
                    <View className={`w-36 h-36 rounded-full bg-[#000000b2] absolute bottom-0 m-auto left-auto right-auto p-1`}>
                        <Image
                            source={{ uri: Image.resolveAssetSource(dp).uri }}
                            className={`h-full w-full rounded-full`}
                        />
                    </View>
                </View>
                <View className={`h-[20%] w-full items-center justify-around px-2`}>
                    <Text className={`text-[#6b6b6b] tracking-widest text-3xl rotate-360 font-extrabold`}>Kuti Victoria</Text>
                    <Text className={`text-[#6b6b6b] tracking-wide text-sm rotate-360`}>@victoria_sama</Text>
                    <Text className={`text-[#6b6b6b] tracking-wide text-sm rotate-360`}>New Playground, same kid. Hehe</Text>
                    <View className={`h-14 w-full flex-row items-between space-x-2 py-1`}>
                        <View className={`h-full w-[65%] bg-[#39df76] flex-row items-center justify-center rounded-xl`}>
                            <Icon name={"plus"} size={25} color={"white"} />
                            <Text className={`text-white tracking-widest text-base rotate-360 font-extrabold`}>follow</Text>

                        </View>
                        <View className={`h-full w-[15%] rounded-xl items-center justify-center bg-[#00000088]`}>
                            <Icon name={"mail"} size={30} color={"white"} />
                        </View>
                        <View className={`h-full w-[15%] rounded-xl items-center justify-center bg-[#00000088]`}>
                            <Icon name={"menu"} size={30} color={"white"} />
                        </View>
                    </View>
                </View>
                <View className={`h-[20%] w-full items-center justify-around px-2`}>
                    <View className={`h-11 w-full items-center justify-start flex-row space-x-2`}>
                        <Icon name={"certificate-outline"} size={20} color={"#00000077"} />
                        <Text className={`text-[#00000077]  tracking-wide text-sm rotate-360 font-extrabold`}>2.3M Followers</Text>
                    </View>
                    <View className={`h-11 w-full items-center justify-start flex-row space-x-2`}>
                        <Icon name={"star"} size={20} color={"#00000077"} />
                        <Text className={`text-[#00000077] tracking-wide text-sm rotate-360 font-extrabold`}>Veteran</Text>
                    </View>
                    <View className={`h-11 w-full items-center justify-start flex-row space-x-2`}>
                        <Icon name={"menu"} size={20} color={"#00000077"} />
                        <Text className={`text-[#00000077] tracking-wide text-sm rotate-360 font-extrabold`}>See more about Victoria</Text>
                    </View>
                </View>
                <View className={`h-[20%] w-full items-start justify-around px-2 mt-5`}>
                    <View className={`h-[20%] w-full justify-between items-center flex-row`}>
                        <Text className={`text-[#00000077] tracking-widest text-xl font-extrabold`}>Story Highlights</Text>
                        <Text className={`text-[#39df76] tracking-widest text-sm font-extrabold`}>See More</Text>
                    </View>
                    <View className={`w-full h-[80%] flex-row items-center justify-around`}>
                        <View className={`w-[32%] h-[80%] flex-row rounded-xl`}>
                            <Image
                                source={{ uri: Image.resolveAssetSource(kimetsuBanner).uri }}
                                className={`h-full w-full rounded-xl`}
                            />
                        </View>
                        <View className={`w-[32%] h-[80%] flex-row rounded-xl`}>
                            <Image
                                source={{ uri: Image.resolveAssetSource(aotBanner).uri }}
                                className={`h-full w-full rounded-xl`}
                            />
                        </View>
                        <View className={`w-[32%] h-[80%] flex-row rounded-xl`}>
                            <Image
                                source={{ uri: Image.resolveAssetSource(deathNoteBanner).uri }}
                                className={`h-full w-full rounded-xl`}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen