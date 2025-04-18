import { View, Text, SafeAreaView, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Anime from '@/types/anime';
import { useSelector } from 'react-redux';
import truncateText from '@/reusableFunctions/truncateText';
import LottieView from 'lottie-react-native';


interface Props {
  picture: string;
  title: string;
}


const DownloadItem = ({ picture, title }: Props) => {

  const downloadPercentage = useRef(Math.floor(Math.random() * 100) + 1);

  const numberOfLikes = useRef(Math.floor(Math.random() * 100) + 1)


  return (
    <View className='h-[80vw] w-[45vw] mt-2 items-center justify-between rounded-xl border-[1px] border-[#fff7]'>
      <Image
        source={{ uri: picture }}
        resizeMode="cover"
        className={`h-[80%] w-full rounded-t-xl`}
      />
      <View className='h-[20%] w-full p-1'>
        <View className='w-full h-[60%] justify-center'>
          <Text className='text-white text-sm font-rubik-semibold'>{truncateText(title, 18)}</Text>
        </View>
        <View className='w-full h-[40%] flex-row'>
          <View className='w-[30%] flex-row'>
            <MaterialCommunityIcons name={"heart"} size={15} color="#3dd8c5" />
            <Text className='text-white text-sm font-rubik-semibold mx-2'>{numberOfLikes.current}</Text>
          </View>
          <View className='w-[70%] flex-row items-center px-1 gap-x-1'>
            <Text className='text-white text-sm font-rubik-semibold'>{downloadPercentage.current}%</Text>
            <View className='flex-1 h-2 items-start bg-white justify-center'>
              <View className={`w-[57%] h-full bg-[#3dd8c5]`}></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const DownloadsScreen = () => {
  // It seems 'downloads' is selecting the watchlist.
  // Make sure you have a separate reducer/selector for your downloads state.
  const downloads = useSelector((state: { watchlistState: Anime[] }) => state.watchlistState);

  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  // Filter the downloads based on the search term
  const filteredDownloads = downloads.filter(item =>
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
          <Text className='text-white text-2xl font-rubik-semibold'>Downloads</Text>
          <MaterialCommunityIcons name={"download"} size={25} color="#fff" />
        </View>

        <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-[#fff] border-2 border-white my-5">
          <TextInput
            value={search}
            onChangeText={handleSearch}
            placeholder="Search for downloads..."
            className="text-lg font-rubik text-black-300 ml-2 flex-1"
          />
          <MaterialCommunityIcons name={"magnify"} size={25} color="#000" />
        </View>


        {
          downloads ?
            filteredDownloads.length > 0 ? (
              <ScrollView
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="bg-black pb-[10rem] flex-wrap justify-between flex-row"
              >
                {
                  filteredDownloads.map(({ picture, title }, index) => {
                    return (
                      <DownloadItem
                        key={index}
                        picture={picture}
                        title={title} />
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
                  No matching downloads.
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
                No downloads yet.
              </Text>
            </View>
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default DownloadsScreen