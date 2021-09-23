import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//app custom components

import BottomNavigator from './app/navigation/BottomNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';
import Loading from './app/screens/Loading';
import NoInternetScreen from './app/screens/NoInternetScreen';
import WelcomeNavigator from './app/navigation/WelcomeNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
    
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Loading" component={Loading} options={{headerShown: false}} />
        <Stack.Screen name="WelcomeNavigator" component={WelcomeNavigator} options={{headerShown: false}} />
        <Stack.Screen name="Authentication" component={AuthNavigator} options={{headerShown: false}} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigator} options={{headerShown: false}} />
        <Stack.Screen name="NoInternet Screen" component={NoInternetScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
