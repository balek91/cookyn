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

export default class ListRecetteCreationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
        title: 'Créations',
        headerLeft: (
            <BackButton onPress={() => navigation.state.params.backToProfil()} />
        )
    }
}
  state = {
    idUser: null,
    offset: 0,
    limite: 20,
    creationList : [],
  }
  

  render() {
    const { creationList } = this.state;

    
    return (
    <ViewCustom>
        {creationList ? (
          <StyledFlatList
            data={creationList}
            onEndReached={() => this.loadMoreContentAsync()}
            onEndReachedThreshold={0}
            keyExtractor={this.keyExtractor}
            renderItem={({ item }) => (
              <ListItemElement textPrincipal={item.libelleRecette} textDetail={`Categorie : ${item.catRecette} / temps de prépartation : ${item.tempPrepaRecette}`} onPressFunction={() => { this.navigateToDetail(item) }} />
            )} />) : (null)}
      </ViewCustom>
    );
  }
  keyExtractor = item => item.idRecette.toString()

  navigateToDetail = (recette) => {
    this.props.navigation.push('DetailRecette', { recette: recette })
  }

  loadMoreContentAsync = async () => {
    axios.get(`http://51.75.22.154:8080/Cookyn2/recette/GetListRecetteCreatedByUser/${this.state.idUser}/${this.state.offset+this.state.limite}`)
        .then(res => {
            this.setState({
              creationList: [...this.state.creationList , ...res.data.listRecette],
                offset : res.data.offset
            })
        })
}

  

  componentDidMount() {
    const { navigation } = this.props
    this.setState({
      idUser : navigation.getParam('idUser')
    })
    axios.get(`http://51.75.22.154:8080/Cookyn2/recette/GetListRecetteCreatedByUser/${navigation.getParam('idUser')}/${this.state.offset}`)
    .then(res => {
        this.setState({
          creationList: res.data.listRecette,
            limite : res.data.limite,
            offset : res.data.offset
        })
    })
}
}
