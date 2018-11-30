import Axios from 'axios'
import React from 'react'
import { AsyncStorage, View } from 'react-native'

import allTheActions from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ButtonFollow from '../components/ButtonFollow'
import ScrollViewCustom from '../components/ScrollViewContainer'
import TextCustom from '../components/TextCustom'
import Touchable from '../components/Touchable'
import ViewCustom from '../components/ViewContainer'

class ProfilScreen extends React.Component {
	static navigationOptions = {
		title: 'Profil',
	}

	state = {
		following: true,
		showSuivre: false
	}

	render() {
		const { following, showSuivre } = this.state
		const { userProfil } = this.props
		return (
			<ViewCustom>
				<ScrollViewCustom>
					{this.state.showSuivre ? (null) :
						(<Touchable
							text='Modifier Informations'
							onPressFunction={this.redirectModify}
						/>)
					}
					<ViewCustom>
						<TextCustom fontsize={18} text={'Informations Personnelles :'} />
					</ViewCustom>
					{userProfil ? (
						<View>
							<ViewCustom align={'flex-start'}>
								<TextCustom text={`Username : ${userProfil.user.usernameUser}`} />
								<TextCustom text={`Nom : ${userProfil.user.nomUser}`} />
								<TextCustom text={`Prenom : ${userProfil.user.prenomUser}`} />
								<TextCustom text={`Mail : ${userProfil.user.mailUser}`} />
								<TextCustom text={`Ville : ${userProfil.user.villeUser}`} />
							</ViewCustom>
							<ViewCustom>
								{showSuivre ?
									(<ButtonFollow
										text={following ? ('Ne plus suivre') : ('Suivre')}
										onPressFunction={this.onPressButtonFollow}
									/>)
									:
									(null)}
								<Touchable
									text={`${userProfil.user.nbAbonnement} Abonné(s)`}
									onPressFunction={this.onPressButtonAbonnements}
								/>
								<Touchable
									text={`${userProfil.user.nbAbonnee} Abonnement(s)`}
									onPressFunction={this.onPressButtonAbonnes}
								/>
								<Touchable
									text={'Favoris'}
									onPressFunction={this.onPressButtonFavoris}
								/>
								<Touchable
									text={'Créations'}
									onPressFunction={this.onPressButtonCreations}
								/>
							</ViewCustom>
						</View>
					) : (null)}
				</ScrollViewCustom>
			</ViewCustom>
		);
	}

	redirectModify = () => {
		const { userProfil } = this.props
		this.props.navigation.navigate('ModifyUser', {
			id: userProfil.user.idUser,
			nom: userProfil.user.nomUser,
			prenom: userProfil.user.prenomUser,
			mail: userProfil.user.mailUser,
			ville: userProfil.user.villeUser,
			user: userProfil.user.usernameUser,
			onNavigateBack: this.retrieveData
		});
	}

	retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem('idUser');
			this.props.actions.user.getUserConnect(value)
			this.props.navigation.navigate('Profil')
		} catch (error) {
		}
	}

	loadUserConnect = async (idContact) => {
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
		this.props.navigation.navigate('ListRecette');
	}

	onPressButtonCreations = () => {
		this.props.navigation.navigate('ListRecette');
	}

	onPressButtonAbonnes = () => {

		this.props.actions.user.getAbonnesByUser(this.props.userProfil.user.idUser)
		this.props.navigation.navigate('ListUsers', {
			namePage: 'Abonnements',
			backToProfil: this.retrieveData,
			abonnementPage: false
		})
	}

	onPressButtonAbonnements = () => {
		this.props.actions.user.getAbonnementsByUser(this.props.userProfil.user.idUser)
		this.props.navigation.navigate('ListUsers', {
			namePage: 'Abonnés',
			backToProfil: this.retrieveData,
			abonnementPage: true
		})
	}

	onPressButtonFollow = () => {
		const { following } = this.state
		const { user, userProfil } = this.props
		if (following == true) {
			Axios.get(`http://51.75.22.154:8080/Cookyn/relation/DeleteRelation/${userProfil.user.idUser}/${user}`).then(() => {
				this.props.actions.user.getUserConnect(userProfil.user.idUser)
				this.setState({
					following: false
				})
			})
		}
		else {
			Axios.get(`http://51.75.22.154:8080/Cookyn/relation/CreateRelation/${userProfil.user.idUser}/${user}`).then(() => {
				this.props.actions.user.getUserConnect(userProfil.user.idUser)
				this.setState({
					following: true
				})
			}
			)
		}
	}

	getRelation = (idContact) => {
		const { user } = this.props
		Axios.get(`http://51.75.22.154:8080/Cookyn/relation/GetRelation/${idContact}/${user}`).then(response =>

			this.setState({
				following: response.data
			}));
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