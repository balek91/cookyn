import React from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { createSwitchNavigator} from 'react-navigation';
import { createRootNavigator} from './navigation/AppNavigator.js'
import { isSignedIn} from  './components/Auth.js';
import MainTabNavigator from './navigation/MainTabNavigator';
import NotConnected from './navigation/SignedOutNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    
  };

  constructor(props){
    super(props);
    this.state = {
      signedIn:false,
    checkedSignIn: false
     }
  }

  componentDidMount(){
    isSignedIn()
    .then(res => this.setState({signedIn: res, checkedSignIn: true}))
    .catch(err => console.log("An error occured " + err ));

  }
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      const Layout = createRootNavigator(this.state.signedIn);
      return <Layout />
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
 const navigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  SignedIn: MainTabNavigator,
  SignedOut: NotConnected
  
});
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
