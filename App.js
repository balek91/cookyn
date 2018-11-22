import QuickPicker from 'quick-picker'
import React from 'react'
import styled from 'styled-components'
import { isSignedIn } from './components/Auth.js'
import { createRootNavigator } from './navigation/AppNavigator.js'

const StyledView = styled.View`
flex :1;
background-color: #fff`

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    signedIn: false,
    checkedSignIn: false
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => console.log('An error occured ' + err));
  }
  render() {
    const Layout = createRootNavigator(this.state.signedIn);
    return (
      <StyledView>
        <Layout /> <QuickPicker />
      </StyledView>
    )
  }
}