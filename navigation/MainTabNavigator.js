import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {Image} from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ProfilScreen from '../screens/ProfilScreen';
import CalendarScreen from '../screens/CalendarScreen';

import {learnColour} from '../assets/images';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
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
