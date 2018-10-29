import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  AsyncStorage
} from 'react-native';
import Axios from 'axios';
import { WebBrowser } from 'expo';
import {ModifyUserScreen} from '../screens/ModifyUserScreen';
import {ListRecetteScreen} from '../screens/ListRecetteScreen';
import { MonoText } from '../components/StyledText';

export default class ProfilScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super()
    this._retrieveData = this._retrieveData.bind(this)
    this.state = {
      id : '',
       following: 'Suivre',
       nom : '',
       prenom : '',
       mail : '',
       ville : '', 
       user : '', 
       nbFollow : '',
       nbFollower : '',
       showSuivre : false
    }

 }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.pseudoTitle}>
            <Text style={styles.titleText}>Pseudo</Text>

                  <TouchableOpacity>
                    <Text style = {styles.button} onPress={this._redirectModify}>
                    Modifier Informations
                    </Text>
                </TouchableOpacity>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.title2Text}>Informations Personnelles : </Text>           
            <MonoText style={styles.contentText}>Username : {this.state.user}</MonoText>
            <MonoText style={styles.contentText}>Nom : {this.state.nom}</MonoText>
            <MonoText style={styles.contentText}>Prenom : {this.state.prenom}</MonoText>
            <MonoText style={styles.contentText}>Mail : {this.state.mail}</MonoText>
            <MonoText style={styles.contentText}>Ville : {this.state.ville}</MonoText>
          </View>
          {this.showSuivreBtn()}
          <View style={styles.helpContainer}>
                  <TouchableOpacity>
                    <Text style = {styles.button}>
                    {this.state.nbFollow} Abonnement(s)
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {styles.button} >
                    {this.state.nbFollower} Abonné(s)
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {styles.button} onPress={this._onPressButtonFavoris}>
                    Favoris
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style = {styles.button} onPress={this._onPressButtonCreations}>
                    Créations
                    </Text>
                </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  _redirectModify = () => {
    /* 1. Navigate to the Details route with params */
    this.props.navigation.navigate('ModifyUser', {
      id : this.state.id,
      nom : this.state.nom,
      prenom : this.state.prenom,
      mail : this.state.mail,
      ville : this.state.ville,
      user : this.state.user,
      onNavigateBack: this._retrieveData.bind(this)
    });
  }

  showSuivreBtn() {
    if (this.state.showSuivre) {
        return (
          <View style={styles.helpContainer}>
                  <TouchableOpacity>
                    <Text style = {styles.button} onPress={this._onPressButtonFollow}>
                    {this.state.following}
                    </Text>
                </TouchableOpacity>
          </View>
        );
    } else {
        return null;
    }
}

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('idUser');
      if (value !== null) {
        this.setState({id: value})
        Axios.get("http://51.75.22.154:8080/General/user/getUserById/"+value).then(response => this.setState({
          id : response.data.idUser,
          nom : response.data.nomUser,
          prenom : response.data.prenomUser,
          mail : response.data.mailUser,
          ville : response.data.villeUser,
          user : response.data.usernameUser,
          nbFollow : response.data.nbFollowing,
          nbFollower : response.data.nbFollower,
        }));
      }
     } catch (error) {
       // Error retrieving data
     }
  }
  _onPressButtonFavoris = () => {
    this.props.navigation.navigate('ListRecette');
 }

 _onPressButtonCreations = () => {
  this.props.navigation.navigate('ListRecette');
}



  _onPressButtonFollow = () => {
    if(this.state.following == 'Suivre'){
      this.setState({following: 'Ne plus suivre'})
    }
    else{
      this.setState({following: 'Suivre'})
    }
 }
 _onPressButtonModify = () => {
  alert('modify');
}
componentDidMount() {
  this._retrieveData()
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentView : {
  },
  titleText : {
    textAlign : 'center',
    fontSize : 18,
  },
  contentText : {
    paddingLeft : 30,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  pseudoTitle: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  title2Text: {
    fontSize: 17,
    paddingLeft: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  button: {
    width:300,
    backgroundColor:'#78C9DC',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13,
      textAlign: 'center',
  },
});
