import { View, Text, ScrollView, SafeAreaView, Image, TextInput, KeyboardAvoidingView, Platform, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import WatchlistCard from '@/components/WatchlistCard'
import { useSelector } from 'react-redux'
import Anime from '@/types/anime'
// import * as Animatable from 'react-native-animatable'
import LottieView from 'lottie-react-native';

const watchlistScreen = () => {
  const watchlist = useSelector((state: { watchlistState: Anime[] }) => state.watchlistState);

  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  // Filter the watchlist based on the search term
  const filteredWatchlist = watchlist.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();

    }, 2000);

    return () => clearInterval(interval);
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black", marginBottom: 20, paddingHorizontal: 12 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -50} // Adjust offset as needed
      >

        <View className='px-4 flex-row gap-x-2 items-center justify-start my-4'>
          <Text className='text-white text-2xl font-rubik-semibold'>Watchlist</Text>
          <MaterialCommunityIcons name={"target"} size={25} color="#fff" />
        </View>

        <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-[#fff] border-2 border-white my-5">
          <TextInput
            value={search}
            onChangeText={handleSearch}
            placeholder="Search watchlist..."
            className="text-lg font-rubik text-black-300 ml-2 flex-1"
          />
          <MaterialCommunityIcons name={"magnify"} size={25} color="#000" />
        </View>

        {
          watchlist ?
            filteredWatchlist.length > 0 ? (
              <ScrollView
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="bg-black pb-10"
              >
                {
                  filteredWatchlist.map(({ picture, title, releaseDate, score, id }, index) => {
                    return (
                      <WatchlistCard
                        key={index}
                        picture={picture}
                        title={title}
                        releaseDate={releaseDate}
                        score={score}
                        id={id}
                      />
                    )
                  })
                }
              </ScrollView>
            ) : (
              <View className='flex-1 items-center justify-center '>
                <View className='w-[80vw] h-[80vw]'>
                  <LottieView
                    ref={animationRef}
                    source={require("@/assets/lottie/404.json")}
                    style={{ flex: 1 }}
                  />
                </View>
                <Text className='text-[#3dd8c5]'>何も見つかりませんでした、友よ! </Text>  {/* I didn't find anything, friend */}
                <Text className='text-white font-rubik-semibold text-xl my-4 text-center'>
                  No matching titles in your watchlist.
                </Text>
              </View>
            )
            :
            <View className='flex-1 items-center justify-center '>
                <View className='w-[80vw] h-[80vw]'>
                  <LottieView
                    ref={animationRef}
                    source={require("@/assets/lottie/404.json")}
                    style={{ flex: 1 }}
                  />
                </View>
                <Text className='text-[#3dd8c5]'>何も見つかりませんでした、友よ! </Text>  {/* I didn't find anything, friend */}
                <Text className='text-white font-rubik-semibold text-xl my-4 text-center'>
                 Nothing in your watchlist yet.
                </Text>
              </View>
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default watchlistScreen