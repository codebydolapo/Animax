import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector } from "react-redux";
import ShopItemType from "@/types/shopItemType";
import { useEffect } from "react";

// import icons from "@/constants/icons";

const TabIcon = ({
    focused,
    icon,
    title,
    cartCount
}: {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
    cartCount?: string | number;
}) => (




    <View className="flex-1 flex flex-col items-center justify-start">
        <View className="relative p-1">
            <Image
                source={icon}
                tintColor={`${focused ? "#3dd8c5" : "#fff"}`}
                resizeMode="contain"
                className={`size-6 `}

            />
            {title == "Shop" &&
                <View className="w-4 h-4 rounded-full bg-[#3dd8c5] absolute top-0 left-0 justify-center items-center">
                    <Text className="text-[#000] text-[0.7rem] font-extrabold">{cartCount}</Text>
                </View>
            }
        </View>
        {/* <MaterialCommunityIcons name={"home-variant"} size={30} color="#000" /> */}
        <Text
            className={`${focused
                ? "text-[#3dd8c5] font-rubik-semibold"
                : "text-white font-rubik-semibold"
                } font-rubik-bold  text-sm w-full text-center mt-2`}

        >
            {title}
        </Text>
    </View>
);

const TabsLayout = () => {

    const cartCount = useSelector((state: {cartState: ShopItemType[]}) => {return state.cartState.length})

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "black",
                    position: "absolute",
                    borderTopColor: "#0061FF1A",
                    borderTopWidth: 1,
                    minHeight: 60,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require("@/assets/icons/_home.png")} title="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="watchlist"
                options={{
                    title: "Watchlist",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require("@/assets/icons/watchlist.png")} title="Watchlist" />
                    ),
                }}
            />
            <Tabs.Screen
                name="downloads"
                options={{
                    title: "Downloads",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require("@/assets/icons/downloads.png")} title="Downloads" />
                    ),
                }}
            />
            <Tabs.Screen
                name="shop"
                options={{
                    title: "Shop",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={require("@/assets/icons/shop.png")} title="Shop" cartCount={cartCount} />
                    ),
                }}
            />

        </Tabs>
    );
};

export default TabsLayout;