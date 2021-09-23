import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//custom components
import CreatePost from '../screens/CreatePost';

//navigators
import ArticlesNavigator from './ArticlesNavigator';
import PostNavigator from './PostNavigator';

const BottomTab = createBottomTabNavigator();

const BottomNavigator = () => {

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen 
        name="Home"
        component={ArticlesNavigator}
        options={{
          headerShown: false, 
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size}/>
        }}
      />
      <BottomTab.Screen 
        name="Create Post"
        component={CreatePost}
        options={{
          title:"",
          headerShown: false, 
          tabBarIcon: ({ color, size }) => 
            <View 
              style={{
                  width: 60, 
                  height: 60, 
                  borderRadius: 60, 
                  backgroundColor: "#008000",
                  justifyContent: 'center',
                  alignItems: 'center', 
                  marginBottom: 20, 
                  shadowColor: "gray", 
                  shadowOffset: {
                    width: 0, height: 10
                  }, 
                  shadowOpacity: 0.5, 
                  shadowRadius: 60, 
                  elevation: 3
              }}>
              <MaterialCommunityIcons name="plus-circle" color="white" size={35}/>
            </View>
        }}
      />
      <BottomTab.Screen 
        name="Post Navigator"
        component={PostNavigator}
        options={{
          headerShown: false, 
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="book-multiple" color={color} size={size}/>
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomNavigator;