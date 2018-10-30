import React, { Component } from 'react';
import { StyleSheet,Text,View, TextInput,TouchableOpacity, Image, AsyncStorage } from 'react-native';
import Axios from 'axios';
import {onSignIn} from '../components/Auth.js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


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
      await AsyncStorage.setItem('idUser', '8');
    } catch (error) {
      // Error saving data
    }
  }

  componentDidMount(){
    this._storeData();
  }

	render(){
		return(
			<View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container} behavior='padding' resetScrollToCoords={{x:0,y:0}} showsVerticalScrollIndicator={false} >
            <Image source={require('../assets/images/logo.png')} />
            <Text>{"\n"}{"\n"}</Text>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email/Username"
              placeholderTextColor = "#707070"
              autoCapitalize="none"
              autoCorrect = {false}
              keyboardType="email-address"
              onSubmitEditing={()=> this.password.focus()}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#707070"
              ref={(input) => this.password = input}
              />  
           <TouchableOpacity style={styles.button}  onPress={() => {onSignIn().then(() => this.props.navigation.navigate("SignedIn"))}}>
             <Text style={styles.buttonText}>Connexion</Text>
           </TouchableOpacity>  
           <TouchableOpacity style={styles.button}  onPress={() =>  this.props.navigation.navigate("SignedIn")}>
             <Text style={styles.buttonText}>Skip for dev</Text>
           </TouchableOpacity>  
           <Text>{"\n"}{"\n"}</Text>
           <View style={styles.viewSignUp}>
           <Text>Vous n'avez pas de compte ? </Text>
           <Text style={styles.signupBtn} onPress={() => this.props.navigation.push('SignUp')} >Inscrivez vous</Text>
           </View>
           </KeyboardAwareScrollView>
  		</View>
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