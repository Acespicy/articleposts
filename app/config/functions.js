import React from 'react';
import NetInfo from '@react-native-community/netinfo';

export  const checkConnect = () =>  {
    return NetInfo.fetch().then(state => {
      return state.isConnected;
    })
  }