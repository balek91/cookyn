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
import SearchScreen from '../screens/SearchScreen'

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
  Search : SearchScreen,
})


HomeStack.navigationOptions = {
  tabBarLabel: 'Accueil',
  tabBarIcon: ({focused}) => (
    focused ?
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/homeFocus.jpg')}
    /> :
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/home.jpg')}
    />
  )}

const AddStack = createStackNavigator({
  Add: AddScreen,
  ModifySteps: ModifyStepsScreen
})

AddStack.navigationOptions = {
  tabBarLabel: 'Ajouter',
  tabBarIcon : ({focused}) =>(
    focused ?
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/addFocus.png')}
    /> :  <Image style={{ height: 26, width: 26 }}
    source={require('../assets/icons/add.png')}
  />
    )}

const ProfilStack = createStackNavigator({
  Profil: ProfilScreen,
  ProfilUser: ProfilScreen,
  ModifyUser: ModifyUserScreen,
  ListRecetteFavori: ListRecetteFavoriScreen,
  ListUsers: ListUsersScreen,
  DetailRecette : DetailRecetteScreen,
  ListRecetteCreation : ListRecetteCreationScreen
})

ProfilStack.navigationOptions = {
  tabBarLabel: 'Profil',
  tabBarIcon: ({focused}) =>(
    focused ?
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/profilFocus.jpg')}
    /> :  <Image style={{ height: 26, width: 26 }}
    source={require('../assets/icons/profil.jpg')}
  />  )
}

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
  DetailRecette : DetailRecetteScreen,
  Profil: ProfilScreen,
  ProfilUser: ProfilScreen,
  ModifyUser: ModifyUserScreen,
  ListRecetteFavori: ListRecetteFavoriScreen,
  ListUsers: ListUsersScreen,
  DetailRecette : DetailRecetteScreen,
  ListRecetteCreation : ListRecetteCreationScreen
})

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendrier',
  tabBarIcon: ({focused}) =>(
    focused ?
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/calendarFocus.png')}
    /> : <Image style={{ height: 26, width: 26 }}
    source={require('../assets/icons/calendar.png')}
  /> )
}


const ShoppingListStack = createStackNavigator({
  Shopping: ShoppingListScrenn,
})

ShoppingListStack.navigationOptions = {
  tabBarLabel: 'Courses',
  tabBarIcon: ({focused}) =>(
    focused ?
    <Image style={{ height: 26, width: 26 }}
      source={require('../assets/icons/panierorange.png')}
    /> :  <Image style={{ height: 26, width: 26 }}
    source={require('../assets/icons/panier.png')}
  />)
}

export default createBottomTabNavigator({
  HomeStack,
  AddStack,
  ProfilStack,
  CalendarStack,
  ShoppingListStack
})
