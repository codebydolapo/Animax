import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useRouter } from 'expo-router'
import ShopItemType from '@/types/shopItemType'
import { useDispatch, useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'
import { removeFromCart, increaseQuantity, decreaseQuantity } from '@/redux/actions'

interface CartProp {
    picture: string;
    price: string | number;
    name: string;
    id: string;
}

const CheckOutItem = ({ picture, price, name, id }: CartProp) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: { cartState: ShopItemType[] }) => state.cartState);

    const item: any = cart.find(i => i.id === id);
    const itemCount = item?.quantity ?? 1;

    const _removeFromCart = (id: string) => {
        if (item) dispatch(removeFromCart(item));
    };

    const increaseCount = () => {
        dispatch(increaseQuantity(item));
    };

    const decreaseCount = () => {
        dispatch(decreaseQuantity(item));
    };

    return (
        <View className='my-5 h-[7rem] w-full flex-row relative'>
            <View className='w-[30%] h-full items-center justify-center'>
                <Image
                    source={{ uri: picture }}
                    resizeMode="cover"
                    className={`h-full w-full rounded-xl`}
                />
            </View>
            <View className='w-[70%] px-2 items-start justify-between'>
                <Text className="text-white text-lg font-extrabold ">{name}</Text>
                <View className='w-full flex-row items-center justify-between'>
                    <Text className="text-[#3dd8c5] text-base font-extrabold">¥{price}</Text>
                    <View className='w-[5rem] flex-row h-full gap-x-3 items-center'>
                        <TouchableOpacity onPress={decreaseCount}>
                            <MaterialCommunityIcons name={"plus-circle"} size={25} color="#fff" />
                        </TouchableOpacity>
                        <Text className="text-white text-lg font-extrabold">{itemCount}</Text>
                        <TouchableOpacity onPress={increaseCount}>
                            <MaterialCommunityIcons name={"minus-circle"} size={25} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity className='p-2 rounded-full items-center justify-center absolute bg-[#000] left-0 top-0' onPress={() => _removeFromCart(id)}>
                <MaterialCommunityIcons name={"trash-can-outline"} size={20} color="#f00" />
            </TouchableOpacity>
        </View>
    );
};


const checkout = () => {


    const dispatch = useDispatch()
    const router = useRouter()

    const [search, setSearch] = useState("");

    const handleSearch = (text: string) => {
        setSearch(text);
    };

    const cart = useSelector((state: { cartState: ShopItemType[] }) => { return state.cartState })

    const animationRef = useRef<LottieView>(null);

    useEffect(() => {
        animationRef.current?.play();
    }, []);

    const fadeAnim = useRef(new Animated.Value(1)).current;

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

    const getCartTotal = (state: { cartState: ShopItemType[] }) => {
        const parsePrice = (price: string | number) => {
            if (typeof price === "string") {
                return parseFloat(price.replace(/[^\d.]/g, ""));
            }
            return price;
        };

        return state.cartState.reduce((total, item) => {
            const itemPrice = parsePrice(item.price);
            const quantity = item.quantity ?? 1; // fallback to 1 if quantity is missing
            return total + itemPrice * quantity;
        }, 0).toFixed(2); // Keeps 2 decimal places
    };

    const total = getCartTotal({ cartState: cart });

    const filteredCart = cart.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <View className='bg-black h-screen px-4 justify-center'>
            <View className='w-full h-[4rem] flex-row items-center justify-between'>
                <TouchableOpacity className='p-1 rounded-full items-center justify-center' onPress={() => router.back()}>
                    <MaterialCommunityIcons name={"chevron-left"} size={35} color="#fff" />
                </TouchableOpacity>

            </View>

            <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-[#fff] border-2 border-white my-5">
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Search your cart..."
                    className="text-lg font-rubik text-black-300 ml-2 flex-1"
                />
                <MaterialCommunityIcons name={"magnify"} size={25} color="#000" />
            </View>

            {filteredCart.length
                ?
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                    contentContainerClassName="bg-black pb-3"
                >
                    {filteredCart.map(({ name, pictures, price, id }, index) => {
                        return (
                            <CheckOutItem
                                key={index}
                                name={name}
                                picture={pictures[0]}
                                price={price}
                                id={id}

                            />
                        )
                    })}
                </ScrollView>
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
                        Nothing in your cart yet.
                    </Text>
                </View>

            }

            {cart.length > 0 && <View className='mt-3 h-[3.5rem] w-full rounded-lg mb-10 flex-row items-center justify-around relative bg-[#3dd8c5]'>
                <Text className="text-white text-lg font-extrabold ">Proceed To Pay: ¥{total}</Text>
            </View>}

        </View>
    )
}

export default checkout