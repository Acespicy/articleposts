import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//app custom component
import AppText from '../text/AppText';

function AppButton({ backgroundColor = "#AFE1AF", color = 'black', onPress, style, titleSize, title, width = "100%", iconShown, iconColor = 'black'}) {
  return (
      <TouchableOpacity 
          style={[styles.button, style, {backgroundColor: backgroundColor, width: width, flexDirection: 'row', borderColor: "gray", borderWidth: 1}]
        }
        onPress={onPress}
        > 
          { iconShown && <MaterialCommunityIcons 
              name="chevron-left"
              size={35}
              color={iconColor}
          /> }

         {
           title && <AppText
           size={titleSize}
           bold
           color={color}
           style={{marginTop: 5}}
         >{title}</AppText>
         } 
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    padding: 5, 
    justifyContent: "center", 
    alignItems: "center"
  }
})

export default AppButton;