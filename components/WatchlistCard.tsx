import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Anime from '@/types/anime'
import { router } from 'expo-router'
import { removeFromWatchList } from '@/redux/actions'
import { useDispatch } from 'react-redux'
import playlistAnime from '@/sampleData/playlistAnime'
import recommendedAnime from '@/sampleData/recommendedAnime'

interface Props {
    picture: string;
    title: string;
    releaseDate: string;
    score: string | number;
    id: string;
}

const WatchlistCard = ({ picture, title, releaseDate, score, id }: Props) => {

    const handleCardPress = (id: string) => router.push(`/anime/${id}`);

    const dispatch = useDispatch()

    const _removeFromWatchlist = (id: string) => {

        const playlistAnimeData = Object.values(playlistAnime).flat();
        const recommendedAnimeData = Object.values(recommendedAnime).flat();
        if (id) {
            const foundAnime: any = playlistAnimeData.find((item) => item.id === id) ||
                recommendedAnimeData.find((item) => item.id === id);

            if (foundAnime) {
                dispatch(removeFromWatchList(foundAnime))
                router.back()
            }
        }

    }

    return (
        <TouchableOpacity className='w-full h-[8rem] my-4 flex-row' onPress={() => handleCardPress(id)}>
            <View className='w-[45%] h-full justify-center items-center'>
                <Image source={{ uri: picture }} className="h-[7rem] w-[95%] rounded-3xl overflow-hidden " resizeMode="cover" />
            </View>
            <View className='w-[55%] h-full items-start justify-around px-2'>
                <Text className='text-[#3dd8c5] font-rubik-semibold text-lg'>{title}</Text>
                <View className='flex-row items-center justify-start'>
                    <Text className='text-[#ffffffa4] font-rubik-medium text-sm'>Rating</Text>
                    <MaterialCommunityIcons name={"star"} size={12} color="#ff0" className='mx-[2px]' />
                    <Text className='text-[#ffffffa4] font-rubik-medium text-base'>:</Text>
                    <Text className='text-[#fff] font-rubik-medium text-sm mx-2'>{score}</Text>

                </View>
                <View className='w-full flex-row items-center justify-start gap-x-3 '>
                    <Text className='text-[#ffffff] font-rubik-medium text-sm'>2019</Text>

                    <TouchableOpacity
                        onPress={() => _removeFromWatchlist(id)}
                        className="bg-[#3dd8c5] shadow-md shadow-zinc-300 rounded-full px-4 flex flex-row items-center justify-center py-2"
                    >
                        <MaterialCommunityIcons name="bookmark-off" size={15} color="#fff" />

                        <Text className="text-sm font-rubik-medium text-white ml-2">
                            Remove
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default WatchlistCard