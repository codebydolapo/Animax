import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import playlistAnime from '@/sampleData/playlistAnime';
import recommendedAnime from '@/sampleData/recommendedAnime';
import Anime from '@/types/anime';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { removeFromWatchList } from '@/redux/actions';
import { useRouter } from "expo-router";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import featuredAnime from "@/sampleData/featuredAnime";



interface MenuProps {
    title: string;
    icon: string | any;
}



const MenuItem = ({ title, icon }: MenuProps) => {
    return (
        <View className="w-[24%] h-full items-center justify-center gap-y-2">
            <TouchableOpacity className="bg-[#333333c9] rounded-full items-center justify-center p-4">
                <MaterialCommunityIcons
                    name={icon}
                    size={23}
                    color={`${title === 'Watchlist' ? '#3dd8c5' : '#fff'}`}
                />
            </TouchableOpacity>
            <Text className="text-white font-rubik-medium text-base">{title}</Text>
        </View>
    );

};



const AnimeDetails = () => {

    const dispatch = useDispatch();

    const { id } = useLocalSearchParams<{ id?: string }>();
    const animeRef = useRef<Anime | null>(null);
    const [loading, setLoading] = useState(true); // Initial loading state
    const [playing, setPlaying] = useState(false)
    const router = useRouter();
    const playerRef = useRef<any>(null);


    useEffect(() => {

        const playlistAnimeData = Object.values(playlistAnime).flat();
        const recommendedAnimeData = Object.values(recommendedAnime).flat();

        const timeoutId = setTimeout(() => {
            const foundAnime: any =
                playlistAnimeData.find((item) => item.id === id) ||
                recommendedAnimeData.find((item) => item.id === id);
            if (foundAnime) {
                animeRef.current = foundAnime;
                setLoading(false); // Stop loading when anime is found
            }
            else {
                setLoading(false); // Stop loading even if anime is not found
                router.back();
            }

        }, 3000);
        return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
    }, [id]); // id is now the correct dependency

    const _removeFromWatchlist = (animeToRemove: Anime) => {
        dispatch(removeFromWatchList(animeToRemove));
        router.back();
    };


    // if (!animeRef.current) {
    //     return null;
    // }

    const handlePlay = () => {
        if (id && animeRef.current) {
            setPlaying(true)
        }
    }

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);


    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
            router.back();
        }
    }, [router]);

    const handleBack = () => {
        setPlaying(false)
        router.back()
    }

    if (loading) {
        return (
            <View className="bg-black flex-1 items-center justify-center">
                <ActivityIndicator size={"large"} color={"#3dd8c5"} />
            </View>
        );
    }

    return (

        <View className='bg-black'>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="bg-black pb-10"
            >
                <TouchableOpacity onPress={handlePlay}>

                    <View className={`w-full ${playing? "h-[20rem]" : "h-[30rem]"} relative`}>
                        <View className='w-full h-[30rem] relative items-center justify-center'>
                            <TouchableOpacity onPress={handlePlay} style={{ display: playing ? 'none' : 'flex', width: '100%', height: '100%' }}>
                                <Image
                                    source={{ uri: animeRef.current!.picture }}
                                    className={`h-full`}
                                />
                                <View className='w-full h-[10rem] absolute bottom-0 px-6 py-4 items-start justify-center z-10'>
                                    <Text className='text-white font-rubik-medium text-base'>Season 1</Text>
                                    <Text className='text-white font-rubik-bold text-3xl mb-4'>{animeRef.current!.title}</Text>
                                    <View className='px-4 py-2 bg-[#fdfbfb91] flex-row items-center justify-start gap-x-1 rounded-full'>
                                        <MaterialCommunityIcons name={"play-circle"} size={20} color="#fff" />
                                        <Text className='text-white font-rubik-light text-base'>Watch Trailer</Text>
                                    </View>
                                    <LinearGradient
                                        colors={['rgba(0,0,0,0.15)', 'transparent']}
                                        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40 }}
                                    />
                                </View>
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120 }}
                                />
                            </TouchableOpacity>

                            <View style={{ display: playing ? 'flex' : 'none', width: '100%' }} className='justify-center'>
                                <YoutubePlayer
                                    ref={playerRef}
                                    height={250}
                                    play={playing}
                                    videoId={animeRef?.current?.trailerLink}
                                    onChangeState={onStateChange}
                                />
                                {/* <View className="flex-row justify-center p-4">
                                    <TouchableOpacity className="p-4" onPress={togglePlaying}>
                                        <MaterialCommunityIcons
                                            name={playing ? "pause" : "play"}
                                            size={32}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                </View> */}
                            </View>
                            <TouchableOpacity className='absolute left-4 top-4 bg-[#000000c9] rounded-full items-center justify-center p-1' onPress={handleBack}>
                                <Ionicons name={"chevron-back"} size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className='absolute left-4 top-4 bg-[#000000c9] rounded-full items-center justify-center p-1' onPress={handleBack}>
                            <Ionicons name={"chevron-back"} size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View className='mx-4 mt-10 items-center relative'>
                    <View className='w-full h-[4rem] rounded-full items-center justify-center flex-row'>
                        <View className='w-[60%] h-full rounded-l-full bg-[#3dd8c5] ' />
                        <View className='w-[40%] h-full rounded-r-full bg-[#cbf0eb] ' />
                        <View className='absolute self-center flex-row items-center justify-center gap-x-2'>
                            <MaterialCommunityIcons name={"play-circle"} size={30} color="#000" />
                            <Text className='text-black font-rubik-semibold text-lg'>Resume Episode 9</Text>
                        </View>
                    </View>

                    <View className='h-[6rem] w-full mt-12 flex-row items-center justify-between'>
                        <MenuItem
                            title={"Episodes"}
                            icon={"play"}
                        />
                        <MenuItem
                            title={"Watchlist"}
                            icon={"bookmark-multiple"}
                        />
                        <MenuItem
                            title={"Downloads"}
                            icon={"bookmark-multiple-outline"}
                        />
                        <MenuItem
                            title={"Related"}
                            icon={"menu"}
                        />
                    </View>
                    <View className='w-full min-h-[8rem] py-2 mt-12 justify-around items-start'>
                        <Text className='text-[#ffffffd0] font-rubik-light text-sm'>{animeRef.current!.releaseDate} | {animeRef.current!.nbEp} Episodes</Text>
                        <Text className='text-[#ffffff] font-rubik-semibold text-2xl my-2'>{animeRef.current!.title}</Text>
                        <View className='w-full h-[3rem] flex-row'>
                            <ScrollView
                                contentContainerClassName='flex-1'
                                horizontal
                                keyboardShouldPersistTaps="handled"
                                keyboardDismissMode="on-drag"
                                showsHorizontalScrollIndicator={false}
                            >
                                <View className='bg-[#fdfbfb91] h-full px-6 rounded-full mr-2 items-center justify-center'>
                                    <Text className='text-white '>Action</Text>
                                </View>
                                <View className='bg-[#fdfbfb91] h-full px-6 rounded-full mr-2 items-center justify-center'>
                                    <Text className='text-white '>Fantasy</Text>
                                </View>
                                <View className='bg-[#fdfbfb91] h-full px-6 rounded-full mr-2 items-center justify-center'>
                                    <Text className='text-white '>18+</Text>
                                </View>

                            </ScrollView>
                            <View className='w-[35%] justify-center items-end'>
                                <View className='border-[#fdfbfb91] border-[1px] h-full px-4 rounded-full items-center justify-center flex-row'>
                                    <Text className='text-white '>Rate This</Text>
                                    <MaterialCommunityIcons name={"star-outline"} size={20} color="#ff0" />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className=' w-full py-2 mt-8'>
                        <Text className='text-white font-rubik-light text-lg '>{animeRef.current!.synopsis}</Text>
                    </View>

                    <View className={"w-full h-[5rem] mt-4 items-center justify-center"}>
                        <TouchableOpacity
                            onPress={() => _removeFromWatchlist(animeRef.current!)}
                            className="bg-[#3dd8c5] w-[90vw] shadow-md shadow-zinc-300 rounded-full py-4 "
                        >
                            <View className="flex flex-row items-center justify-center">
                                {/* <Image
                                        source={require("@/assets/icons/watchlist.png")}
                                        className="w-7 h-7"
                                        resizeMode="contain"
                                    /> */}
                                <MaterialCommunityIcons name="bookmark-off" size={23} color="#fff" />
                                <Text className="text-lg font-rubik-medium text-white ml-2">
                                    Remove From Watchlist
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )

}



export default AnimeDetails