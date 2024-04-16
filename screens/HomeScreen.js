import { View, Text, StatusBar, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView, Button, Alert } from 'react-native'
import React, { useLayoutEffect, useState, useCallback, useRef } from 'react'
import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainCategories from '../components/MainCategories';
import LowerNav from '../components/LowerNav';
import YoutubePlayer from 'react-native-youtube-iframe';
import YoutubeIframe from 'react-native-youtube-iframe';

const HomeScreen = () => {


    const navigation = useNavigation();


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const [playing, setPlaying] = useState(false);

    const [isMute, setMute] = useState(false);

    const [trailerViewerVisible, setTrailerViewerVisible] = useState(false)

    const controlRef = useRef();

    const onStateChange = (state) => {
        if (state === 'ended') {
            setPlaying(false);
            Alert.alert('video has finished playing!');
        }
        if (state !== 'playing') {
            setPlaying(false);
        }
    };
    const togglePlaying = (prev) => {
            setTrailerViewerVisible((prev) => !prev)
            // setPlaying((prev) => !prev);
            setPlaying((prev) => !prev)
        // console.log(playing, trailerViewerVisible)
    };

    const seekBackAndForth = (control) => {
        console.log('currentTime');
        controlRef.current?.getCurrentTime().then((currentTime) => {
            control === 'forward'
                ? controlRef.current?.seekTo(currentTime + 15, true)
                : controlRef.current?.seekTo(currentTime - 15, true);
        });
    };
    const muteVideo = () => setMute(!isMute);
    const ControlIcon = ({ name, onPress }) => (
        <Icon onPress={onPress} name={name} size={40} color="#000" />
    );



    return (
        <View>
            <ScrollView className={`h-full w-screen flex-1 mb-14 `} horizontal={false}>
                <StatusBar style="light" />
                <View className={`flex-1 h-full w-full `}>
                    {trailerViewerVisible && <View className={`h-56 w-full bg-black relative`}>
                        <YoutubeIframe
                            height={300}
                            ref={controlRef}
                            play={playing}
                            mute={isMute}
                            videoId={'MGRm4IzK1SQ'}
                            onChangeState={onStateChange}
                            // className={`border-2 border-red-500 z-10`}
                        />

                        <TouchableOpacity className={`h-8 w-24 rounded-full bg-[#39df76] items-center justify-center flex-row space-x-1 absolute bottom-2 left-2`} onPress={()=>togglePlaying(false)}>
                            <Icon name={"keyboard-backspace"} size={20} color="#fff" />
                            <Text className={`text-white tracking-widest text-xs rotate-360 font-bold `}>Back</Text>

                        </TouchableOpacity>

                        {/* <View className={`w-full h-full bg-[#00000060] top-0 absolute`}>

                            <View className={`h-14 w-full absolute top-0 flex-row items-center justify-between px-2 `}>
                                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                                    <Icon name={"keyboard-backspace"} size={25} color="#fff" />
                                </TouchableOpacity>
                                <View className={`flex-row space-x-4 px-2 `}>
                                    <TouchableOpacity>
                                        <Icon name={"bell"} size={25} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon name={"magnify"} size={25} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View className={`absolute bottom-1 w-full h-24 items-start px-4 space-y-1`}>
                                <Text className={`text-white tracking-widest text-lg rotate-360 font-bold`}>Shingeki No Kyojin</Text>
                                <Text className={`text-white tracking-widest text-xs rotate-360 `}>Action, Thriller, Martial Arts, Adventure </Text>
                                <View className={`w-full h-10 flex-row items-center justify-start space-x-2 `}>
                                    <TouchableOpacity className={`h-8 w-24 rounded-full bg-[#39df76] items-center justify-center flex-row space-x-1`} onPress={togglePlaying}>
                                        <Icon name={"play"} size={20} color="#fff" />
                                        <Text className={`text-white tracking-widest text-xs rotate-360 font-bold `}>Play </Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity className={`h-8 w-24 border-[1px] border-white rounded-full items-center justify-center flex-row space-x-1`}>
                                        <Icon name={"menu"} size={20} color="#fff" />
                                        <Text className={`text-white tracking-widest text-xs rotate-360 font-bold `}>My List</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> */}
                        {/* <View className={`border-2 border-black flex-row justify-around`}>
                            <ControlIcon
                                onPress={() => seekBackAndForth('rewind')}
                                name="skip-previous"
                            />
                            <ControlIcon
                                onPress={togglePlaying}
                                name={playing ? 'pause' : 'play'}
                            />
                            <ControlIcon
                                onPress={() => seekBackAndForth('forward')}
                                name="skip-next"
                            />
                            <ControlIcon
                                onPress={muteVideo}
                                name={isMute ? 'volume-up' : 'volume-off'}
                            />
                        </View> */}
                    </View>}
                    {!trailerViewerVisible && 
                    <ImageBackground source={require("../assets/_attack.png")} style={styles.container} className={`h-56 w-full `}>
                        <View className={`w-full h-full bg-[#00000060]`}>

                            <View className={`h-14 w-full absolute top-0 flex-row items-center justify-between px-2 `}>
                                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                                    <Icon name={"keyboard-backspace"} size={25} color="#fff" />
                                </TouchableOpacity>
                                <View className={`flex-row space-x-4 px-2 `}>
                                    <TouchableOpacity>
                                        <Icon name={"bell"} size={25} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon name={"magnify"} size={25} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View className={`absolute bottom-3 w-full h-24 items-start px-4 space-y-1`}>
                                <Text className={`text-white tracking-widest text-xl rotate-360 font-bold`}>Shingeki No Kyojin</Text>
                                <Text className={`text-white tracking-widest text-xs rotate-360 `}>Action, Thriller, Martial Arts, Adventure </Text>
                                <View className={`w-full h-10 flex-row items-center justify-start space-x-2 `}>
                                    <TouchableOpacity className={`h-8 w-24 rounded-full bg-[#39df76] items-center justify-center flex-row space-x-1`} onPress={()=>togglePlaying(true)}>
                                        <Icon name={"play"} size={20} color="#fff" />
                                        <Text className={`text-white tracking-widest text-xs rotate-360 font-bold `}>Play </Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity className={`h-8 w-24 border-[1px] border-white rounded-full items-center justify-center flex-row space-x-1`}>
                                        <Icon name={"menu"} size={20} color="#fff" />
                                        <Text className={`text-white tracking-widest text-xs rotate-360 font-bold `}>My List</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </ImageBackground>}

                    <MainCategories
                        title="Top Hits Anime"
                        link=""
                    />
                    <MainCategories
                        title="New Episode Releases"
                        link=""
                    />
                </View>
            </ScrollView>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flex: 1,
        resizeMode: 'cover', // Or 'contain', 'stretch', 'repeat'
    },
    controlContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});