import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import Constants from "expo-constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../firebase/Fire';

//app components
import AppCard from '../components/card/AppCard';
import AppText from '../components/text/AppText';
import { checkConnect } from '../config/functions';
import AppNetworkAlert from '../components/alerts/AppNetworkAlert';
import AppEmptyAlert from '../components/alerts/AppEmptyAlert';

function ViewPostScreen({ navigation }) {

  //refresh control 
  const [refreshing, setRefresshing] = useState(false);
  
  //set user id 
  const [ userid, setUserId ] = useState(null);

  //isLoading 
  const [ isLoading, setIsLoading ] = useState(true);
  
  //set posts 
  const [ userPosts, setPosts ] = useState([]);

  //check for networ connect ion
  const [ isConnect, setIsConnect ] = useState(true);
  
  checkConnect().then(res => {
    setIsConnect(res);
  })

  //perfrom refresh 
  const onRefresh = useCallback(() => {
    setRefresshing(true); 
    getAllPost();
    setRefresshing(false);
  })

    //chect firebase connection
    if (!firebase.apps.length) {
      console.log('Connected with Firebase')
      firebase.initializeApp(apiKeys.firebaseConfig);
    }

  //set user id
  useEffect(
    () => {
     firebase.auth().onAuthStateChanged((user) => {
      if(user){
        setUserId(user.uid);
      }else{
        setUserId(null);
      }
     });
   }
  );

  //call posts
  useEffect(
    () => {
      getAllPost();
    }
  )

   //get posts
   const getAllPost = async() => {
    let count = 0;
      
        const db = firebase.firestore();  
        var getPostValues = []; 
      await db.collection("posts").where("userId", "==", userid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
              count ++;
                //get data
                  getPostValues.push({
                    id: count,
                    postid: doc.data().postId,
                    title: doc.data().title,
                    description: doc.data().description,
                    image: doc.data().imgLink, 
                    date: doc.data().date,
                    date: doc.data().time,
                })
            });
        }).catch((e) => {
          setIsConnect(false);
        })
        setIsLoading(false)
          setPosts(getPostValues)
}

  //logout 
  const logout = async() => {
    try {
      await firebase.auth().signOut();
      navigation.navigate("SignIn")
      return () => ac.abort();
    } catch (err) {
      Alert.alert('There is something wrong!');
    }
  }

  
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5}}>
        <AppText
          bold
          size={27}
        >
          My Posts 
        </AppText>
        <TouchableOpacity onPress={() => logout()} style={{marginBottom: 5}}>
          <MaterialCommunityIcons 
              name="power"
              size={40}
              color="red"
          />
        </TouchableOpacity>
      </View>
       {
         !isConnect && <AppNetworkAlert title="No Internet" />
       } 
      
      {
        isLoading === true ?  <ActivityIndicator size={110} color="#008000"/> : 
      <FlatList 
        data={userPosts}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 20, paddingBottom: 45}}
        keyExtractor={userPosts => userPosts.id.toString()}
        renderItem={({item}) => (
          <AppCard 
            title={item.title}
            description={item.description}
            image={{uri: item.image}}
            titleSize={22}
            desSize={16}
            onPress={() => navigation.navigate("Open Post", 
                      {
                          title: item.title, 
                          description: item.description, 
                          image: item.image, 
                          postid: item.postid,
                          date: item.date, 
                          time: item.time
                      }
                    )}
          />
        )}
        onEndReached={() => setIsLoading(false)}
        ListEmptyComponent={
          <AppEmptyAlert />
        }
        refreshing={refreshing}
        onRefresh={() => onRefresh}
        progressViewOffset={20}
      />
                    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 15
  }
  
})

export default ViewPostScreen;