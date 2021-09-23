import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//app custom components
import ViewArticleScreen from '../screens/ViewArticleScreen';
import ArticlesScreen from '../screens/ArticlesScreen';
import SignInScreen from '../screens/SignInScreen';


const Stack = createNativeStackNavigator();

function ArticlesNavigator({ navigation }) {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Article"
        component={ArticlesScreen}
        options={{
          headerShown: false
        }}
      />
      
      <Stack.Screen 
        name="Open Article"
        component={ViewArticleScreen}
        options={{
          title:"Read Article"
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

export default ArticlesNavigator;