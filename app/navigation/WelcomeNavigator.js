import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//app custom components
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthNavigator from './AuthNavigator';


const Stack = createNativeStackNavigator();

function WelcomeNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false
        }}
      />
      
      <Stack.Screen 
        name="Authent"
        component={AuthNavigator}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

export default WelcomeNavigator;