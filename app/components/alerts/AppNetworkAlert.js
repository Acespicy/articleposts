import React from 'react';
import { View } from 'react-native';

//app components
import AppText from '../text/AppText';

function AppNetworkAlert({ title }) {
  return (
    <View style={{ backgroundColor: "red", width: "100%", height: 20, borderRadius: 12, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
          <AppText
            color="white"
            bold
            style={{marginTop: 8}}
          >{title}</AppText>
        </View>
  );
}

export default AppNetworkAlert;