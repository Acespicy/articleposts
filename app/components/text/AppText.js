import React from 'react';
import { StyleSheet, Text } from 'react-native';

function AppText({ bold, children, color, style, onPress, size = 15, ...otherProps}) {
  return (
    <Text
      onPress={onPress}
      {...otherProps}
      style={[styles.textStyle, style, { fontSize: size, color: color, fontWeight: bold ? "bold" : "normal" }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 10
  }
})

export default AppText;