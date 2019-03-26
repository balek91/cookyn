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
import ModifyStepsScreen from '../screens/ModifyStepsScreen'
import ShoppingListScrenn from '../screens/ShoppingListScreen'
import NewsScreen from '../screens/NewsScreen'

const HomeStack = createStackNavigator({
  News : NewsScreen,
  Home: HomeScreen,
  DetailRecette : DetailRecetteScreen,
  ProfilUser: ProfilScreen,
  ModifyUser: ModifyUserScreen,
  ListRecetteFavori: ListRecetteFavoriScreen,
  ListUsers: ListUsersScreen,
  DetailRecette : DetailRecetteScreen,
  ListRecetteCreation : ListRecetteCreationScreen,
});


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => (
    focused ?
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/homeFocus.jpg')}
    /> :
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/home.jpg')}
    />
  )};

const AddStack = createStackNavigator({
  Add: AddScreen,
  ModifySteps: ModifyStepsScreen
});

AddStack.navigationOptions = {
  tabBarLabel: 'Add',
  tabBarIcon : ({focused}) =>(
    focused ?
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/addFocus.png')}
    /> :  <Image style={{ height: 26, width: 26 }}
    source={require('../assets/icons/add.png')}
  />
    )};

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
  tabBarIcon: ({focused}) =>(
    focused ?
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/profilFocus.jpg')}
    /> :  <Image style={{ height: 26, width: 26 }}
    source={require('../assets/icons/profil.jpg')}
  />  )
};

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({focused}) =>(
    focused ?
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/calandarFocus.jpg')}
    /> : <Image style={{ height: 26, width: 26 }}
    source={require('../assets/icons/calandar.jpg')}
  /> )
};


const ShoppingListStack = createStackNavigator({
  Shopping: ShoppingListScrenn,
});

ShoppingListStack.navigationOptions = {
  tabBarLabel: 'Shopping',
  tabBarIcon: ({focused}) =>(
    focused ?
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/shopFocus.jpg')}
    /> :  <Image style={{ height: 26, width: 26 }}
    source={require('../assets/icons/shop.jpg')}
  />)
};

export default createBottomTabNavigator({
  AddStack,
  HomeStack,
  ProfilStack,
  CalendarStack,
  ShoppingListStack
});
