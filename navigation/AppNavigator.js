import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import Connected from './MainTabNavigator';
import NotConnected from './SignedOutNavigator';


export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
    SignedIn: 
    {
      screen: Connected
    },
  SignedOut:{
    screen : NotConnected
  }},
  {initialRouteName: signedIn ? "SignedIn" : "SignedOut"});
};

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  SignedIn: 
  {
    screen: Connected
  },
  SignedOut:{
    screen : NotConnected
  } 
  
});