import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Platform, StyleSheet, Image, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../firebase/Fire';

//app custom components
import AppButton from '../components/form/AppButton';
import AppText from '../components/text/AppText';
import AppInput from '../components/form/AppInput';
import AppHeader from '../components/text/AppHeader';
import timeoutSolve from '../config/timeoutSolve';

function UpdatePostScreen({ navigation, route }) {

  
  const fill = route.params;
  //post values
  const postId = fill.postId;
  const oldTitle = fill.title;
  const oldDescription = fill.description;
  const [oldImage, setOldImage] = useState(fill.image);

  //form values
  let [ newtitle, setTitle ] = useState("");
  let [ newdescription, setDescription ] = useState("");

 //image picker value
 const [image, setImage] = useState(null);
 const [ isLoading, setIsLoading ] = useState(false);

 //ask for permission
 useEffect(() => {
   (async () => {
     if (Platform.OS !== 'web') {
       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
       if (status !== 'granted') {
         alert('Sorry, we need camera roll permissions to make this work!');
       }
     }
   })();
 }, []);

  async function handleUpdate(){
    setIsLoading(true);
    let remoteUrl = null;
    if(image !== null){
      remoteUrl = await addImage();
    }else{
        remoteUrl = oldImage;
    }
 
   //check if text has been changed 
   if(newtitle == ""){
     newtitle = oldTitle;
   }
 
   if(newdescription == ""){
     newdescription = oldDescription;
   }

      //connect fo firebase
      const db = firebase.firestore();
      db.collection("posts")
        .doc(postId)
      .update({
        title: newtitle,
        description: newdescription,
        imgLink: remoteUrl,
      }).then((response) => {
        
          let imageRef = firebase.storage().refFromURL(oldImage);
          imageRef
            .delete()
            .then(() => {
              
                setIsLoading(false);
                Alert.alert(
                  "Success!",
                  "Post updated successfully",
                  [
                    {
                      text: "Okay",
                      onPress: () => navigation.navigate("Posts"),
                      style: "cancel"
                    }
                  ]
                )
                setOldImage(remoteUrl);
                
            }).catch((e) => {
              setIsLoading(false);
              Alert.alert(
                "Success!",
                "Post updated successfully",
                [
                  {
                    text: "Okay",
                    onPress: () => navigation.navigate("Posts"),
                    style: "cancel"
                  }
                ]
              )
              
            });

      }).catch((err) => {
        console.log(err.message);
      })
 }


 //pick image
 const pickImage = async () => {
   let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.All,
     allowsEditing: true,
     aspect: [8, 4],
     quality: 1,
   });

    if (!result.cancelled) {
      setImage(result.uri);
    }
 };

 //upload image 
 const addImage = async()  => {
   const blob = await new Promise((resolve, reject ) => {
     const xhr = new XMLHttpRequest();
     xhr.onload = function () {
       resolve(xhr.response);
     };
     xhr.onerror = function() {
       reject(new TypeError('Network connection failed!'));
     };
     xhr.responseType = 'blob'; 
      xhr.open('GET', image, true); 
      xhr.send(null);
   });

      const ref = firebase.storage().ref().child(new Date().toISOString())
      const snapshot = await ref.put(blob);
  
      const url = await snapshot.ref.getDownloadURL();

      return url;
}

  return (
    <View style={styles.container}>
        <AppHeader
            title="Update Post"
            onPress={() => navigation.goBack()}
            backgroundColor="white"
        />
      <ScrollView>
      <View style={styles.postForm}>
        <AppInput 
          color="#0000FF"
          size={14}
          defaultValue={fill.title}
          iconName="book"
          onChangeText={(text) => setTitle(text)}
        />
        
        <AppInput 
          color="#0000FF"
          size={14}
          defaultValue={fill.description}
          iconName="bookshelf"
          onChangeText={(text) => setDescription(text)}
          editable
          textAlignVertical="top"
          multiline
          numberOfLines={10}
          editable
          maxLength={500}
        />

        
      <AppText
          bold
          size={18}
        >Current Image: </AppText>
        <Image 
          source={ image !== null ? {uri: image} : {uri: oldImage}}
          style={{width: "100%", height: 200, borderRadius: 12}}
        />

        <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
          <TouchableOpacity 
            onPress={() => pickImage()}
          >
          <MaterialCommunityIcons 
            name="image"
            size={80}
            color="gray"
          />
          <AppText
            bold
            style={{alignSelf: 'flex-end'}}
          >Select new Image</AppText>
          </TouchableOpacity>
        </View>

        {isLoading === true ? <ActivityIndicator size={110} color="#008000"/> : <AppButton
          title="Update"
          backgroundColor="#008000"
          color="white"
          titleSize={25}
          onPress={() => handleUpdate()}
        />}
        
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  }, 
  postForm: {
    flex: 1, 
    marginTop: 20,
    marginBottom: 60, 
    paddingHorizontal: 20, 
  }
})

export default UpdatePostScreen;