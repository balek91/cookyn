import React, {Component} from 'react';
import { StyleSheet, View, Image, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import logo from '../assets/images/logo.png';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


export default class Acceuil extends React.Component {
    render(){
        return(	<View style={styles.container}>
        <Image source={require('../assets/images/logo.png')} />
        <Text>{"\n"}{"\n"}</Text>
           <TouchableOpacity style={styles.button}>
               <Text style={styles.buttonText}>Se Connecter</Text>
             </TouchableOpacity>  
             <TouchableOpacity style={styles.button}>
               <Text style={styles.buttonText}>S'inscrire</Text>
             </TouchableOpacity>     
            </View>
              );
    } 
} 


const styles = StyleSheet.create({
    container : {
      flexGrow: 1,
      justifyContent:'center',
      alignItems: 'center',
    },
  
    inputBox: {
      width:300,
      backgroundColor:'rgba(255, 255,255,0.2)',
      borderRadius: 25,
      paddingHorizontal:16,
      fontSize:16,
      color:'#ffffff',
      marginVertical: 10
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
      textAlign:'center',
      backgroundColor:'#E88110',
    }
    
  });
