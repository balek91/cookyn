import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text, TouchableOpacity, Image, AsyncStorage, ScrollView,TextInput
} from 'react-native';
import Axios from 'axios'
import ListItemElement from '../components/FlatListElement'


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

const StyledView = styled(ViewContainer)`
padding : 50px 0px 0px 0px;
backgroundColor: rgba(52, 52, 52, 0.1)`

class SearchScreen extends React.Component {
  static navigationOptions = {
   title: "Recherche"
  };
  state ={
    libelle:'', 
    libelleTest:'casca',
    recettes: [],
    offset : 0,
    limite : 20
  }

  componentDidMount() {
    const {libelle,offset} = this.state


   this.props.actions.recetteRecherche.getRecettes(libelle,offset,true)
}

keyExtractor = item => item.idRecette.toString()


  getRecetteByName =(input) =>{
    const {libelleTest,offset} = this.state
    console.log(input)
    this.setState({libelle : input})
    clearTimeout(this.timer)
    this.timer = setTimeout(()=>{
      this.props.actions.recetteRecherche.getRecettes(input,offset,true)
    }, 300)
  }

  refreshContentAsync = async () => {
    console.log('ok')
}

  loadMoreContentAsyncRecette = async () => {
    const {libelle} = this.state
    const {offset, limite} = this.props

const value = offset+limite
console.log('tessst', value)


    this.props.actions.recetteRecherche.getRecettes(libelle,value,false)

}


onPress = (recette) => {
  this.props.navigation.navigate('DetailRecette', { recette: recette })
}

  render() {
   
  const {list} = this.props
    return (
      <View style={{flex:1,paddingTop:20, alignItems:"center"}}>

       <TextInput
        style={{height: 40, width:200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={this.getRecetteByName}
        value={this.state.text}
        placeholder = {"Tapez le nom d'une recette"}
      />
                    {list ? (
                        <StyledFlatList
                        data={list}
                        keyExtractor={this.keyExtractor}
                        onEndReached={(input) => this.loadMoreContentAsyncRecette()}
                        onEndReachedThreshold={0}
                        renderItem={({ item }) => (
                            <ListItemElement textPrincipal={item.libelleRecette} textDetail={`Catégorie : ${item.catRecette}`} onPressFunction={() => { this.onPress(item) }} />
                        )} />) : (null)}
       </View>
    )
  }
}

const mapStateToProps = state => {
  return {
      list: state.recette.list,
      offset : state.recette.offset,
      limite : state.recette.limite,
      allState: state
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
      recetteRecherche: bindActionCreators(allTheActions.recetteRecherche, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen)