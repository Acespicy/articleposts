import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//custom app component
import SignupScreen from '../screens/SignupScreen';
import SignInScreen from '../screens/SignInScreen';
import Loading from '../screens/Loading';
import BottomNavigator from './BottomNavigator';
import RegistrationSuccessScreen from '../screens/RegistrationSuccessScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">

    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{
        headerShown: false
      }}
    />
      <Stack.Screen 
        name="SignUp"
        component={SignupScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen 
        name="Loading"
        component={Loading}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen 
        name="Registration Success"
        component={RegistrationSuccessScreen}
        options={{
          headerShown: false
        }}
      />

      
        <Stack.Screen 
          name="BottomNavigation" 
          component={BottomNavigator}
           options={{headerShown: false}} 
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;