import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import ListItemElement from '../components/FlatListElement'
import ViewCustom from '../components/ViewContainer'
import BackButton from '../components/BackButton'


const StyledFlatList = styled.FlatList`
flex: 1;
width: 100%;
`
export default class ListRecetteFavoriScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
        title:'Favoris',
        headerLeft: (
            <BackButton onPress={() => navigation.state.params.backToProfil()} />
        )
    }
}

  state = {
    idUser: null,
    offset: 0,
    limite: 20,
    favoriList : [],
  }
  

  render() {
    const { favoriList } = this.state;

    
    return (
    <ViewCustom>
        {favoriList ? (
          <StyledFlatList
            data={favoriList}
            onEndReached={() => this.loadMoreContentAsync()}
            onEndReachedThreshold={0}
            keyExtractor={this.keyExtractor}
            renderItem={({ item }) => (
              <ListItemElement textPrincipal={item.recette.libelleRecette} textDetail={`Categorie : ${item.recette.catRecette} / temps de prépartation : ${item.recette.tempPrepaRecette}`} onPressFunction={() => { this.navigateToDetail(item.recette) }} />
            )} />) : (null)}
      </ViewCustom>
    );
  }
  keyExtractor = item => item.idFavoris.toString()

  navigateToDetail = (recette) => {
    this.props.navigation.push('DetailRecette', { recette: recette })
  }

  loadMoreContentAsync = async () => {
    const { navigation } = this.props
    axios.get(`http://51.75.22.154:8080/Cookyn/favoris/GetlistFavorisByUser/${this.state.idUser}/${this.state.offset+this.state.limite}`)
        .then(res => {
            this.setState({
              favoriList: [...this.state.favoriList , ...res.data.listFavoris],
                offset : res.data.offset
            })
        })
}

  

  componentDidMount() {
    const { navigation } = this.props
    this.setState({
      idUser : navigation.getParam('idUser')
    })
    axios.get(`http://51.75.22.154:8080/Cookyn/favoris/GetlistFavorisByUser/${navigation.getParam('idUser')}/${this.state.offset}`)
    .then(res => {
        this.setState({
            favoriList: res.data.listFavoris,
            limite : res.data.limite,
            offset : res.data.offset
        })
    })
}
}