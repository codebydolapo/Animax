import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet, ImageSourcePropType } from 'react-native';

const { width } = Dimensions.get('window');

interface data {
    image: ImageSourcePropType | undefined,
    description?: string,
    title?: string
}

interface ImageCarouselProps {
    images?: data[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

const SignInCarousel: React.FC<ImageCarouselProps> = ({
    images,
    autoPlay = true,
    autoPlayInterval = 3000,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

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


    return (
        <View style={{ width: width, overflow: 'hidden' }} className='h-full'>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={200}
            >
                {images?.map(({ image }, index) => (
                    <Image key={index} source={image} className="h-full" style={{ width: width, resizeMode: 'cover' }} />
                ))}
            </ScrollView>



           
            <View className="flex-row absolute bottom-5 self-center ">
                {images?.map((_, index) => (
                    <View
                        key={index}
                        className={`mx-1 w-2 h-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                    />
                ))}
            </View>
        </View>
    );
};

export default SignInCarousel;