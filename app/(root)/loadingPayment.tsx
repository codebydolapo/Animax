import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import LottieView from 'lottie-react-native'
import { useDispatch } from 'react-redux'

const LoadingPayment = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [showSuccess, setShowSuccess] = useState(false)

  const loadingAnimationRef = useRef<LottieView>(null)
  const successAnimationRef = useRef<LottieView>(null)

  // Play loading animation right away
  useEffect(() => {
    loadingAnimationRef.current?.play()

    const stage1 = setTimeout(() => {
      setShowSuccess(true)
    }, 2000)

    const stage2 = setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' })
      router.replace('/')
    }, 4500)

    return () => {
      clearTimeout(stage1)
      clearTimeout(stage2)
    }
  }, [])

  // Play success animation only after it renders
  useEffect(() => {
    if (showSuccess) {
      successAnimationRef.current?.play()
    }
  }, [showSuccess])

  return (
    <View className="flex-1 items-center justify-center bg-black">
      {!showSuccess ? (
        <>
          <View className="w-[80vw] h-[80vw]">
            <LottieView
              ref={loadingAnimationRef}
              source={require('@/assets/lottie/loadingPayment.json')}
              style={{ flex: 1 }}
              loop
            />
          </View>
          <Text className="text-white text-xl font-bold mt-4">
            Loading payment infrastructure...
          </Text>
        </>
      ) : (
        <>
          <View className="w-[80vw] h-[80vw]">
            <LottieView
              ref={successAnimationRef}
              source={require('@/assets/lottie/paymentSuccessful.json')}
              style={{ flex: 1 }}
              loop={false}
            />
          </View>
          <Text className="text-[#3dd8c5] mt-4">どうもありがとうございます!</Text>
        </>
      )}
    </View>
  )
}

export default LoadingPayment
