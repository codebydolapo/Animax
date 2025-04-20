import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { login, logout } from '@/lib/appWrite';
import { Redirect } from "expo-router";
// import { logout } from "@/lib/appWrite";
import { useGlobalContext } from "@/lib/global-provider";
// import { imageSlider } from '@/slider/sliderData';
// import { useSharedValue } from "react-native-reanimated"
// import Slider from '@/components/slider';
import { imageSlider } from '@/slider/sliderData';
import SignInCarousel from '@/components/SignInCarousel';



const SignIn = () => {

    const { refetch, loading, isLogged } = useGlobalContext();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    if (!loading && isLogged) return <Redirect href="./" />;

    const handleLogin = async () => {
        setIsLoggingIn(true);
        try {
            const result = await login();
            if (result) {
                refetch();
            } else {
                Alert.alert('Error', 'Failed to login. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        } finally {
            setIsLoggingIn(false);
        }
    };




    return (
        <SafeAreaView className={`h-screen`}>
            <SignInCarousel images={imageSlider} autoPlay={true} autoPlayInterval={2500} />
            <View className='w-[98%] rounded-xl absolute bottom-10 self-center items-center justify-center p-2 '>
                <View className='gap-y-3 items-center justify-center'>
                    <Text className='text-white font-rubik-medium'>こんにちは! Welcome to</Text>
                    <Text className=' text-white text-6xl font-rubik-extrabold tracking-widest'>Animax</Text>
                </View>
                <TouchableOpacity
                    onPress={handleLogin}
                    className="bg-white w-[90vw] shadow-md shadow-zinc-300 rounded-full py-4 mt-[2rem]"
                >
                    <View className="flex flex-row items-center justify-center">
                        {isLoggingIn ?
                            <ActivityIndicator size={"small"} />
                            :
                            <Image
                                source={require("@/assets/icons/google.jpg")}
                                className="w-5 h-5"
                                resizeMode="contain"
                            />
                        }
                        <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                            Continue with Google
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className={`w-14 h-auto flex-col items-center justify-center absolute left-2 top-0 bottom-0 gap-y-3`}>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>勇</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>気</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>が</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>あ</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>れ</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>ば</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>入</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>っ</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>て</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>く</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>だ</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>さ</Text>
                </View>
                <View className={`items-center`}>
                    <Text className={`text-white tracking-widest text-2xl rotate-360 font-light `}>い</Text>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default SignIn