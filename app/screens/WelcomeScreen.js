import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import AppButton from '../components/form/AppButton';
import AppText from '../components/text/AppText';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpg")}
        style={styles.bgImg}
        resizeMode="cover"
        blurRadius={6}
      >
        
        <AppText
          bold
          color="white"
          size={40}
        > 
          ABC Companies
        </AppText>
        
        <AppButton
          title="Get Started"
          backgroundColor="white"
          color="#008000"
          bold
          titleSize={25}
          width="50%"
          style={styles.button}
          onPress={() => navigation.navigate("Authent")}
        />

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImg: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  }, 
  button: {
    shadowColor: "#008000",
    shadowOffset: {
      width: 0, 
      height: 10
    }, 
    shadowOpacity: 0.5, 
    shadowRadius: 20, 
    elevation: 4
  },
  container: {
    flex: 1
  }
})

export default WelcomeScreen;