import React, { Component } from 'react';
import { StyleSheet,Text,View, ScrollView, KeyboardAvoidingView,TextInput, TouchableOpacity, Image } from 'react-native';
import Axios from 'axios';

export default class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      nom : '',
      prenom : '',
      mail : '',
      ville : '', 
      user : '',
      password : '',
      confirmPassword : '',
      borderColorPassword : 'black',
      statusPassword :false,
      borderColorConfirmPassword : 'black',
      statusConfirmPassword : false,
      borderColorEmail : 'black',
      statusEmail : false
    }
 }
 regexPassword(Pass){
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

regexMail(email){
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
 passwordStyle = function(options) {
  return {
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
    borderColor: this.state.borderColorPassword,
  }
}

confirmPasswordStyle = function(options) {
  return {
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
    borderColor: this.state.borderColorConfirmPassword,
  }
}

mailStyle = function(options) {
  return {
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
    borderColor: this.state.borderColorEmail,
  }
}

verifPassword(confirmPassword1){
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

  createAccount(){
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
                  this.props.navigation.replace("SignUpOk")
                }else{
                  alert(response.data.errortxt)
                }
            }
            ) 
            }else{
              alert("La confirmation du mot de passe n'est pas bonne")
            }
          }else{
            alert("Le mot de passe ne respecte pas les règles de sécurité")
          }
        }else{
          alert("l'adresse mail n'est pas valide")
        }
    }else{
      alert("Tous les champs doivent être remplis")
    }
  }
	render(){
		return(
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} >
                <KeyboardAvoidingView style={styles.container} behavior='padding'>
                    <Image source={require('../assets/images/logo.png')} />
                    <Text>{"\n"}{"\n"}</Text>
                    
                        <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Nom"
                        placeholderTextColor = "#000000"
                        autoCorrect = {false}
                        onChangeText={(nom) => this.setState({nom})}
                        onSubmitEditing={()=> this.prenom.focus()}
                        ref={(input) => this.nom = input}
                        />
                    <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Prenom"
                        placeholderTextColor = "#000000"
                        autoCorrect = {false}
                        onChangeText={(prenom) => this.setState({prenom})}
                        onSubmitEditing={()=> this.mail.focus()}
                        ref={(input) => this.prenom = input}
                        />  

                        <TextInput style={this.mailStyle()}
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Mail"
                        placeholderTextColor = "#000000"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoCorrect = {false}
                        onChangeText={(mail) => this.regexMail(mail)}
                        onSubmitEditing={()=> this.ville.focus()}
                        ref={(input) => this.mail = input}
                        />  
                        <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Ville"
                        placeholderTextColor = "#000000"
                        autoCorrect = {false}
                        onChangeText={(ville) => this.setState({ville})}
                        onSubmitEditing={()=> this.password.focus()}
                        ref={(input) => this.ville = input}
                        />
                        <TextInput style={this.passwordStyle()}
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        placeholderTextColor = "#000000"
                        onChangeText={(password) => this.regexPassword(password)}
                        onSubmitEditing={()=> this.confirm.focus()}
                        ref={(input) => this.password = input}
                        />  

                        <TextInput style={this.confirmPasswordStyle()}
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Confirmer le mot de passe"
                        secureTextEntry={true}
                        placeholderTextColor = "#000000"
                        onChangeText =   {(confirmPassword) => this.verifPassword(confirmPassword)}
                        onSubmitEditing={()=> this.user.focus()}
                        ref={(input) => this.confirm = input}
                        /> 

                        <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Identifiant"
                        autoCapitalize="none"
                        autoCorrect = {false}
                        placeholderTextColor = "#000000"
                        onChangeText={(user) => this.setState({user})}
                        ref={(input) => this.user = input}
                        />  
                    <TouchableOpacity style={styles.button}  onPress={() =>  this.createAccount()}>
                        <Text style={styles.buttonText}>S'inscrire</Text>
                    </TouchableOpacity>     
                    </KeyboardAvoidingView>
            </ScrollView>
          </View>
			)
  }
  
  login(){
    this.props.navigation.replace("SignUpOk");
  }
}

const styles = StyleSheet.create({
    container : {
      flexGrow: 1,
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor:'#fff',
      margin:10
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
    }
    
  });
