import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, ImageSourcePropType, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Anime from "@/types/anime";
import { useRouter } from 'expo-router';


const { width } = Dimensions.get('window');

interface ImageCarouselProps {
    images?: Anime[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

const HomeCarousel: React.FC<ImageCarouselProps> = ({
    images,
    autoPlay = true,
    autoPlayInterval = 3000,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const router = useRouter()

    useEffect(() => {
        if (autoPlay) {
            intervalRef.current = setInterval(() => {
                const nextIndex = (currentIndex + 1) % images!.length;
                scrollToIndex(nextIndex);
            }, autoPlayInterval);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [currentIndex, autoPlay, images?.length, autoPlayInterval]);

    const scrollToIndex = (index: number) => {
        scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
        setCurrentIndex(index);
    };

    const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    const truncateTitle = (title: string, maxLength: number = 25) => {
        return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
    };

    const handlePlay = (id: string | number) => {
        if (id) {
            router.push(`/player/${id}`);
        }
    };

    return (
        <View style={{ overflow: 'hidden' }} className='w-[100vw] h-[140vw] rounded-2xl ' >
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={200}
            >
                {images?.map(({ picture, title, score, id }, index) => (
                    <TouchableOpacity onPress={() => handlePlay(id)}  key={index} >
                        <View className='relative'>
                            <Image key={index} source={{ uri: picture }} className=" h-[140vw]"
                                resizeMode='cover'
                                style={{ width: width }}
                            />
                            <View className="absolute w-[100vw] h-[4rem] items-center justify-between flex-row top-2 px-2 z-10 ">
                                <Text className="text-white font-rubik-semibold text-2xl tracking-tighter">{truncateTitle(title)}</Text>
                            </View>
                            <View className="h-[4rem] w-[4rem] rounded-full items-center justify-center flex-row gap-x-2 px-3 bg-black/70 backdrop-blur-md absolute bottom-1/2 self-center ">
                                <MaterialCommunityIcons name={"play"} size={35} color="#fff" />
                                {/* <Text className="text-[#000] text-xl font-extrabold">Watch Now!</Text> */}

                            </View>
                            {/* gradient here */}
                            <LinearGradient
                                colors={['rgba(0,0,0,0.9)', 'transparent']}
                                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60 }}
                            />

                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.9)']}
                                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60 }}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>





            <View className="flex-row absolute bottom-5 self-center ">
                {images?.map((_, index) => (
                    <View
                        key={index}
                        className={`mx-1 w-2 h-2 rounded-full ${currentIndex === index ? 'bg-[#3dd8c5]' : 'bg-white'}`}
                    />
                ))}
            </View>
        </View>
    );
};

export default HomeCarousel;