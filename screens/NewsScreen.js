import React from 'react'
import Actu from '../components/News'
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
import userRecherche from '../reducers/userRecherche';




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
        actualite :[],
        user:null
    }
     navigateSearch =() => {
        this.props.navigation.push('Search')
     } 

     logout =() => {
        console.log('ici la deconnexion')
        this.removeData()
        

     } 
    
     removeData = async () => {
        try {
            const { actions } = this.props
            actions.user.deconnexion()
            //actions.userRecherche.clearUserRechercheRedux()
            //actions.recette.clearRecetteRedux()
           // actions.recetteRecherche.clearRecetteRechercheRedux()
           // actions.etape.clearEtapeRedux()
            actions.actualite.logout_actu()
            onSignOut().then(() => this.props.navigation.navigate('SignedOut'))

        } catch (error) {
          console.log(error)
        }
      }

      formateDate =(date) =>{
        var today = new Date(date)
        var monthSend = null
        var yearSend = today.getFullYear()
        var daySend=null
        if(today.getDate() <=9){
          daySend=`0${today.getDate()}`
        }else{
          daySend=today.getDate()
        }
        if(today.getMonth() +1 <=9){
          monthSend = `0${today.getMonth() +1}`
        } else {
          monthSend = today.getMonth()
        }

        var dateSend = `${yearSend}-${monthSend}-${daySend}`
        console.log(dateSend)
        return dateSend
      }

    componentDidMount =async ()=>{
      const { actions } = this.props
        var user = await AsyncStorage.getItem('idUser')
        this.setState({
            user:user
        })
        console.log('Useeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ',user)
        actions.actualite.getActualite(user,0,true)
    }
    

    keyExtractor = item => item.idActualite.toString()

    render(){
        const {actualite, actions} = this.props
        const {user} = this.state
        var tab = actualite.list
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
                      data={tab}
                      refreshing={false}
                      onRefresh={() => this.refreshContentAsync()}
                      onEndReached={() => this.loadMoreContentAsync()}
                      onEndReachedThreshold={0}
                      initialNumToRender={1000}
                      keyExtractor={this.keyExtractor}
                      renderItem={({ item }) => (
                        <Actu navigation={this.props.navigation} currentUser={user} idWho={item.what.idUser} who={item.what.usernameUser} idWhat={item.whoDto.id} what={item.whoDto.name} action={item.typeActualite} date={new Date(item.date)}></Actu>
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
      userRecherche : state.userRecherche,
      recette : state.recette,
      recetteRecherche : state.recetteRecherche,
      etape : state.etape,
      allState: state,
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    actions: {
      user: bindActionCreators(allTheActions.user, dispatch),
      actualite : bindActionCreators(allTheActions.actualite,dispatch),
      userRecherche :bindActionCreators(allTheActions.userRecherche,dispatch),
      recetteRechee : bindActionCreators(allTheActions.recetteRecherche,dispatch),
      etape : bindActionCreators(allTheActions.etape,dispatch),
      recette : bindActionCreators(allTheActions.recette,dispatch)
    }
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewsScreen)
  