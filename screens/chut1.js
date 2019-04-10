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

class SearchScreen extends React.Component {
  static navigationOptions = {
   title: 'Recherche'
  };
  state ={
    libelle:'', 
    offset : 0,
    limite : 20,
    selectedIndex: 0,
  }

  handleIndexChange = (index) => {
    console.log('index', index)
    this.setState({
      selectedIndex: index
    })
  }

  componentDidMount() {
    const {libelle,offset} = this.state
   this.props.actions.recetteRecherche.getRecettes(libelle,offset,true)
 //  this.props.actions.userRecherche.getUsers(libelle,offset,true)

}

keyExtractorRecette = item => item.idRecette.toString()

keyExtractorUser = item => item.idUser.toString()


  searchByName =(input) =>{
    const {offset} = this.state
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
    const {offsetRecette, limiteRecette } = this.props

const value = offsetRecette+limiteRecette
console.log('tessst', value)


    this.props.actions.recetteRecherche.getRecettes(libelle,value,false)

}


onPress = (recette) => {
  this.props.navigation.navigate('DetailRecette', { recette: recette })
}

  render() {
   
  const {listRecette, listUser} = this.props
  const {selectedIndex} = this.state
    return (
      <GlobalView>
      <GlobalCenterView>

       <TextInput
        style={{height: 40, width:'99%', borderColor: 'gray', borderWidth: 1}}
        onChangeText={this.searchByName}
        placeholder = {"Tapez le nom d'une recette"}
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
                        onEndReached={(input) => this.loadMoreContentAsyncRecette()}
                        onEndReachedThreshold={0}
                        renderItem={({ item }) => (
                            <ListItemElement textPrincipal={item.libelleRecette} textDetail={`Catégorie : ${item.catRecette}`} onPressFunction={() => { this.onPress(item) }} />
                        )} />) : (
                          <StyledFlatList
                        data={listRecette}
                        keyExtractor={this.keyExtractorRecette}
                        onEndReached={(input) => this.loadMoreContentAsyncRecette()}
                        onEndReachedThreshold={0}
                        renderItem={({ item }) => (
                            <ListItemElement textPrincipal={item.libelleRecette} textDetail={`Catégorie : ${item.catRecette}`} onPressFunction={() => { this.onPress(item) }} />
                        )} />

                        )}
                    </GlobalView>
                    ): (null)



                    }

      </GlobalView>
    )
  }
}

const mapStateToProps = state => {
  return {
      listRecette: state.recette.list,
      offsetRecette : state.recette.offset,
      limiteRecette : state.recette.limite,
      listUser: state.user.list,
      offsetUser : state.user.offset,
      limiteUser : state.user.limite,
      allState: state
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
      recetteRecherche: bindActionCreators(allTheActions.recetteRecherche, dispatch),
      userRecherche: bindActionCreators(allTheActions.userRecherche, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen)