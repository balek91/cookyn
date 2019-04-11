import Axios from 'axios'
import React from 'react'
import { AsyncStorage, ImageBackground, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import allTheActions from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ButtonFollow from '../components/ButtonFollow'
import TextCustom from '../components/TextCustom'
import TouchableUpdate from '../components/TouchableUpdate'
import TouchableProfil from '../components/TouchableProfil'
import styled from 'styled-components'

const heightWindows = Dimensions.get("window").height

const StyledView = styled.View
`
flex: 1;
align-items: ${props => props.align ? props.align : 'center'};
`

const FollowView = styled.View`
flex: 2;
align-items: center;`

const GlobalView = styled.View `
flex : 1;
`

const ViewRow = styled.View`
flex-direction : row;
justify-content : center;
align-items : center;
`
const ViewFlex = styled.View`
flex : 1;`

const ViewInfo = styled(ViewRow)`
flex : 5;
`

const ViewInfoAndFollow = styled.View`
flex : 3;
flex-direction : column;
`

const ViewList = styled(StyledView)`
flex : 5;
`

const ViewColumnEmpty = styled.View`
flex-direction : column;
flex : 3;
`

const ViewColumnInfo = styled.View`
flex-direction : column;
flex : 4;
`
const ViewColumnElement= styled.View`
flex-direction : column;
flex : 7;
`

const ViewColumnEmptyDown = styled.View`
flex-direction : column;
flex : 3;
`

const UserView = styled.View`
flex : 1;
width :  100%;
margin-top : 15px;
height :${heightWindows};
`

const ViewRowUsername = styled(ViewRow)`
padding-top : 15px;
`

const ViewRowRecette = styled(ViewRow)`
padding-top : 50px;`

const TextUsername = styled(TextCustom)`
padding-top : 10px;`

class ProfilScreen extends React.Component {
	static navigationOptions = {
		title:''
	}

	state = {
		following: true,
		user : null,
		showSuivre: false,
	}

	render() {
		const { following, showSuivre, user } = this.state
		return (
			<GlobalView>
			<ImageBackground source={require('../assets/images/profilPage.jpg')} style={{width: '100%', height: '100%'}}>
			<KeyboardAwareScrollView behavior='padding' resetScrollToCoords={{ x: 0, y: 0 }} showsVerticalScrollIndicator={false} >
					{user ? (
						<UserView>
							<ViewInfoAndFollow>
							<ViewInfo>
								<ViewColumnEmpty>
								</ViewColumnEmpty>
								<ViewColumnInfo>
									<ViewRowUsername>
										<TextUsername fontsize={25} text={`${user.usernameUser} `} />
										{this.state.showSuivre ? (null) :
										<TouchableUpdate onPressFunction={this.redirectModify}/>
										}
									</ViewRowUsername>
									<StyledView align={'flex-start'}>
										<TextCustom text={''} />
										<TextCustom text={`Nom : ${user.nomUser}`} />
										<TextCustom text={`Prenom : ${user.prenomUser}`} />
										<TextCustom text={`Mail : ${user.mailUser}`} />
										<TextCustom text={`Ville : ${user.villeUser}`} />
									</StyledView>
								</ViewColumnInfo>
							</ViewInfo>
							{showSuivre ?
									(<FollowView>
										<ButtonFollow
										text={following ? ('Ne plus suivre') : ('Suivre')}
										onPressFunction={this.onPressButtonFollow}
									/>
									</FollowView>)
									:
									(null)}
							</ViewInfoAndFollow>
							<ViewList>

								<ViewRow>
								<ViewColumnElement>
								<ViewRow>
									<ViewFlex>
										<TouchableProfil
											number={`${user.nbAbonnement}`}
											text={`Abonnement(s)`}
											onPressFunction={this.onPressButtonAbonnements}
										/>
									</ViewFlex>
									<ViewFlex>
										<TouchableProfil
											number={`${user.nbAbonnee}`}
											text={`Abonné(s)`}
											onPressFunction={this.onPressButtonAbonnes}
										/>
									</ViewFlex>
								</ViewRow>
								<ViewRowRecette>
								<ViewFlex>
									<TouchableProfil
										number={`${user.nbRecetteCreate}`}
										text={`Recette(s)`}
										onPressFunction={this.onPressButtonCreations}
									/>
								</ViewFlex>
								<ViewFlex>
									<TouchableProfil
										number={`${user.nbRecetteFav}`}
										text={`Favori(s)`}
										onPressFunction={this.onPressButtonFavoris}
									/>
								</ViewFlex>
								</ViewRowRecette>
								</ViewColumnElement>
								<ViewColumnEmptyDown></ViewColumnEmptyDown>
								</ViewRow>
							</ViewList>
						</UserView>
					) : (null)}
				</KeyboardAwareScrollView>
				</ImageBackground>
			</GlobalView>
		);
	}

	redirectModify = () => {
		const { user } = this.state
		this.props.navigation.navigate('ModifyUser', {
			id: user.idUser,
			nom: user.nomUser,
			prenom: user.prenomUser,
			mail: user.mailUser,
			ville: user.villeUser,
			user: user.usernameUser,
			onNavigateBack: this.goBackUserConnect
		});
	}

	retrieveData = async () => {
		try {
		const value = await AsyncStorage.getItem('idUser')
		Axios.get(`http://51.75.22.154:8080/Cookyn/user/GetUserById/${value}`).then(res =>{
				this.setState({
					user : res.data
				})
		})
		} catch (error) {
		}
	}

	goBackUserConnect = async () => {
		try {
			this.props.navigation.goBack(null)
			Axios.get(`http://51.75.22.154:8080/Cookyn/user/GetUserById/${this.state.user.idUser}`).then(res =>{
				this.setState({
					user : res.data
				})
		})

		} catch (error) {
		}
	}

	loadUserConnect = async (idContact) => {
		Axios.get(`http://51.75.22.154:8080/Cookyn/user/GetUserById/${idContact}`).then(res =>{
				this.setState({
					user : res.data
				})
		})
		const { user } = this.props
		if (idContact == user) {
			this.setState({
				showSuivre: false
			})
		} else {
			this.getRelation(idContact)
			this.setState({
				showSuivre: true
			})
		}
	}

	onPressButtonFavoris = () => {
		this.props.navigation.push('ListRecetteFavori',{
			idUser  : this.state.user.idUser,
			backToProfil: this.goBackUserConnect,
		})
	}

	onPressButtonCreations = () => {
		this.props.navigation.push('ListRecetteCreation', {
			idUser : this.state.user.idUser,
			backToProfil: this.goBackUserConnect,
		})
	}

	onPressButtonAbonnes = () => {
		this.props.navigation.push('ListUsers', {
			namePage: 'Abonnements',
			backToProfil: this.goBackUserConnect,
			userPage : this.state.user.idUser,
			abonnementPage: false
		})
	}

	onPressButtonAbonnements = () => {
		this.props.navigation.push('ListUsers', {
			namePage: 'Abonnés',
			backToProfil: this.goBackUserConnect,
			abonnementPage: true,
			userPage : this.state.user.idUser
		})
	}

	onPressButtonFollow = () => {
		const { following } = this.state
		const { user, userProfil } = this.props
		if (following == true) {
			Axios.get(`http://51.75.22.154:8080/Cookyn/relation/DeleteRelation/${user}/${userProfil.user.idUser}`).then(() => {
				Axios.get(`http://51.75.22.154:8080/Cookyn/user/GetUserById/${userProfil.user.idUser}`).then(res =>{
					this.setState({
						user : res.data,
						following: false
					})
					})
			})
		}
		else {
			Axios.get(`http://51.75.22.154:8080/Cookyn/relation/CreateRelation/${user}/${userProfil.user.idUser}`).then(() => {
				Axios.get(`http://51.75.22.154:8080/Cookyn/user/GetUserById/${userProfil.user.idUser}`).then(res =>{
					this.setState({
						user : res.data,
						following: true
					})
					})
			}
			)
		}
	}

	getRelation = (idContact) => {
		
		const { user } = this.props
		Axios.get(`http://51.75.22.154:8080/Cookyn/relation/GetRelation/${user}/${idContact}`).then(response =>(

			this.setState({
				following: response.data
			}))
		)

	}

	componentDidMount() {
		const { navigation } = this.props
		{ navigation.getParam('contact') ? this.loadUserConnect(navigation.getParam('contact')) : this.retrieveData() }
	}
}

const mapStateToProps = state => {
	return {
		abonnementList: state.user.abonnementList,
		abonneList: state.user.abonneList,
		userProfil: state.user.userProfil,
		user: state.user.user,
		allState: state
	}
}

const mapDispatchToProps = dispatch => ({
	actions: {
		user: bindActionCreators(allTheActions.user, dispatch)
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfilScreen)