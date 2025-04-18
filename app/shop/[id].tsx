import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShopCarousel from '@/components/ShopCarousel'
import { useLocalSearchParams, useRouter } from 'expo-router';
import shopItems from '@/sampleData/shop';
import ShopItemType from '@/types/shopItemType';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/redux/actions';


type CommentProp = {
    comment: string;
    index: number
}

const commentMetadata = [
    {
        name: "john doe",
        image: require("@/assets/images/commenters/1.webp")
    },
    {
        name: "samuel morse",
        image: require("@/assets/images/commenters/2.png")
    },
    {
        name: "Kevin stone",
        image: require("@/assets/images/commenters/3.jpg")
    },
    {
        name: "miranda doe",
        image: require("@/assets/images/commenters/4.jpg")
    },
]

const CommentBox = ({ comment, index }: CommentProp) => {
    // useEffect(() => {
    //     console.log(comment);
    // }, [comment]);

    return (
        comment ? (
            <View className='w-full flex-row mb-5 rounded-lg p-2'>
                <View className='mr-4'>
                    <Image
                        source={commentMetadata[index].image}
                        resizeMode="contain"
                        className={`size-12 rounded-full `}
                    />
                </View>
                <View className='flex-1 '>
                    <Text className='text-[#3dd8c5] text-sm tracking-wide font-rubik-semibold capitalize'>{commentMetadata[index].name}</Text>
                    <Text className='text-white tracking-wide font-rubik-light'>{comment}</Text>
                </View>
            </View>
        ) : null
    );
};

const ShopDetails = () => {

    const dispatch = useDispatch()

    const router = useRouter()

    const { id } = useLocalSearchParams<{ id?: string }>()
    const [shopItem, setShopItem] = useState<ShopItemType>()
    const [loading, setLoading] = useState(true); // Initial loading state
    const [shopItemCount, setShopItemCount] = useState(0)
    const [inCart, setInCart] = useState(false)
    // const [cart, setCart] = useState<ShopItemType[]>([])

    const cart = useSelector((state: { cartState: ShopItemType[] }) => { return state.cartState })
    const cartCount = useSelector((state: { cartState: ShopItemType[] }) => { return state.cartState.length })

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            if (id) {
                const foundItem: any = shopItems.find(item => item.id === id)
                setShopItem(foundItem);
                setLoading(false); // Stop loading when anime is found
            }
            else {
                router.back()
            }
        }, 2000);

        return () => clearTimeout(timeoutId); // Cleanup timeout on unmount

    }, [id]);

    useEffect(() => {
        const foundItem = cart.find(cartItem => cartItem.id === id);
        foundItem ? setInCart(true) : setInCart(false)
    }, [cart])


    const _removeFromCart = () => {
        const foundItem = cart.find(cartItem => cartItem.id === id);
        if (foundItem) {
            dispatch(removeFromCart(shopItem!));
        }
    };

    const _addToCart = () => {
        const foundItem = cart.find(cartItem => cartItem.id === id);
        if (!foundItem) {
            dispatch(addToCart(shopItem!));
        }
    }

    const goToCart = ()=>{
        router.push("/checkout")
    }


    if (loading) {
        return (
            <View className="bg-black flex-1 items-center justify-center">
                <ActivityIndicator size={"large"} color={"#3dd8c5"} />
            </View>
        );
    }

    return (
        <View className='bg-black h-screen px-4 justify-center'>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="bg-black pb-3"
            >
                <View className='w-full h-[4rem] flex-row items-center justify-between'>
                    <TouchableOpacity className='p-1 rounded-full items-center justify-center' onPress={() => router.back()}>
                        <MaterialCommunityIcons name={"chevron-left"} size={35} color="#fff" />
                    </TouchableOpacity>
                    <View className='flex-row gap-x-2'>
                        <TouchableOpacity className="w-12 h-12 items-center justify-center relative">
                            <MaterialCommunityIcons name={"cart-outline"} size={25} color="#fff" />
                            <View className="w-4 h-4 rounded-full bg-[#3dd8c5] absolute top-2 right-2 justify-center items-center">
                                <Text className="text-[#000] text-[0.7rem] font-extrabold">{cartCount}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='p-1 bg-[#181818] rounded-full items-center justify-center'>
                            <MaterialCommunityIcons name={"share"} size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="w-[100vw] h-[140vw] items-center justify-center rounded-2xl relative">
                    <ShopCarousel
                        shopItem={shopItem}
                    />
                </View>
                <View className='mt-5'>
                    <Text className='text-white font-rubik-semibold text-xl'>{shopItem?.name}</Text>
                </View>
                {/* <View className='mt-3 h-[3rem] items-center justify-start flex-row gap-x-3'>
                    <View className='h-[80%] pr-8 z-10 items-center justify-start flex-row gap-x-2'>
                        <MaterialCommunityIcons name={"star"} size={20} color="#ff5" />
                        <Text className='text-white text-sm font-rubik-semibold'>{shopItem?.rating}</Text>
                    </View>
                    <View className='h-[80%] pr-8 z-10 items-center justify-start flex-row gap-x-2'>
                        <MaterialCommunityIcons name={"heart"} size={20} color="#FE251B" />
                        <Text className='text-white text-sm font-rubik-semibold'>94%</Text>
                    </View>
                    <View className='h-[80%] border-[1px] border-[#3dd8c5] z-10 items-center justify-around flex-row px-4 rounded-lg gap-x-2'>
                        <MaterialCommunityIcons name={"thumb-up-outline"} size={20} color="#fff" />
                        <Text className='text-white text-sm font-rubik-semibold'>{shopItem?.status}</Text>
                    </View>
                </View> */}
                <View className='mt-5 h-[3.5rem] bg-[#181818] rounded-lg flex-row items-center justify-between px-2'>
                    <View className='flex-row items-center justify-start gap-x-4'>
                        <Text className='text-[#3dd8c5] text-lg font-rubik-semibold'>{shopItem?.price}¥</Text>
                        <Text className='text-[#fff] text-[0.7rem] font-rubik-light'>reduced in price from 69¥</Text>
                    </View>
                    <MaterialCommunityIcons name={"information-outline"} size={27} color="#fff" />
                </View>
                <View className='mt-5'>
                    <Text className='text-white tracking-wide font-rubik-light'>{shopItem?.description}</Text>
                </View>
                <View className='mt-5'>
                    {
                        shopItem!.comments?.map((comment, index) => (
                            <CommentBox
                                comment={comment}
                                key={index}
                                index={index}
                            />
                        ))
                    }

                </View>
            </ScrollView>
            <View className='mt-3 h-[3.5rem] w-full rounded-lg mb-10 flex-row items-center justify-around relative'>
                <TouchableOpacity
                    className={`h-full ${inCart ? "w-[80%]" : "w-[95%]"} items-center justify-center relative bg-[#3dd8c5] rounded-lg`}
                    onPress={(inCart ? goToCart : _addToCart)}
                >
                    <Text className='text-white text-lg font-rubik-semibold'>{inCart ? `Go To Cart!` : `Add to cart!`}</Text>
                </TouchableOpacity>
                {
                    inCart &&
                    <TouchableOpacity className='w-[15%] h-full items-center justify-center border-[#585858] border-[1px] rounded-lg ' onPress={_removeFromCart}>
                        <MaterialCommunityIcons name={"trash-can-outline"} size={25} color="#3dd8c5" />
                    </TouchableOpacity>
                }
            </View>

        </View>

    )
}

export default ShopDetails