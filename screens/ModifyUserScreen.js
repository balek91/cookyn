import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Button,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import Axios from 'axios';
import { MonoText } from '../components/StyledText';

export default class ModifyUserScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super()
    this.updateUser = this.updateUser.bind(this);
    this.passwordField = this.passwordField.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.verifNewPassword = this.verifNewPassword.bind(this);
    this.state = {
      id: '',
      nom : '',
      prenom : '',
      mail : '',
      ville : '', 
      user : '',
      oldPassword : '',
      newPassword : '',
      confirmPassword : '',
      showChangePassword: false,
      borderColorConfirmPassword : 'green',
    }
 }

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');
    
    return (
      <View style={styles.container}>
      <ScrollView>
      <KeyboardAvoidingView>
      <Text>Details Screen</Text>
        <Text>Nom: </Text>      
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(nom) => this.setState({nom})}
        value={this.state.nom}
        />
        <Text>Username: </Text>      
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(user) => this.setState({user})}
        value={this.state.user}
        />
        <Text>Prenom:</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(prenom) => this.setState({prenom})}
        value={this.state.prenom}
        />
        <Text>Mail:</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(mail) => this.setState({mail})}
        value={this.state.mail}
        />
        <Text>Ville:</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(ville) => this.setState({ville})}
        value={this.state.ville}
        />
        {this.passwordField()}
        <Button
          title="Changer le mot de passe"
          onPress={this.changePassword}
        />
        <Button
          title="Mettre à jour les informations"
          onPress={this.updateUser}
        />
        </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

  changePassword(){
    this.setState({
        showChangePassword : true
    });
  }

  passwordField() {
    if (this.state.showChangePassword) {
        return (
        <View>
          <Text>Ancien Mot de Passe:</Text>
          <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(oldPassword) => this.setState({oldPassword})}
          secureTextEntry={true} 
          />
          <Text>Nouveau Mot de Passe:</Text>
          <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(newPassword) => this.setState({newPassword})}
          secureTextEntry={true} 
          />
          <Text>Confirmer le Mot de passe:</Text>
          <TextInput
          style={this.verifNewPasswordStyle()}
          secureTextEntry={true} 
          onChangeText = {this.verifNewPassword}

          />
        </View>
        );
    } else {
        return null;
    }
}

verifNewPasswordStyle = function(options) {
  return {
    height: 40, 
    borderColor: this.state.borderColorConfirmPassword,
     borderWidth: 2
  }
}

verifNewPassword(){
  (confirmPassword) => this.setState({confirmPassword})
}

  updateUser(){
    let body 
    if(this.state.showChangePassword){
      
      body = {
        idUser: this.state.id,
        nomUser: this.state.nom,
        prenomUser: this.state.prenom,
        mailUser: this.state.mail,
        villeUser: this.state.ville,
        usernameUser : this.state.user,
        passwordUser : this.state.oldPassword,
        newPassword : this.state.newPassword
        }
    }else{
      body = {
        idUser: this.state.id,
        nomUser: this.state.nom,
        prenomUser: this.state.prenom,
        mailUser: this.state.mail,
        usernameUser : this.state.user,
        villeUser: this.state.ville
        }
    }
console.log(body)
    Axios.post('http://51.75.22.154:8080/General/user/UpdateUser',body).then(response =>{
        this.props.navigation.state.params.onNavigateBack()
        this.props.navigation.navigate('Profil')
    }
    ) 
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      id : navigation.getParam('id', 0),
      nom : navigation.getParam('nom', 'NO-NAME'),
      prenom : navigation.getParam('prenom', 'NO-PRENOM'),
      mail : navigation.getParam('mail', 'NO-MAIL'),
      ville : navigation.getParam('ville', 'NO-VILLE'),
      user : navigation.getParam('user', 'NO-USERNAME')
    });
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
