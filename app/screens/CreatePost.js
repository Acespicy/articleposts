import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Platform, Image, StyleSheet, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../firebase/Fire';

//app custom components
import AppButton from '../components/form/AppButton';
import AppText from '../components/text/AppText';
import AppInput from '../components/form/AppInput';
import AppHeader from '../components/text/AppHeader';
import timeoutSolve from '../config/timeoutSolve';

function CreatePost({ navigation }) {
  //image picker value
  const [image, setImage] = useState(null);
  //input fields
  const [title, setTitle ] = useState(null);
  const [description, setDescription ] = useState(null);

  //error fields 
  const [descriptionError, setDescriptionError ] = useState(null);
  const [titleError, setTitleError ] = useState(null);
  const [imageError, setImageError ] = useState(null);
  const [ error, setError ] = useState(null);


  const [ isLoading, setIsLoading ] = useState(false);

  //set user id 
  const [ userid, setUserId ] = useState(null);

  //get user id
  useEffect(
    () => {
     firebase.auth().onAuthStateChanged((user) => {
      if(user){
        setUserId(user.uid);
      }else{
        setUserId = (null);
      }
     });
   }
  );

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

  //pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  //post id generator 
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

  //upload image 
  const handlePost = async()  => {
    //reset error boxes
      setTitleError(null);
      setDescriptionError(null);
      setImageError(null);
      setError(null); 

    //set permission for posting 
    let allowPosting = 1;

    //check if fields are empty 
    if(title === "" || title === null ){
      setTitleError("Title field is required!");
      allowPosting = 0;
    }

    if(description === "" || description === null ){
      setDescriptionError("Description field is required!");
      allowPosting = 0;
    }

    if(image === "" || image === null ){
      setImageError("Picture is required!");
      allowPosting = 0;
    }

if(allowPosting == 1){
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
  const snapshot = ref.put(blob);
      snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
        setIsLoading(true);
      },
      (err) => {
        setIsLoading(false)
        console.log(err);
        blob.close()
        return null
      }, 
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          blob.close();
  
          //get random post id
          const postId = makeid(18);
          //get date and time 
          
          const dateObj = new Date();
          let dateCreated = dateObj.toLocaleDateString();
          let timeCreated = dateObj.toLocaleTimeString();
             //connect fo firebase
        const db = firebase.firestore();
        db.collection("posts")
          .doc(postId)
        .set({
          title: title,
          description: description,
          userId: userid, 
          imgLink: url,
          postId: postId, 
          date: dateCreated,
          time: timeCreated,
        }).then((res) => {
          setIsLoading(false)
          Alert.alert(
            "Success!",
            "Post successfully added",
            [
              {
                text: "Ok",
                style: "cancel"
              }
            ]
          )}).catch((err) =>{
            setIsLoading(false)
            Alert.alert(
              "Error!",
              "Failed to upload. Something went wrong",
              [
                {
                  text: "Cancel",
                  style: "cancel"
                }
              ]
            )
          })
        });
      } 
      );
  }else{
    setError("All Fields are required!");
  }
};


  return (
    <View style={styles.container}>
      <AppHeader
        title="Create Post"
        backgroundColor="white"
        onPress={() => navigation.goBack()}
      />

    <ScrollView>
      <View style={styles.postForm}>
        <AppInput 
          color="#0000FF"
          size={14}
          placeholder="Enter Title"
          iconName="book"
          onChangeText={(text) => setTitle(text)}
        />
        
        {
          titleError && <AppText
                                bold
                                color="red"
                                size={14}
                              >{titleError}</AppText>
        }

        <AppInput 
          color="#0000FF"
          size={14}
          placeholder="Enter Description"
          iconName="bookshelf"
          onChangeText={(text) => setDescription(text)}
          editable
          textAlignVertical="top"
          multiline
          numberOfLines={10}
          editable
          maxLength={500}
        />

        {
          descriptionError && <AppText
                                bold
                                color="red"
                                size={14}
                              >{descriptionError}</AppText>
        }


        {image && <Image 
          source={{ uri: image }}
          style={{width: "100%", height: 200, borderRadius: 12}}
        />}

        <View style={{flexDirection: "row", marginBottom: 20}}>
          <TouchableOpacity 
            onPress={() => pickImage()}
          >
          <View>
          <MaterialCommunityIcons 
            name="image"
            size={80}
            color="gray"
          />
          <AppText bold >Select Image</AppText>
          </View>
          {
            imageError && <AppText
                                  bold
                                  color="red"
                                  size={14}
                                >{imageError}</AppText>
          }
          </TouchableOpacity>
        </View>


        {isLoading === true ? <ActivityIndicator size={110} color="#008000"/> : <AppButton
          title="Submit"
          backgroundColor="#008000"
          color="white"
          titleSize={20}
          onPress={handlePost}
        />}
        <View  style={{width: '100%', marginTop: 5, alignItems: 'center'}}>
        {
          error && <AppText
                                bold
                                color="red"
                                size={15}
                              >{error}</AppText>
        }
        </View>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 60
  }, 
  postForm: {
    flex: 0, 
    marginTop: 40,
    paddingHorizontal: 20, 
    marginBottom: 50
  }
})

export default CreatePost;