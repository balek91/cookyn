import React, { Component } from 'react';
import { StyleSheet,Text,View, TextInput,TouchableOpacity, Image, AsyncStorage } from 'react-native';
import Axios from 'axios';
import {onSignIn} from '../components/Auth.js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputText from '../components/TextInput/index'
import Touchable from '../components/Touchable/index'
import HeaderContainer from '../components/HeaderContainer/index'
import ViewContainer from '../components/ViewContainer/index'
import ContentContainer from '../components/ContentContainer/index'


export default class Login extends Component {

  state = {
    login : false,
    prenom: null,
  } 
  SignUp(){
  this.props.navigation.push("SignUp");
}
  Login(){
    this.setState({login : true})
    Axios.get("http://51.75.22.154:8080/Cookyn/user/getUserById/1").then(response => {
     
    })
    if (this.state.login == true){
      
      this.props.navigation.replace("Home");
    }
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('idUser', '1');
    } catch (error) {
      // Error saving data
    }
  }

  componentDidMount(){
    this._storeData();
  }

	render(){
		return(
			<ViewContainer>
        <HeaderContainer titleText={"Connexion"}></HeaderContainer>
        <ContentContainer>
      <KeyboardAwareScrollView contentContainerStyle={styles.container} behavior='padding' resetScrollToCoords={{x:0,y:0}} showsVerticalScrollIndicator={false} >
            <Image source={require('../assets/images/logo.png')} />
            <Text>{"\n"}{"\n"}</Text>

       <InputText
      reference= {(input)=> this.login = input}
      placeholderText="Email/Username"
      width={300}
      onSubmitEditingFunction={()=> this.password.focus()}

      />
           <InputText
      reference= {(input)=> this.password = input}
      placeholderText="Password"
      width={300}
      isPassword={true}
      />
        
        <Touchable
                text="Connexion"
                onPressFunction={() => {onSignIn().then(() => this.props.navigation.navigate("SignedIn"))}}
                widthTouchable={300}
                backgroundColorTouchable="#E88110"
                colorText="#FFF"
              />

               
        <Touchable
                text="Skip for dev"
                onPressFunction={() =>  this.props.navigation.navigate("SignedIn")}
                widthTouchable={300}
                backgroundColorTouchable="#E88110"
                colorText="#FFF"
              />

           <Text>{"\n"}{"\n"}</Text>
           <View >
           <Text>Vous n'avez pas de compte ? </Text>
           <Text style={styles.signupBtn} onPress={() => this.props.navigation.push('SignUp')} >Inscrivez vous</Text>
           <Text>{"\n"}</Text>
           </View>
           </KeyboardAwareScrollView>
           </ContentContainer>
  		</ViewContainer>
			)
  }
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#fff',
    margin: 10
  },

  inputBox: {
    width:300,
    height:40,
    backgroundColor:'#fff',
    borderRadius: 50,
    paddingHorizontal:16,
    fontSize:16,
    color:'#000',
    marginVertical: 10,
    textAlign:'center',
    borderWidth:0.5,
  },
  button: {
    width:300,
    backgroundColor:'#E88110',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  signupBtn: {
      fontWeight: '500',
      fontSize: 17,
  },
  xc: {
    alignItems: "flex-end",
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  }
});