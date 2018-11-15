import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import Axios from 'axios';
import { MonoText } from '../components/StyledText';


export default class ListUsersScreen extends React.Component {
  constructor() {
    super()
    this.onPress = this.onPress.bind(this);
    this.state = {
      users : [],
      namePage : 'Test'
    }
 }
 static navigationOptions = ({navigation}) => {
  return {
    title: `${navigation.state.params.title}`
    };
};


 drawContent(contact, index) {
  return (
      <TouchableHighlight key={index} onPress={()=> {this.onPress(contact)}}>
          <View style={styles.contact}>
              <View>
                  <Text style={styles.contactName}>{contact.nomUser} {contact.prenomUser}</Text>
              </View>
          </View>
      </TouchableHighlight>
  );
}

render() {
  return (
      <View style={styles.container}>
          <ScrollView style={styles.wrapper}>
              {this.state.users && this.state.users.map((user, index) => {
                  return this.drawContent(user, index)
              })}
          </ScrollView>
      </View>)
}
  onPress(contact) {
      this.props.navigation.navigate("ProfilUser");
   //   this.props.navigation.state.params.backToProfil(contact)
    }

  componentDidMount() {
    const { navigation } = this.props;
   // console.log(navigation.getParam('users')[0].idUser);
    this.setState({
      users : navigation.getParam('users')
    })
    const {setParams} = this.props.navigation;
    setParams({title: navigation.getParam('namePage')});
}
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10
  },
  wrapper: {
      flex: 1,
      marginBottom: 10
  },
  contact: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 6,
      borderColor: 'black',
      height : 50,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center'
  },
  contactName: {
      fontWeight: '600',
      fontSize: 30
  }
});

