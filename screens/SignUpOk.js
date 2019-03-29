import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image } from 'react-native';
import Touchable from '../components/Touchable'
import styled from 'styled-components'
import ViewContainer from '../components/ViewContainer'
import TextCustom from '../components/TextCustom'
import ContentContainer from '../components/ContentContainer/index'

const StyledView = styled(ViewContainer)`
backgroundColor: rgba(52, 52, 52, 0.1)`

export default class SignUpOk extends Component {


  goToLogin =() => {
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <StyledView>
        <ImageBackground source={require('../assets/images/home.jpg')} style={{width: '100%', height: '100%'}}>
        <ContentContainer>
        <ScrollView showsVerticalScrollIndicator={false} >
            <Image source={require('../assets/images/logo.png')} />
            <TextCustom color={'white'} text={'Inscription Complète !'} fontsize={17}  />
            <Touchable
                text={'RETOUR À L\'ACCEUIL'}
                onPressFunction={this.goToLogin}
                widthTouchable={200}
                backgroundColorTouchable='#E88110'
                colorText='#FFF'
              />
        </ScrollView>
        </ContentContainer>
        </ImageBackground>
        </StyledView>    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
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