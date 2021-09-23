import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import AppText from '../text/AppText';

function AppCard({style, image, title, description, titleSize = 22, desSize = 16, onPress}) {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View style={[styles.cardBody, style]}>
        { image && <View style={{width: "100%", height: 180, marginBottom: 10, overflow: "hidden", paddingHorizontal: 1}}>
        <Image
            source={image}
            style={{width: "100%", height: "100%", borderTopLeftRadius: 7, borderTopRightRadius: 7, resizeMode: "cover" }}
          />
        </View>}
        
        <View style={{paddingHorizontal: 10}}>
          { title && <AppText
            bold
            size={titleSize}
            numberOfLines={1}
          >
            {title}
          </AppText>}

          { description && <AppText
            size={desSize}
            numberOfLines={2}
          >
          {description}
          </AppText>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardBody: {
    width: "100%", 
    borderRadius: 7,
    shadowColor: "black", 
    shadowOffset: {
      width: 0, height: 10
    }, 
    shadowOpacity: 0.6, 
    shadowRadius: 5, 
    elevation: 2, 
    height: 280, 
    marginBottom: 25, 
    overflow: "hidden"
  }
})

export default AppCard;