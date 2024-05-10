import {StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './store'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "react-native-gesture-handler"
import LoginScreen from './screens/LoginScreen';
// import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
// import { useFonts } from 'expo-font';
import MainView from './screens/MainView';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';


const Stack = createNativeStackNavigator()

export default function App() {


  return (
    <Provider store={store} >
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Main" component={MainView} />
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )

}

// const styles = StyleSheet.create({
//   poppins: {
//     fontFamily: 'Poppins, sans-serif'
//   },
// });