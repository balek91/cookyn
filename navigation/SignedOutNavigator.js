import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen.js';
import SignUpScreen from '../screens/SignUpScreen.js';
import SignUpOkScreen from '../screens/SignUpOk.js';
const headeStyle = {
    margintop: Platform.OS ==='android' ? StatusBar.currentHeight : 0
};

export const LoginStack = createStackNavigator({
    Login:{
        screen: LoginScreen,
    navigationOptions: {
        header:null
    }
    }
  });

  LoginStack.navigationOptions = {
    tabBarLabel: 'Login'
  };


  export const SignUpStack = createStackNavigator({
    SignUpPage:{ 
        screen : SignUpScreen,
    navigationOptions : {
        header:null
    }},
    SignUpOk :{ 
        screen : SignUpOkScreen,
    navigationOptions : {
        header : null
    }}
  });

  export default createStackNavigator({
      SignIn : {screen: LoginStack,
    navigationOptions: {
       header: null
    }},
      SignUp : {screen : SignUpStack,
    navigationOptions : {
        header: null
    }}
  });




