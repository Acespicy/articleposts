import React from 'react';
import { View } from 'react-native';

//app components
import AppButton from '../form/AppButton';
import AppText from './AppText';

function AppHeader({title, backgroundColor, onPress}) {
  return (

    <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
      <AppButton
        width={50}
        style={{borderRadius: 10, marginRight: "20%"}}
        backgroundColor={backgroundColor}
        iconShown
        onPress={onPress}
      />
      <AppText
        bold
        size={25}
      >
        {title}
      </AppText>
    </View>
  );
}

export default AppHeader;