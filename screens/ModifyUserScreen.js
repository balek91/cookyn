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
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class ModifyUserScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super()
    this.state = {
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
        </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    const { navigation } = this.props;
    const nom = navigation.getParam('nom', 'NO-NAME');
    const prenom = navigation.getParam('prenom', 'NO-PRENOM');
    const mail = navigation.getParam('mail', 'NO-MAIL');
    const ville = navigation.getParam('ville', 'NO-VILLE');

    this.setState({
      nom : navigation.getParam('nom', 'NO-NAME'),
      prenom : navigation.getParam('prenom', 'NO-PRENOM'),
      mail : navigation.getParam('mail', 'NO-MAIL'),
      ville : navigation.getParam('ville', 'NO-VILLE')
    });
    console.log(this.state.text);

}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
