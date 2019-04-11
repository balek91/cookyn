import { Image, ImageBackground} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Axios from 'axios'
import ContentContainer from '../components/ContentContainer'
import InputText from '../components/TextInput'
import React from 'react'
import styled from 'styled-components'
import TextCustom from '../components/TextCustom'
import Touchable from '../components/Touchable'
import ViewContainer from '../components/ViewContainer'


const StyledView = styled(ViewContainer)`
padding : 20px 0px 0px 0px;
backgroundColor: rgba(52, 52, 52, 0.1)`

const ForgotPasswordText =  styled(TextCustom)`
font-style : italic;
`

const ForgotPasswordView = styled.View
`
backgroundColor: rgba(52, 52, 52, 0.1)
align-items: center;
`

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: '',
  }

  state = {
      nom : '',
      prenom : '',
      mail : '',
      ville : '', 
      user : '',
      password : '',
      confirmPassword : '',
      borderColorPassword : 'gray',
      statusPassword :false,
      borderColorConfirmPassword : 'gray',
      statusConfirmPassword : false,
      borderColorEmail : 'gray',
      statusEmail : false
    }
 
 render(){
  return(
    <ViewContainer>
  <ImageBackground source={require('../assets/images/home.jpg')} style={{width: '100%', height: '100%'}}>
      <ContentContainer>
        <KeyboardAwareScrollView resetScrollToCoords={{x:0,y:0}} showsVerticalScrollIndicator={false} >
          <StyledView>
            <Image source={require('../assets/images/logo.png')} />
          </StyledView>
          <TextCustom text={'\n'}></TextCustom>
          <InputText
          onChangeTextFunction={(user) => this.setState({user})}
          placeholderText='Username'
          onSubmitEditingFunction={()=> this.nom.focus()}
          reference={(input)=> this.user = input}
          radius={0}
          />
          <InputText
          onChangeTextFunction={(nom) => this.setState({nom})}
          placeholderText='Nom'
          onSubmitEditingFunction={()=> this.prenom.focus()}
          reference={(input)=> this.nom = input}
          />
          <InputText
          onChangeTextFunction={(prenom) => this.setState({prenom})}
          placeholderText='Prenom'
          onSubmitEditingFunction={()=> this.mail.focus()}
          reference={(input) => this.prenom = input}
          />
          <InputText
          reference={(input) => this.mail = input}
          onChangeTextFunction={(mail) => this.regexMail(mail)}
          placeholderText='Mail'
          onSubmitEditingFunction={()=> this.ville.focus()}
          autoCapitalize = 'none'
          keyboard='email-address'
          bordercolor= {this.state.borderColorEmail}
          /> 
          <InputText
          reference= {(input) => this.ville = input}
          onChangeTextFunction={(ville) => this.setState({ville})}
          placeholderText='Ville'
          onSubmitEditingFunction={()=> this.password.focus()}
          /> 

<ForgotPasswordView  >
              <ForgotPasswordText color={'white'} text={`il faut au moins une majuscule`} 
              fontStyle={'italic'} fontsize={17}   />
               <ForgotPasswordText color={'white'} text={`et 8 caractères`} 
              fontStyle={'italic'} fontsize={17}  />
            </ForgotPasswordView>
          <InputText
          reference= {(input) => this.password = input}
          onChangeTextFunction={(password) => this.regexPassword(password)}
          placeholderText='Mot de passe'
          isPassword = {true}
          bordercolor = {this.state.borderColorPassword}
          onSubmitEditingFunction={()=> this.confirm.focus()}
          /> 

           
          <InputText
          reference= {(input) => this.confirm = input}
          onChangeTextFunction={(confirmPassword) => this.verifPassword(confirmPassword)}
          placeholderText='Confirmer le mot de passe'
          isPassword = {true}
          bordercolor = {this.state.borderColorConfirmPassword}
          />   
          <Touchable
            text={'S\'inscrire'}
            onPressFunction={this.createAccount}
            widthTouchable={300}
            backgroundColorTouchable='#E88110'
            colorText='#FFF'
          />
        </KeyboardAwareScrollView>
      </ContentContainer>
      </ImageBackground>
    </ViewContainer>
    )
}

regexMail = (email) =>{
  this.setState({
    mail : email
  })
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if(re.test(email)){
    this.setState({
      borderColorEmail : 'green',
      statusEmail : true
  });
   }else{
    this.setState({
      borderColorEmail : 'red',
      statusEmail: false
  });
   }
}

 regexPassword = (Pass) =>{
  this.setState({
    password : Pass
  })
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
   if(re.test(Pass)){
    this.setState({
      borderColorPassword : 'green',
      statusPassword : true
  });
   }else{
    this.setState({
      borderColorPassword : 'red',
      statusPassword : false
  });
   }
}

verifPassword = (confirmPassword1) =>{
  console.log(this.state.confirmPassword)
  console.log(confirmPassword1)
  this.setState({
    confirmPassword : confirmPassword1
  })
  if(this.state.password == confirmPassword1){
    this.setState({
      borderColorConfirmPassword : 'green',
      statusConfirmPassword : true
  });
  }else{
    this.setState({
      borderColorConfirmPassword : 'red',
      statusConfirmPassword : true
  });
  }
}

  createAccount = () =>{
    body = {
      nomUser: this.state.nom,
      prenomUser: this.state.prenom,
      mailUser: this.state.mail,
      villeUser: this.state.ville,
      usernameUser : this.state.user,
      passwordUser : this.state.password
      }
      console.log(body);
      console.log(body.nomUser)
      if(this.state.nom != '' && this.state.prenomUser !='' && this.state.villeUser !='' && this.state.usernameUser !=''){
        if(this.state.statusEmail){
          if(this.state.statusPassword){
            if(this.state.confirmPassword){
              Axios.post('http://51.75.22.154:8080/Cookyn/user/CreateUser',body).then(response =>{
                if(response.data.idUser != null ){
                  this.props.navigation.replace('SignUpOk')
                }else{
                  alert(response.data.errortxt)
                }
              }
            ) 
            } else {
              alert('La confirmation du mot de passe n\'est pas bonne')
            }
          } else {
            alert('Le mot de passe ne respecte pas les règles de sécurité')
          }
        } else {
          alert('l\'adresse mail n\'est pas valide')
        }
    } else {
      alert('Tous les champs doivent être remplis')
    }
  }
}
