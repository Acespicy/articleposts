import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from "expo-constants";
import firebase from '../firebase/Fire';

//app components
import AppCard from '../components/card/AppCard';
import AppText from '../components/text/AppText';
import { checkConnect } from '../config/functions';
import AppNetworkAlert from '../components/alerts/AppNetworkAlert';
import AppEmptyAlert from '../components/alerts/AppEmptyAlert';

function ArticlesScreen({ navigation }) {

  //refresh control 
  const [refreshing, setRefresshing] = useState(false);

  //check for networ connect 
  const [ isConnect, setIsConnect ] = useState(true);
  
  //isLoading 
  const [ isLoading, setIsLoading ] = useState(true);

  //get all article
  const [data, setData] = useState([]);

  const onRefresh = useCallback(() => {
    setRefresshing(true); 
    getArticles();
    setRefresshing(false);
  })

  checkConnect().then(res => {
    setIsConnect(res);
  }) 

  const getArticles = async () => {
     try {
      const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2021-08-22&sortBy=publishedAt&apiKey=9b623a82db90411da0dfe1f9f5bafb34');
      const json = await response.json();
      setData(json.articles.slice(0, 10));
    } catch (error) {
      setIsConnect(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

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
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15}}>
      <AppText
        bold
        size={27}
      >
        Articles
      </AppText>
        <TouchableOpacity onPress={() => logout()}>
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
        data={data}
        keyExtractor={data => data.publishedAt.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 20, paddingBottom: 45}}
        renderItem={({item}) => (
          <AppCard 
            title={item.title}
            description={item.description}
            image={{uri: item.urlToImage}}
            titleSize={22}
            desSize={16}
            onPress={() => navigation.navigate("Open Article", {
                title: item.title, 
                description: item.description, 
                image: item.urlToImage, 
                date: item.publishedAt,
                name: item.source.name, 
                author: item.author, 
                content: item.content
            })}
          />
        )}
        onEndReached={() => setIsLoading(false)}
        ListEmptyComponent={
          <AppEmptyAlert />
        }
        refreshing={refreshing}
        onRefresh={() => onRefresh()}
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

export default ArticlesScreen;