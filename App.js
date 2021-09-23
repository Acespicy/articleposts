import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import firebase from './app/firebase/Fire';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';

//app custom components

import BottomNavigator from './app/navigation/BottomNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';
import Loading from './app/screens/Loading';
import WelcomeNavigator from './app/navigation/WelcomeNavigator';
import NoInternetScreen from './app/screens/NoInternetScreen';
import SignInScreen from './app/screens/SignInScreen';
import SignupScreen from './app/screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Welcome" component={WelcomeNavigator} options={{headerShown: false}} />
        <Stack.Screen name="Loading" component={Loading} options={{headerShown: false}} />
        <Stack.Screen name="Authentication" component={AuthNavigator} options={{headerShown: false}} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigator} options={{headerShown: false}} />
        <Stack.Screen name="NoInternet Screen" component={NoInternetScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
