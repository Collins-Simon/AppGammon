import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';

import { authentication } from './firebase/firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import GameScreen from './Screens/GameScreen';
import NewGameScreen from './Screens/NewGameScreen'



const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="Register" component={RegisterScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="NewGame" component={NewGameScreen} />
        
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
