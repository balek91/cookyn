import React, { Component } from 'react';
import { StyleSheet,Text,View, TextInput, TouchableOpacity, Image } from 'react-native';

export default class Logo extends Component<{}> {

	render(){
		return(
			<View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} />
            <Text>{"\n"}{"\n"}</Text>
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email"
              placeholderTextColor = "#000000"
              selectionColor="#fff"
              keyboardType="email-address"
              onSubmitEditing={()=> this.password.focus()}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#000000"
              ref={(input) => this.password = input}
              />  
           <TouchableOpacity style={styles.button}>
             <Text style={styles.buttonText}>Connexion</Text>
           </TouchableOpacity>     
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