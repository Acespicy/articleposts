import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function AppInput({ iconName, ...otherProps }) {
  return (
    <View style={[styles.inputBox, {width: "100%"}]}>
      <MaterialCommunityIcons 
        name={iconName}
        size={30}
        style={{marginLeft: 5}}
        color="gray"
      />
      <TextInput
        style={{marginLeft: 6, fontSize: 20, width: "88%"}} 
        {...otherProps}
        color="black"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: "row", 
    borderColor: "gray", 
    borderWidth: 1,
    borderRadius: 20, 
    paddingHorizontal: 8, 
    paddingVertical: 8, 
    marginBottom: 16
  }
})

export default AppInput;