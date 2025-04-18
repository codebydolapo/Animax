import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from "react-native";
import playlistAnime from "@/sampleData/playlistAnime";
import recommendedAnime from "@/sampleData/recommendedAnime";
import featuredAnime from "@/sampleData/featuredAnime";
import Anime from "@/types/anime";




export default function Player() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [playing, setPlaying] = useState(true);
  const [videoMeta, setVideoMeta] = useState<{ title: string; author: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const playerRef = useRef<any>(null);

  const animeRef = useRef<Anime>()

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      router.back();
    }
  }, [router]);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const handleBack = () => {
    router.back();
  }

  useEffect(() => {
    setLoading(true)
    console.log(id)
    const playlistAnimeData = Object.values(playlistAnime).flat();
    const recommendedAnimeData = Object.values(recommendedAnime).flat();
    const featuredAnimeData = Object.values(featuredAnime).flat();

    const timeoutId = setTimeout(() => {
      const foundAnime: any =
        playlistAnimeData.find((item) => item.id === id)
        ||
        recommendedAnimeData.find((item) => item.id === id)
        ||
        featuredAnimeData.find((item) => item.id === id);

      if (foundAnime) {
        animeRef.current = foundAnime;
        setLoading(false); // Stop loading when anime is found

        getYoutubeMeta(animeRef!.current!.trailerLink)
          .then((meta) => {
            setVideoMeta({ title: meta.title, author: meta.author_name });
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching YouTube metadata:", error);
            console.error("Error Details:", error); // Log the full error
            setLoading(false);
          });
        setLoading(false)
      } else {
        setLoading(false); // Stop loading even if anime is not found
        router.back();
      }
    }, 3000);

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount

  }, [id, animeRef]); // id is now the correct dependency

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black justify-center">
      <View className="w-full relative">
        <YoutubePlayer
          ref={playerRef}
          height={250}
          play={playing}
          videoId={animeRef?.current?.trailerLink}
          onChangeState={onStateChange}
        />
        {/* <TouchableOpacity className="absolute top-2 left-2 p-2 bg-black/50 rounded-full" onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity> */}
      </View>

      <View className="p-4">
        {videoMeta && (
          <>
            <Text className="text-lg font-bold text-white">{videoMeta.title}</Text>
            <Text className="text-sm text-gray-400 mt-1">{videoMeta.author}</Text>
          </>
        )}
        {/* <View className="flex-row justify-center p-4">
          <TouchableOpacity className="p-4" onPress={togglePlaying}>
            <MaterialCommunityIcons
              name={playing ? "pause" : "play"}
              size={32}
              color="#fff"
            />
          </TouchableOpacity>
        </View> */}
      </View>

    </View>
  );
}