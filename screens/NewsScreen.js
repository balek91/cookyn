import React from 'react'
import News from '../components/News'
import {ImageBackground, Button, Text, View,Image, TouchableOpacity, AsyncStorage} from 'react-native'
import ContentContainer from '../components/ContentContainer/index'
import styled from 'styled-components'
import ViewContainer from '../components/ViewContainer/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Axios from 'axios';
import { onSignOut } from '../components/Auth.js'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import allTheActions from '../actions'




const StyledView = styled(ViewContainer)`
padding : 0px 0px 0px 0px;
backgroundColor: rgba(52, 52, 52, 0.1);
flex:1;`


const HeaderView = styled.View`
background-color : white;
height:65;
width:100%;
margin-bottom : 5px;
flex-direction : row;
padding-top : 25px;
`

const HeaderLeftView = styled.View`
flex:1;
align-items: flex-start;
margin-left:10;
`

const HeaderRightView = styled.View`
flex:1;
align-items: flex-end;
margin-right:10;
`

const StyledFlatList = styled.FlatList`
flex: 1;
width: 100%;
`

class NewsScreen extends React.Component {
    static navigationOptions = {
        header : null
    }

    state ={
        actualite :[]
    }
     navigateSearch =() => {
        this.props.navigation.push('Search')
     } 

     logout =() => {
        console.log('ici la deconnexion')
        this.removeData()
        onSignOut().then(() => this.props.navigation.navigate('SignedOut'))

     } 
    
     removeData = async () => {
        try {
            const { actions } = this.props
            actions.user.deconnexion()
          await AsyncStorage.removeItem('idUser')
        } catch (error) {
          console.log(error)
        }
      }

    componentDidMount =async ()=>{
      const { actions } = this.props
        var user = await AsyncStorage.getItem('idUser')

        console.log('Useeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ',user)
        actions.actualite.getActualite(user,0,false)
    }

    keyExtractor = item => item.idActualite.toString()

    render(){
        const {actualite} = this.props
        console.log(actualite)
        return(<StyledView>
                    <ImageBackground source={require('../assets/images/homeBack.jpg')} style={{width: '100%', height: '100%'}}>
                    <ContentContainer>
                    <HeaderView>
                        <HeaderLeftView>
                            <TouchableOpacity onPress={this.logout}>
                            <Image source={require('../assets/icons/logout.png')} style={{height:25, width:25}} >
                            </Image>
                            </TouchableOpacity>
                        </HeaderLeftView>
                        <HeaderRightView>
                            <TouchableOpacity onPress={this.navigateSearch}>
                            <Image source={require('../assets/icons/loupe.png')} style={{height:25, width:25}} >
                            </Image>
                            </TouchableOpacity>
                        </HeaderRightView>
                    </HeaderView>
                    <StyledFlatList
                      data={actualite.list}
                      refreshing={false}
                      onRefresh={() => this.refreshContentAsync()}
                      onEndReached={() => this.loadMoreContentAsync()}
                      onEndReachedThreshold={0}
                      initialNumToRender={7}
                      keyExtractor={this.keyExtractor}
                      renderItem={({ item }) => (
                        <News idWho={item.user.idUser} who={item.user.prenomUser} idWhat={item.idWhat} what={'Les cousins'} action={item.typeActualite} date={new Date(item.date)}></News>
                      )} />
         
            </ContentContainer>
           </ImageBackground>
            </StyledView>
           
        )
    }


    refreshContentAsync = async () =>{
      const {actualite, actions} = this.props
      var user = await AsyncStorage.getItem('idUser')
      actions.actualite.getActualite(user,0,true)

    }

    loadMoreContentAsync = async () => {
      const {actualite, actions} = this.props
      var user = await AsyncStorage.getItem('idUser')
      actions.actualite.getActualite(user,actualite.offset+actualite.limite,false)
  }
}


const mapStateToProps = state => {
    return {
      user: state.user,
      actualite : state.actualite,
      allState: state,
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    actions: {
      user: bindActionCreators(allTheActions.user, dispatch),
      actualite : bindActionCreators(allTheActions.actualite,dispatch)
    }
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewsScreen)
  