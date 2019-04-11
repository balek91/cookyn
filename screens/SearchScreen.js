import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text, TouchableOpacity, Image, AsyncStorage, ScrollView,TextInput
} from 'react-native';
import Axios from 'axios'
import ListItemElement from '../components/FlatListElement'
import SegmentedControlTab from 'react-native-segmented-control-tab'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import allTheActions from '../actions'


import compare from '../utils/CompareDate'

import Calendar from 'react-native-calendar'
import styled from 'styled-components'
import ViewContainer from '../components/ViewContainer/index'


const StyledFlatList = styled.FlatList`
flex: 1;
width: 100%;
`

const GlobalView = styled.View`
flex : 1;`

const GlobalCenterView = styled.View`
alignItems : center;
`

const StyledView = styled(ViewContainer)`
padding : 50px 0px 0px 0px;
backgroundColor: rgba(52, 52, 52, 0.1)`

const Search = styled.TextInput`
height: 40;
width:100%; 
border-color: gray;
border-width: 1;
border-radius : 5;
padding-left : 10px;
 `

class SearchScreen extends React.Component {
  static navigationOptions = {
   title: 'Recherche'
  };
  state ={
    libelle:'', 
    offset : 0,
    limite : 20,
    selectedIndex: 0,
    placeholderSearch : 'Tapez le nom d\'une recette'
  }

  handleIndexChange = (index) => {
    const {libelle,offset} = this.state
    if(index == 0 )
    this.setState({
      selectedIndex: index,
      placeholderSearch : 'Tapez le nom d\'une recette'
    })
    else{
      this.setState({
        selectedIndex: index,
        placeholderSearch : 'Tapez le nom d\'un user'
      })
    }
  }

  componentDidMount() {
    const {libelle,offset} = this.state
   this.props.actions.recetteRecherche.getRecettes(libelle,offset,true)
   this.props.actions.userRecherche.getUsers(libelle,offset,true)

}

keyExtractorRecette = item => item.idRecette.toString()

keyExtractorUser = item => item.idUser.toString()


  searchByName =(input) =>{
    const {offset, selectedIndex} = this.state
    console.log(input)
    this.setState({libelle : input})
    clearTimeout(this.timer)
    this.timer = setTimeout(()=>{
        this.props.actions.recetteRecherche.getRecettes(input,offset,true)
        this.props.actions.userRecherche.getUsers(input,offset,true)
    }, 300)
  }

  refreshContentAsync = async () => {
    const {selectedIndex, offset, libelle} = this.state
    if(selectedIndex == 0){
      this.props.actions.recetteRecherche.getRecettes(libelle,offset,true)
    }else {
      this.props.actions.userRecherche.getUsers(libelle,offset,true)
    }

}

  loadMoreContentAsync = async () => {
    const {libelle, selectedIndex} = this.state
    const {offsetRecette, limiteRecette, offsetUser, limiteUser } = this.props
    if(selectedIndex == 0){
      const value = offsetRecette+limiteRecette
      this.props.actions.recetteRecherche.getRecettes(libelle,value,false)
    }else {
      const value = offsetUser+limiteUser
      this.props.actions.userRecherche.getUsers(libelle,value,false)
    }
}


onPressRecette = (recette) => {
  this.props.navigation.navigate('DetailRecette', { recette: recette })
}

onPressUser = (user) => {
  this.props.actions.user.getUserConnect(user.idUser)
  this.props.navigation.navigate('ProfilUser', { contact: user.idUser })
}

  render() {
   
  const {listRecette, listUser} = this.props
  const {selectedIndex, placeholderSearch} = this.state
    return (
      <GlobalView>
      <GlobalCenterView>

       <Search
        
        onChangeText={this.searchByName}
        placeholder = {placeholderSearch}
      />
      </GlobalCenterView>
      <SegmentedControlTab
                    values={['Recette', 'User']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    />
                    {selectedIndex == 0 ? 
                    (                    
                      <GlobalView>
                        {listRecette ? (
                        <StyledFlatList
                        data={listRecette}
                        keyExtractor={this.keyExtractorRecette}
                        onEndReached={(input) => this.loadMoreContentAsync()}
                        onEndReachedThreshold={0}
                        refreshing={false}
                        onRefresh={() => this.refreshContentAsync()}
                        renderItem={({ item }) => (
                            <ListItemElement textPrincipal={item.libelleRecette} textDetail={`Catégorie : ${item.catRecette}`} onPressFunction={() => { this.onPressRecette(item) }} />
                        )} />) : (null)}
                    </GlobalView>
                    ): (<GlobalView>
                        {listUser ? (
                        <StyledFlatList
                        data={listUser}
                        keyExtractor={this.keyExtractorUser}
                        onEndReached={(input) => this.loadMoreContentAsync()}
                        onEndReachedThreshold={0}
                        refreshing={false}
                        onRefresh={() => this.refreshContentAsync()}
                        renderItem={({ item }) => (
                            <ListItemElement textPrincipal={item.usernameUser} textDetail={`${item.nomUser} ${item.prenomUser}`} onPressFunction={() => { this.onPressUser(item) }} />
                        )} />) : (null)}
                    </GlobalView>)



                    }

      </GlobalView>
    )
  }
}

const mapStateToProps = state => {
  return {
      listRecette: state.recetteRecherche.list,
      offsetRecette : state.recetteRecherche.offset,
      limiteRecette : state.recetteRecherche.limite,
      listUser: state.userRecherche.list,
      offsetUser : state.userRecherche.offset,
      limiteUser : state.userRecherche.limite,
      allState: state
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
      recetteRecherche: bindActionCreators(allTheActions.recetteRecherche, dispatch),
      userRecherche: bindActionCreators(allTheActions.userRecherche, dispatch),
      user : bindActionCreators(allTheActions.user, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen)