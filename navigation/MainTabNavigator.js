import React from 'react'
import { Image, Platform, StatusBar } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import AddScreen from '../screens/AddScreen'
import CalendarScreen from '../screens/CalendarScreen'
import HomeScreen from '../screens/HomeScreen'
import ListRecetteScreen from '../screens/ListRecetteScreen'
import ListUsersScreen from '../screens/ListUsersScreen'
import ModifyUserScreen from '../screens/ModifyUserScreen'
import ProfilScreen from '../screens/ProfilScreen'

const headeStyle = {
  margintop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
};

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen, navigationOptions: {
      title: null,
    }
  }
});


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: (
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/home.png')}
    />),

};

const AddStack = createStackNavigator({
  Add: AddScreen,
});

AddStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon: (
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/addblue.png')}
    />),
};

const ProfilStack = createStackNavigator({
  Profil: ProfilScreen,
  ProfilUser: ProfilScreen,
  ModifyUser: ModifyUserScreen,
  ListRecette: ListRecetteScreen,
  ListUsers: ListUsersScreen
});

ProfilStack.navigationOptions = {
  tabBarLabel: 'Profil',
  tabBarIcon: (
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/profil.png')}
    />),
};

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: (
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/calendrier.png')}
    />),
};

export default createBottomTabNavigator({
  AddStack,
  HomeStack,
  ProfilStack,
  CalendarStack,
});
