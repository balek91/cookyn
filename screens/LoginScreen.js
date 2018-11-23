import Axios from 'axios'
import React from 'react'
import { AsyncStorage, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { onSignIn } from '../components/Auth.js'
import ContentContainer from '../components/ContentContainer/index'
import HeaderContainer from '../components/HeaderContainer/index'
import TextCustom from '../components/TextCustom'
import InputText from '../components/TextInput/index'
import Touchable from '../components/Touchable/index'
import ViewContainer from '../components/ViewContainer/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import allTheActions from '../actions'


class Login extends React.Component {
  state = {
    login : false,
    prenom: null,
    username: '',
    password : ''
  }

  connexion = (id) => {
    const { actions } = this.props
    actions.user.connexion(id)
  }
  
	render(){
		return(
			<ViewContainer>
        <HeaderContainer titleText={'Connexion'}/>
        <ContentContainer>
          <KeyboardAwareScrollView behavior='padding' resetScrollToCoords={{x:0,y:0}} showsVerticalScrollIndicator={false} >
            <ViewContainer>
              <Image source={require('../assets/images/logo.png')} />
            </ViewContainer>
            <TextCustom text={'\n'}/>
            <InputText
            reference= {(input)=> this.login = input}
            placeholderText='Email/Username'
            width={300}
            autoCapitalize = {"none"}
            onChangeTextFunction={(username) => this.setState({username})}
            onSubmitEditingFunction={()=> this.password.focus()}
            />
            <InputText
            reference= {(input)=> this.password = input}
            placeholderText='Password'
            width={300}
            isPassword={true}
            onChangeTextFunction={(password) => this.setState({password})}
            />
            <Touchable
            text='Connexion'
            onPressFunction={() => this.Login()}
            widthTouchable={300}
            backgroundColorTouchable='#E88110'
            colorText='#FFF'
            />      
            <Touchable
            text='Skip for dev'
            onPressFunction={() =>  this.SignedIn()}
            widthTouchable={300}
            backgroundColorTouchable='#E88110'
            colorText='#FFF'
            />
            <TextCustom text={'\n'}/>
            <ViewContainer >
              <TextCustom text={'Vous n\'avez pas de compte ?'}/>
              <TextCustom text={'Inscrivez vous'} onPress={() => this.SignUp()} fontsize={17} fontweight={500}/>
              <TextCustom text={'\n'}/>
            </ViewContainer>
          </KeyboardAwareScrollView>
        </ContentContainer>
  		</ViewContainer>
			)
  }
  SignUp = () =>{
    this.props.navigation.push('SignUp');
  }
  
  SignedIn = () =>{
    this.storeData('1')
    this.props.navigation.navigate('SignedIn')
  }
  Login = () =>{
    body = {
      usernameUser: this.state.username,
      passwordUser : this.state.password
      }
    Axios.post('http://51.75.22.154:8080/Cookyn/user/Login', body).then(response => {
      if(response.data.idUser != null){
        this.storeData(response.data.idUser.toString())
        onSignIn().then(() => this.props.navigation.navigate('SignedIn'))
      }
    }).catch(() => {
      alert('Erreur dans l\'authentification')
    })
  }
  
  storeData = async (idUser) => {
    try {
      this.connexion(idUser)
      await AsyncStorage.setItem('idUser', idUser)
    } catch (error) {
      console.log(error)
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    allState : state
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    user: bindActionCreators(allTheActions.user, dispatch)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
