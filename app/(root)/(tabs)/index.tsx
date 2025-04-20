import { Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native";
import { getCurrentUser, logout } from "@/lib/appWrite";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/lib/global-provider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HomeCarousel from "@/components/HomeCarousel";
import featuredAnime from "@/sampleData/featuredAnime";
import { LinearGradient } from "expo-linear-gradient";
import playlistAnime from "@/sampleData/playlistAnime";
import PlaylistAndRecommendationScroller from "@/components/PlaylistAndRecommendationScroller";
import recommendedAnime from "@/sampleData/recommendedAnime";
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchList, removeFromWatchList, clearWatchList } from "@/redux/actions";
import Anime from "@/types/anime";
import { useRouter } from "expo-router";
import ShopItemType from "@/types/shopItemType";

export default function Index() {

  const router = useRouter()


  const { user } = useGlobalContext()

  const [_featuredAnime, setFeaturedAnime] = useState<Anime[]>([]);
  const [_playlistAnime, setPlaylistAnime] = useState<Anime[]>([])
  const [_recommendedAnime, setRecommendedAnime] = useState<Anime[]>([])

  const dispatch = useDispatch();

  useEffect(() => {
    if (featuredAnime && playlistAnime && recommendedAnime) {

      const featuredAnimeData = Object.values(featuredAnime).flat();
      const playlistAnimeData: any = Object.values(playlistAnime).flat();
      const recommendedAnimeData: any = Object.values(recommendedAnime).flat();

      setFeaturedAnime(featuredAnimeData);
      setPlaylistAnime(playlistAnimeData);
      setRecommendedAnime(recommendedAnimeData);

      //pushing randomized members of the playlist and recommendations into the global state
      // Dispatch actions after data is set
      dispatch(clearWatchList())
      if (recommendedAnimeData.length > 0 && playlistAnimeData.length > 0) {
        for (let i = 0; i < Math.min(9, recommendedAnimeData.length, playlistAnimeData.length); i++) {
          if (i % 2 === 0) {
            dispatch(addToWatchList(recommendedAnimeData[i]));
            dispatch(addToWatchList(playlistAnimeData[i]));
          }
        }
      }

    }
  }, []);

  const goToCart = () => {
    router.push("/checkout")
  }

  const cartCount = useSelector((state: { cartState: ShopItemType[] }) => { return state.cartState.length })


  const handleLogout = async () => {
    try {
      await logout();

    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black", marginBottom: 20, paddingHorizontal: 12 }}>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="bg-black pb-10"
      >
        <View className="h-[4rem] w-full flex-row ">
          <TouchableOpacity className="h-inherit w-[70%] items-center justify-center flex-row gap-x-3" onPress={handleLogout}>
            <Image
              source={require("@/assets/images/pfp.png")}
              resizeMode="contain"
              className={`size-12 rounded-full `}

            />
            <View className="flex-1">
              <Text className="text-[#3dd8c5] text-[0.7rem] font-bold">こんにちは!</Text>
              <Text className="text-white font-rubik-semibold text-lg tracking-wide capitalize">{user?.name ?? "Guest"}</Text>
            </View>
          </TouchableOpacity>
          <View className="h-inherit w-[30%] gap-x-2 flex-row items-center justify-end">
            <TouchableOpacity className="w-12 h-12 items-center justify-center relative">
              <MaterialCommunityIcons name={"magnify"} size={30} color="#fff" />
              {/* <View className="w-4 h-4 rounded-full bg-[#3dd8c5] absolute top-2 right-2 justify-center items-center">
              <Text className="text-[#fff] text-[0.7rem] font-extrabold ">2</Text>
            </View> */}
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 items-center justify-center relative" onPress={goToCart}>
              <MaterialCommunityIcons name={"cart-outline"} size={25} color="#fff" />
              <View className="w-4 h-4 rounded-full bg-[#3dd8c5] absolute top-2 right-2 justify-center items-center">
                <Text className="text-[#000] text-[0.7rem] font-extrabold">{cartCount}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-[100vw] h-[140vw] mt-2 items-center justify-center rounded-2xl relative">
          <HomeCarousel
            images={_featuredAnime}
          />
        </View>
        <PlaylistAndRecommendationScroller
          data={_playlistAnime}
          header={"Continue Exploring"}
          iconName={"play-circle-outline"}
        />
        <PlaylistAndRecommendationScroller
          data={_recommendedAnime}
          header={"Top Recommendations"}
          iconName={"thumb-up-outline"}
        />
      </ScrollView>
    </SafeAreaView>
  );
}


