import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Anime from "@/types/anime";
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchList, removeFromWatchList } from "@/redux/actions";
import { useRouter } from 'expo-router';

interface Props {
    data: Anime[];
    header: string;
    iconName: any;
}

const PlaylistAndRecommendationScroller = ({ data, header, iconName }: Props) => {
    const dispatch = useDispatch();
    const watchlist = useSelector((state: { watchlistState: Anime[] }) => state.watchlistState);
    const router = useRouter()

    // const toggleWatchlist = (anime: Anime) => {
    //     const isAdded = watchlist.some((item) => item.id === anime.id);

    //     if (isAdded) {
    //         dispatch(removeFromWatchList(anime));
    //     } else {
    //         dispatch(addToWatchList(anime));
    //     }
    // };

    const handleCardPress = (id: string) => router.push(`/anime/${id}`)

    return (
        <View className="w-full my-4">
            <View className="w-full p-2 items-center justify-start flex-row">
                <View className='min-w-[55vw] '>
                    <Text className="text-[#3dd8c5] font-rubik-semibold text-lg">{header}</Text>
                </View>
                <MaterialCommunityIcons name={iconName} size={25} color="#3dd8c5" />
            </View>
            <ScrollView horizontal>
                {data.map(({ title, picture, id }, index) => {
                    if (!watchlist) return null; // Use watchlist directly
                    const isAdded = watchlist.some((item) => item.id === id); // Use watchlist directly
                    const currentAnime = data[index];

                    return (
                        <TouchableOpacity key={index} 
                        // onPress={() => toggleWatchlist(currentAnime)}
                        onPress={() => handleCardPress(currentAnime.id)}
                        >
                            <View className="w-[15rem] h-[15rem] bg-white mx-2 rounded-xl">
                                <Image source={{ uri: picture }} className="h-full w-full rounded-xl" resizeMode="cover" />
                                <View className="absolute bottom-0 w-full h-[4rem] rounded-b-xl items-center justify-center flex-row z-10">
                                    <MaterialCommunityIcons name={"play"} size={30} color="#fff" />
                                    <Text className="text-[#fff] font-rubik-semibold text-lg">{title}</Text>
                                </View>
                                <LinearGradient colors={['rgba(0,0,0,0.9)', 'transparent']} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60 }} />
                                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }} />
                                <TouchableOpacity className="absolute -top-1 right-3">
                                    <MaterialCommunityIcons name={isAdded ? "bookmark" : "bookmark"} size={30} color={isAdded ? "#fff" : "#3dd8c5"} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default PlaylistAndRecommendationScroller;