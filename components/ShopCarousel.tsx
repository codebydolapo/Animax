import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, ImageSourcePropType, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Anime from "@/types/anime";
import ShopItemType from '@/types/shopItemType';

const { width } = Dimensions.get('window');

interface ImageCarouselProps {
    shopItem: ShopItemType | undefined;
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

const ShopCarousel: React.FC<ImageCarouselProps> = ({
    shopItem,
    autoPlay = true,
    autoPlayInterval = 3000,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (autoPlay) {
            intervalRef.current = setInterval(() => {
                const nextIndex = (currentIndex + 1) % shopItem!.pictures.length;
                scrollToIndex(nextIndex);
            }, autoPlayInterval);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [currentIndex, autoPlay, shopItem!.pictures!.length, autoPlayInterval]);

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
                {shopItem?.pictures.map((picture, index) => (
                    <View className='relative' key={index} >
                        <Image key={index} source={{ uri: picture }} className=" h-[140vw]"
                            resizeMode='cover'
                            style={{ width: width }}
                        />
                       
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
                ))}
            </ScrollView>





            <View className="flex-row absolute bottom-5 self-center ">
                {shopItem!.pictures.map((_, index) => (
                    <View
                        key={index}
                        className={`mx-1 w-2 h-2 rounded-full ${currentIndex === index ? 'bg-[#3dd8c5]' : 'bg-white'}`}
                    />
                ))}
            </View>
        </View>
    );
};

export default ShopCarousel;