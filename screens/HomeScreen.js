import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import allTheActions from '../actions'

import ListItemElement from '../components/FlatListElement'
import ViewCustom from '../components/ViewContainer'

const StyledFlatList = styled.FlatList`
flex: 1;
width: 100%;
`

const StyledView = styled(ViewCustom)`
padding : 20px 0px 0px 0px;`




class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }
  componentDidMount() {
    this.props.actions.recette.getRecettes()

  }
  loadMoreContentAsync = async () => {
    const { limite, offset } = this.props

    this.props.actions.recette.getRecettes(offset + limite)
  }
  refreshContentAsync = async () => {
    this.props.actions.recette.getRecettes(0, true)
  }

  navigateToDetail = (recette) => {
    this.props.navigation.navigate('DetailRecette', { recette: recette })
  }

  keyExtractor = item => item.idRecette.toString()

  render() {
    const { recettes } = this.props
    return (
      <StyledView>
        {recettes ? (
          <StyledFlatList
            data={recettes}
            onEndReached={() => this.loadMoreContentAsync()}
            onEndReachedThreshold={0}
            keyExtractor={this.keyExtractor}
            refreshing={false}
            onRefresh={() => this.refreshContentAsync()}
            renderItem={({ item }) => (
              <ListItemElement textPrincipal={item.libelleRecette} textDetail={`Categorie : ${item.catRecette} / temps de prépartation : ${item.tempPrepaRecette}`} onPressFunction={() => { this.navigateToDetail(item) }} />
            )} />) : (null)}
      </StyledView>
    )
  }

}

const mapStateToProps = state => {
  return {
    recettes: state.recette.list,
    offset: state.recette.offset,
    limite: state.recette.limite,
    allState: state
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    recette: bindActionCreators(allTheActions.recette, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)