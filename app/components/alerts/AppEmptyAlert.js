import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from '../text/AppText';

function AppEmptyAlert(props) {
  return (
    <View style={styles.container}> 
      <MaterialCommunityIcons 
          name="database"
          size={140}
          color="gray"
      />
      <AppText
        size={50}
        bold
        color="#008000"
      >Ooops!!!</AppText>
      <AppText
        size={20}
        style={{textAlign: 'center'}}
      >There are no contents in to display!</AppText>
      <AppText
        size={20}
        bold
      >
        <MaterialCommunityIcons
            name="refresh"
            size={30}
            style={{marginTop: 10, marginRight: 5}}
        /> 
         <Text> Pull to refresh </Text>
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    width: "100%", 
    height: "100%", 
  }
})

export default AppEmptyAlert;