import Axios from 'axios'
import React from 'react'
import { Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScrollViewCustom from '../components/ScrollViewContainer'
import TextCustom from '../components/TextCustom'
import InputText from '../components/TextInput'
import ViewCustom from '../components/ViewContainer'


export default class ModifyUserScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    id: '',
    nom: '',
    prenom: '',
    mail: '',
    ville: '',
    user: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    showChangePassword: false,
    borderColorConfirmPassword: 'gray',
    borderColorNewPassword: 'gray',
    statusNewPassword: false,
    statusConfirmPassword: false
  }

  render() {
    return (
      <ScrollViewCustom>
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} showsVerticalScrollIndicator={false}>
          <ViewCustom>
            <TextCustom fontsize={18} text={'Nom:'} />
            <InputText
              reference={(input) => this.nom = input}
              onChangeTextFunction={(val) => this.setState({ nom: val })}
              value={this.state.nom}
            />
            <TextCustom fontsize={18} text={'Prenom:'} />
            <InputText
              reference={(input) => this.prenom = input}
              onChangeTextFunction={(val) => this.setState({ prenom: val })}
              value={this.state.prenom}
            />
            <TextCustom fontsize={18} text={'Mail:'} />
            <InputText
              reference={(input) => this.mail = input}
              onChangeTextFunction={(val) => this.setState({ mail: val })}
              value={this.state.mail}
            />
            <TextCustom fontsize={18} text={'Ville:'} />
            <InputText
              reference={(input) => this.ville = input}
              onChangeTextFunction={(val) => this.setState({ ville: val })}
              value={this.state.ville}
            />
          </ViewCustom>
          {this.state.showChangePassword ? (
            <ViewCustom>
              <TextCustom fontsize={18} text={'Ancien Mot de Passe:'} />
              <InputText
                reference={(input) => this.oldPassword = input}
                onChangeTextFunction={(oldPassword) => this.setState({ oldPassword })}
                isPassword={true}
              />
              <TextCustom fontsize={18} text={'Nouveau Mot de Passe:'} />
              <InputText
                reference={(input) => this.oldPassword = input}
                bordercolor={this.state.borderColorNewPassword}
                onChangeTextFunction={(newPassword) => this.regexNewPassword(newPassword)}
                isPassword={true}
              />
              <TextCustom fontsize={18} text={'Confirmer Mot de Passe:'} />
              <InputText
                reference={(input) => this.confirmPassword = input}
                bordercolor={this.state.borderColorConfirmPassword}
                onChangeTextFunction={(confirmPassword) => this.verifNewPassword(confirmPassword)}
                isPassword={true}
              />
            </ViewCustom>
          ) : (
              <Button
                title="Changer le mot de passe"
                onPress={this.changePassword} />
            )}
          <Button
            title="Mettre à jour les informations"
            onPress={this.updateUser}
          />
        </KeyboardAwareScrollView>
      </ScrollViewCustom>
    )
  }

  changePassword = () => {
    this.setState({
      showChangePassword: true
    });
  }
  verifNewPassword = (confirmPassword1) => {
    this.setState({
      confirmPassword: confirmPassword1
    })
    if (this.state.newPassword == confirmPassword1) {
      this.setState({
        borderColorConfirmPassword: 'green',
        statusConfirmPassword: true
      });
    } else {
      this.setState({
        borderColorConfirmPassword: 'red',
        statusConfirmPassword: true
      });
    }
  }

  regexNewPassword = (newPass) => {
    this.setState({
      newPassword: newPass
    })
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (re.test(newPass)) {
      this.setState({
        borderColorNewPassword: 'green',
        statusNewPassword: true
      });
    } else {
      this.setState({
        borderColorNewPassword: 'red',
        statusNewPassword: false
      });
    }
  }

  updateUser = () => {
    let body
    if (this.state.showChangePassword) {

      body = {
        idUser: this.state.id,
        nomUser: this.state.nom,
        prenomUser: this.state.prenom,
        mailUser: this.state.mail,
        villeUser: this.state.ville,
        usernameUser: this.state.user,
        passwordUser: this.state.oldPassword,
        newPassword: this.state.newPassword
      }
      if (this.state.statusNewPassword && this.state.statusConfirmPassword) {
        Axios.post('http://51.75.22.154:8080/Cookyn/user/UpdateUser', body).then(response => {
          if (response.data.idUser != null) {
            this.props.navigation.state.params.onNavigateBack()
            this.props.navigation.navigate('Profil')
          } else {
            alert('probleme dans l\'ancien mot de passe')
          }
        }
        )
      } else {
        alert('probleme dans le nouveau mot de passe')
      }
    } else {
      body = {
        idUser: this.state.id,
        nomUser: this.state.nom,
        prenomUser: this.state.prenom,
        mailUser: this.state.mail,
        usernameUser: this.state.user,
        villeUser: this.state.ville
      }
      Axios.post('http://51.75.22.154:8080/Cookyn/user/UpdateUser', body).then(response => {
        if (response.data.idUser != null) {
          this.props.navigation.state.params.onNavigateBack()
          this.props.navigation.navigate('Profil')
        } else {
          alert('erreur')
        }

      }
      )
    }

  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      id: navigation.getParam('id', 0),
      nom: navigation.getParam('nom', 'NO-NAME'),
      prenom: navigation.getParam('prenom', 'NO-PRENOM'),
      mail: navigation.getParam('mail', 'NO-MAIL'),
      ville: navigation.getParam('ville', 'NO-VILLE'),
      user: navigation.getParam('user', 'NO-USERNAME')
    });
  }
}
