import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//app custom components
import OpenPostScreen from '../screens/OpenPostScreen';
import ViewPostScreen from '../screens/ViewPostScreen';
import UpdatePostScreen from '../screens/UpdatePostScreen';
import SignInScreen from '../screens/SignInScreen';

const Stack = createNativeStackNavigator();

function PostNavigator({ route }) {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Posts"
        component={ViewPostScreen}
        options={{
          headerShown: false
        }}
      />
      
      <Stack.Screen 
        name="Open Post"
        component={OpenPostScreen}
        options={{
          title:"Read Post"
        }}
      />
      
      <Stack.Screen 
        name="Update Post"
        component={UpdatePostScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen 
        name="Sign In"
        component={SignInScreen}
        options={{
          headerShown: false
        }}
      />  
    </Stack.Navigator>
  );
}

export default PostNavigator;