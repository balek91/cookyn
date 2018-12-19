import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import AddScreen from '../screens/AddScreen'
import CalendarScreen from '../screens/CalendarScreen'
import HomeScreen from '../screens/HomeScreen'
import ListRecetteFavoriScreen from '../screens/ListRecetteFavoriScreen'
import ListRecetteCreationScreen from '../screens/ListRecetteCreationScreen'
import ListUsersScreen from '../screens/ListUsersScreen'
import ModifyUserScreen from '../screens/ModifyUserScreen'
import ProfilScreen from '../screens/ProfilScreen'
import DetailRecetteScreen from '../screens/DetailRecetteScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  DetailRecette : DetailRecetteScreen
  
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
  ListRecetteFavori: ListRecetteFavoriScreen,
  ListUsers: ListUsersScreen,
  DetailRecette : DetailRecetteScreen,
  ListRecetteCreation : ListRecetteCreationScreen
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
