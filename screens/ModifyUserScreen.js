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
    this.state = {
      id: '',
      nom : '',
      prenom : '',
      mail : '',
      ville : ''
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
        <Button
          title="Mettre à jour les informations"
          onPress={this.updateUser}
        />
        </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

  updateUser(){
    let body = {
      idUser: this.state.id,
      nomUser: this.state.nom,
      prenomUser: this.state.prenom,
      mailUser: this.state.mail,
      villeUser: this.state.ville
      }
    Axios.post('http://51.75.22.154:8080/Cookyn/user/CreateOrUpdateUser',body).then(response =>{
        /* this.props.navigation.goBack() */
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
      ville : navigation.getParam('ville', 'NO-VILLE')
    });
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
