import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from '../firebase/Fire';

//app components
import AppText from '../components/text/AppText';
import AppButton from '../components/form/AppButton';

function RegistrationSuccessScreen({ navigation, route }) {
//route variable 
const fill = route.params; 

//on click sign
const clickSignIn = async () => {
  //signout 
  await firebase.auth().signOut();
  navigation.navigate("SignIn"); 
}

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="emoticon-happy-outline"
        size={180}
        color="#008000"
      />
      <AppText size={45} bold color="#008000" >Congratulations!</AppText>
      <AppText size={30} style={{marginTop: -8}} bold >{fill.fname} {fill.sname}</AppText>
      <AppText size={25} style={{marginTop: -12, marginBottom: 40}} >Registration Successfull</AppText>
      <AppButton title="Sign In" titleSize={22} backgroundColor="#008000" color="white" width={100} onPress={() => clickSignIn() } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default RegistrationSuccessScreen;