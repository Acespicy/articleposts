import React from 'react';
import { Image, View, StyleSheet, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//app custom components
import AppText from '../components/text/AppText';

function viewArticleScreen({ navigation, route }) {

  //route assign
  const fill = route.params;  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image 
          source={{uri: fill.image}}
          style={{width: "100%", height: "100%", resizeMode: "cover"}}
        />
      </View>
      <View style={styles.textBox}>
        <AppText
          bold
          size={27}
        >{fill.title}</AppText>
        <AppText
          bold
          size={20}
        >
          <MaterialCommunityIcons
            size={20}
            color="gray"
            name="tag"
          />
          <Text> {fill.name} </Text></AppText>

        <AppText
          style={{lineHeight: 24, textAlign: "justify"}}
        >
          {fill.description}
        </AppText>
        
        <AppText
          style={{lineHeight: 24, textAlign: "justify"}}
        >
          {fill.content}
        </AppText>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderTopColor: 'gray', borderTopWidth: 1, paddingTop: 10}}>
        <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons
                name="account"
                size={18}
                color="gray"
            />
            <AppText
              size={13}
              color="gray"
              bold
            > {fill.author}</AppText>
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
            > {fill.date}</AppText>
          </View>
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
    padding: 15, 
  }
})

export default viewArticleScreen;