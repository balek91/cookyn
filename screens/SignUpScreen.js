import React, { Component } from 'react';
import { StyleSheet,Text,View, ScrollView, KeyboardAvoidingView,TextInput, TouchableOpacity, Image } from 'react-native';

export default class SignUp extends Component {

	render(){
		return(
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} >
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <Image source={require('../assets/images/logo.png')} />
                    <Text>{"\n"}{"\n"}</Text>
                    
                        <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Nom"
                        placeholderTextColor = "#000000"
                        selectionColor="#fff"
                        onSubmitEditing={()=> this.password.focus()}
                        />
                    <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Prenom"
                        placeholderTextColor = "#000000"
                        ref={(input) => this.password = input}
                        />  

                        <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Mail"
                        placeholderTextColor = "#000000"
                        keyboardType="email-address"
                        ref={(input) => this.password = input}
                        />  
                        <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        placeholderTextColor = "#000000"
                        ref={(input) => this.password = input}
                        />  

                        <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Confirmer le mot de passe"
                        secureTextEntry={true}
                        placeholderTextColor = "#000000"
                        ref={(input) => this.password = input}
                        /> 

                        <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Identifiant"
                        placeholderTextColor = "#000000"
                        ref={(input) => this.password = input}
                        />  
                    <TouchableOpacity style={styles.button}  onPress={() => this.login()}>
                        <Text style={styles.buttonText}>Connexion</Text>
                    </TouchableOpacity>     
                    </KeyboardAvoidingView>
            </ScrollView>
          </View>
			)
  }
  
  login(){
    this.props.navigation.replace("Home");
  }
}

const styles = StyleSheet.create({
    container : {
      flexGrow: 1,
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor:'#fff',
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
