import { View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import truncateText from '@/reusableFunctions/truncateText'
import shopItems from '@/sampleData/shop'
import ShopItemType from '@/types/shopItemType'
import { useRouter } from 'expo-router'
import LottieView from 'lottie-react-native';



const ShopItem = ({ name, price, rating, pictures, id }: ShopItemType) => {

  const router = useRouter()

  const handleCardPress = (id: string) => router.push(`/shop/${id}`)

  return (
    <TouchableOpacity onPress={() => handleCardPress(id)}>
      <View className='h-[80vw] w-[45vw] mt-2 items-center justify-between rounded-xl border-[1px] border-[#fff7]'>
        <Image
          source={{ uri: pictures[0] }}
          resizeMode="cover"
          className={`h-[80%] w-full rounded-t-xl`}
        />
        <View className='h-[20%] w-full p-1'>
          <View className='w-full h-[50%] justify-center'>
            <Text className='text-white text-sm font-rubik-semibold'>{truncateText(name, 18)}</Text>
          </View>
          <View className='w-full h-[50%] flex-row items-center justify-between'>
            <Text className='text-[#3dd8c5] font-rubik-extrabold'>{price}¥</Text>
            <View className='flex-row items-center justify-center'>
              <MaterialCommunityIcons name={"star"} size={15} color="#ff0" />
              <Text className='text-white text-[0.7rem] font-rubik-semibold'>{rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const ShopScreen = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const filteredShopItems = shopItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
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
          <Text className='text-white text-2xl font-rubik-semibold'>Shop</Text>
          <MaterialCommunityIcons name={"shopping-outline"} size={25} color="#fff" />
        </View>

        <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-[#fff] border-2 border-white my-5">
          <TextInput
            value={search}
            onChangeText={handleSearch}
            placeholder="Search for products..."
            className="text-lg font-rubik text-black-300 ml-2 flex-1"
          />
          <MaterialCommunityIcons name={"magnify"} size={25} color="#000" />
        </View>

        {filteredShopItems.length > 0 ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            contentContainerClassName="bg-black pb-[10rem] flex-wrap justify-between flex-row"
          >
            {filteredShopItems.map((item, index) => (
              <ShopItem key={index} {...item} />
            ))}
            <View className='w-full h-[5rem] mt-10 items-center justify-center'>
              <View className='w-[80%] h-[3.5rem] bg-[#3dd8c5] rounded-xl items-center justify-center'>
                <Text className='text-xl font-rubik-semibold text-white'>Checkout: 15.4¥</Text>
              </View>
            </View>
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
              No matching products yet.
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ShopScreen