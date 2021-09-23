import React, { useState } from 'react';
import { ActivityIndicator, Image, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../firebase/Fire';

//app custom components
import AppText from '../components/text/AppText';

function OpenPostScreen({ navigation, route }) {

  //isLoading
 const [ isLoading, setIsLoading ] = useState(false);

  const fill = route.params;
  const oldImage  = fill.image;
  const postId = fill.postid;

  //delete image 

  const deleteImage = () => {
    setIsLoading(true);

    const db = firebase.firestore();
    db.collection("posts").doc(postId).delete().then(() => {
      let imageRef = firebase.storage().refFromURL(oldImage);
      imageRef
        .delete()
        .then(() => {
          
            setIsLoading(false);
            Alert.alert(
              "Success!",
              "Post deleted successfully",
              [
                {
                  text: "Okay",
                  onPress: () => navigation.navigate("Posts"),
                  style: "cancel"
                }
              ]
            )
            
        }).catch((e) => {
          
          setIsLoading(false);
          console.log(e)
          Alert.alert(
            "Success!",
            "Post deleted successfully",
            [
              {
                text: "Okay",
                onPress: () => navigation.navigate("Posts"),
                style: "cancel"
              }
            ]
          )
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  })
}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image 
          source={{uri: route.params.image}}
          style={{width: "100%", height: "100%", resizeMode: "contain"}}
        />
      </View>
      <View style={styles.textBox}>
        <AppText
          bold
          size={27}
        >{fill.title}</AppText>

        <AppText
          style={{lineHeight: 24, textAlign: "justify"}}
        >{fill.description}
        </AppText>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', borderTopColor: 'gray', borderTopWidth: 1, paddingTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons
                name="clock"
                size={18}
                color="gray"
            />
            <AppText
              size={13}
              color="gray"
              bold
              style={{marginTop: 2, marginLeft: 2}}
            > {fill.date}</AppText>
          </View>
          
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            <MaterialCommunityIcons
                name="calendar"
                size={18}
                color="gray"
            />
            <AppText
              size={13}
              color="gray"
              bold
              style={{marginTop: 2, marginLeft: 2}}
            >{fill.time}</AppText>
          </View>
        </View>


        {isLoading && <ActivityIndicator size={110} color="#008000"/> }
        <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Update Post", {title: fill.title, description: fill.description, image: fill.image, postId: fill.postid})}
            style={{flexDirection: 'row', marginTop: 30}}>
            <MaterialCommunityIcons
              name="file-edit"
              size={25}
              color="#0096FF"
            />
            <AppText
              style={{marginLeft: 5}}
              color="#0096FF"
              bold
            >Update Post</AppText>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => Alert.alert(
              "Delete Post",
              "Do you wish to delete this post? ",
              [
                {
                  text: "Yes",
                  onPress: () => deleteImage()
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                }
              ]
              
              )}
            style={{flexDirection: 'row', marginTop: 30}}>
            <MaterialCommunityIcons
              name="delete"
              size={25}
              color="tomato"
            />
            <AppText
              style={{marginLeft: 5}}
              color="tomato"
              bold
            >Delete Post</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", 
    flex: 1
  },
  imgContainer: {
    width: "100%", 
    height: 200, 
  }, 
  textBox: {
    padding: 8, 
  }
})

export default OpenPostScreen;