import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import firebase from '../firebase/Fire';

function Loading({ navigation }) {

  useEffect(
    () => {
     firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         navigation.navigate("BottomNavigation", {
            screen: 'Home', 
            params: { 
              params: {
                screen: 'Posts', 
                params: { 
                  userid: user.uid
                }
              }
            }});
       } else {
          navigation.navigate("Authentication");
       }
     });
   }
 );

  return (
    <View style={styles.container}>
    <ActivityIndicator size={120} color="#008000"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})

export default Loading;