import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {Image} from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ProfilScreen from '../screens/ProfilScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ModifyUserScreen from '../screens/ModifyUserScreen';
import ListRecetteScreen from '../screens/ListRecetteScreen';
import ListUsersScreen from '../screens/ListUsersScreen';
import CameraModule from '../components/Camera.js';

import {learnColour} from '../assets/images';
const headeStyle = {
  margintop: Platform.OS ==='android' ? StatusBar.currentHeight : 0
};

const HomeStack = createStackNavigator({
  Home: {screen : HomeScreen, navigationOptions : {
    title: "Ajout",
  }}
  
});


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: (
    <Image style={{height:26, width:26}}
           source={require('../assets/icons/home.png')}
    />),
    
};

const AddStack = createStackNavigator({
  Add: AddScreen,
 // Camera : CameraModule,
  
});

AddStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon: (
    <Image style={{height:26, width:26}}
           source={require('../assets/icons/addblue.png')}
           />),
};

const ProfilStack = createStackNavigator({
  Profil: ProfilScreen,
  ProfilUser: ProfilScreen,
  ModifyUser : ModifyUserScreen,
  ListRecette : ListRecetteScreen,
  ListUsers : ListUsersScreen
});

ProfilStack.navigationOptions = {
  tabBarLabel: 'Profil',
  tabBarIcon: (
    <Image style={{height:26, width:26}}
           source={require('../assets/icons/profil.png')}
           />),
};

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: (
    <Image style={{height:26, width:26}}
           source={require('../assets/icons/calendrier.png')}
           />),
};

export default createBottomTabNavigator({
  AddStack,
  HomeStack,
  ProfilStack, 
  CalendarStack,
});
