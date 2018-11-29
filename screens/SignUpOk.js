import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import Touchable from '../components/Touchable'


export default class SignUpOk extends Component {


  goToLogin =() => {
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
            <Image source={require('../assets/images/logo.png')} />
            <View style={styles.viewSignUp}>
              <Text>Inscription Complète !</Text>
            </View>
            <Touchable
                text={'Retour à l\'acceuil'}
                onPressFunction={this.goToLogin}
                widthTouchable={200}
                backgroundColorTouchable='#E88110'
                colorText='#FFF'
              />
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    marginVertical: 10,
    textAlign: 'center',
    borderWidth: 0.5,
  },
  button: {
    width: 300,
    backgroundColor: '#E88110',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  signupBtn: {
    fontWeight: '500',
    fontSize: 17,
  },
  viewSignUp: {
    alignItems: "flex-end",
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  }

});