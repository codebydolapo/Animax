import { Stack } from "expo-router";
import "../global.css";
import { StatusBar, ActivityIndicator, Text } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalProvider from "@/lib/global-provider";
import store from '../redux/store';
import { Provider } from 'react-redux';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      async function hideSplash() {
        await SplashScreen.hideAsync();
      }
      hideSplash();
    }
  }, [loaded]);

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading fonts.</Text>
      </SafeAreaView>
    );
  }

  if (!loaded) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <Provider store={store}>
        <GlobalProvider>
            <StatusBar
                animated={true}
                backgroundColor="#000"
            />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="anime/[id]"
                    options={{
                        presentation: 'modal',
                        animation: 'fade',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="player/[id]"
                    options={{
                        presentation: 'modal',
                        animation: 'fade',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="shop/[id]"
                    options={{
                        presentation: 'modal',
                        animation: 'fade',
                        headerShown: false,
                    }}
                />
            </Stack>
        </GlobalProvider>
    </Provider>
  );
}