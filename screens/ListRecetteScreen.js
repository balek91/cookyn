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


export default class ListRecetteScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super()
    this.state = {
    }
 }



  render() {
    const { navigation } = this.props;

    
    return (
      <View style={styles.container}>
        <Text>Test</Text>
      </View>
    );
  }


  

  componentDidMount() {
    const { navigation } = this.props;
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
