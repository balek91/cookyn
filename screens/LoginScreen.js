import Axios from 'axios'
import React from 'react'
import { AsyncStorage, Image, ImageBackground } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { onSignIn } from '../components/Auth.js'
import ContentContainer from '../components/ContentContainer/index'
import TextCustom from '../components/TextCustom'
import InputText from '../components/TextInput/index'
import Touchable from '../components/Touchable/index'
import ViewContainer from '../components/ViewContainer/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import allTheActions from '../actions'
import styled from 'styled-components'
import img from '../assets/images/home.jpg'

const StyledView = styled(ViewContainer)`
padding : 0px 0px 0px 0px;
backgroundColor: rgba(52, 52, 52, 0.1)`

const ViewCustom = styled.View`
padding-top : 25px;
align-items : center;
`

class Login extends React.Component {

  static navigationOptions = {
    header : null
}

  state = {
    login: false,
    password: '',
    prenom: null,
    username: '',
  }

  connexion = (id) => {
    const { actions } = this.props
    actions.user.connexion(id)
  }

  render() {
    return (
      <StyledView>
        <ImageBackground source={require('../assets/images/home.jpg')} style={{width: '100%', height: '100%'}}>
        <ContentContainer>
        <KeyboardAwareScrollView behavior='padding' resetScrollToCoords={{ x: 0, y: 0 }} showsVerticalScrollIndicator={false} >
            <ViewCustom>
              <Image source={require('../assets/images/logo.png')} />
            </ViewCustom>
            <TextCustom text={'\n'} />
            <InputText
              reference={(input) => this.login = input}
              placeholderText='Email/Username'
              width={300}
              autoCapitalize={"none"}
              onChangeTextFunction={(username) => this.setState({ username })}
              onSubmitEditingFunction={() => this.password.focus()}
            />
            <InputText
              reference={(input) => this.password = input}
              placeholderText='Password'
              width={300}
              isPassword={true}
              onChangeTextFunction={(password) => this.setState({ password })}
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
              onPressFunction={() => this.SignedIn()}
              widthTouchable={300}
              backgroundColorTouchable='#E88110'
              colorText='#FFF'
            />
            <TextCustom text={'\n'} />
            <ViewContainer style={{backgroundColor:'rgba(52, 52, 52, 0.1)' }} >
              <TextCustom color={'white'} text={'Vous n\'avez pas de compte ?'} fontsize={17}  />
              <TextCustom color={'white'} text={'Inscrivez vous'} onPress={() => this.SignUp()} fontsize={17} fontweight={800} />
              <TextCustom text={'\n'} />
            </ViewContainer>
          </KeyboardAwareScrollView>
        </ContentContainer>
        </ImageBackground>
      </StyledView>
    )
  }
  SignUp = () => {
    this.props.navigation.push('SignUp')
  }

  signUpOk = () => {
    this.props.navigation.navigate('SignUpOk')
  }

  SignedIn = () => {
    this.storeData('1')
    this.props.navigation.navigate('SignedIn')
  }
  Login = () => {
    let body = {
      usernameUser: this.state.username,
      passwordUser: this.state.password
    }
    Axios.post('http://51.75.22.154:8080/Cookyn/user/Login', body).then(response => {
      if (response.data.idUser != null) {
        this.storeData(response.data.idUser.toString())
        onSignIn().then(() => this.props.navigation.navigate('SignedIn'))
      } else {
        alert('Erreur dans l\'authentification')
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
    allState: state
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
