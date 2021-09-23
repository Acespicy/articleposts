import React from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from 'react-native';
import AppText from '../components/text/AppText';
import AppButton from '../components/form/AppButton';

function NoInternetScreen({ navigation, onPress }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="access-point-network-off"
        size={170}
        color="#008000"
      />
      <AppText
        bold
        style={{marginTop: 10}}
        size={25}
      >No connection detected!</AppText>
      <AppText
        size={18}
      >Check your internet connection</AppText>
      <AppButton 
        title="Retry"
        width={120}
        titleSize={22}
        backgroundColor="#008000"
        color="white"
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: "100%",
    height: "100%",
    backgroundColor: "white", 
    justifyContent: "center", 
    alignItems: 'center',
    position: "absolute",
  }
})

export default NoInternetScreen;