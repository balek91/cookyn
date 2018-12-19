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
		user : null,
		showSuivre: false,
	}

	render() {
		const { following, showSuivre, user } = this.state
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
					{user ? (
						<View>
							<ViewCustom align={'flex-start'}>
								<TextCustom text={`Username : ${user.usernameUser}`} />
								<TextCustom text={`Nom : ${user.nomUser}`} />
								<TextCustom text={`Prenom : ${user.prenomUser}`} />
								<TextCustom text={`Mail : ${user.mailUser}`} />
								<TextCustom text={`Ville : ${user.villeUser}`} />
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
									text={`${user.nbAbonnement} Abonné(s)`}
									onPressFunction={this.onPressButtonAbonnements}
								/>
								<Touchable
									text={`${user.nbAbonnee} Abonnement(s)`}
									onPressFunction={this.onPressButtonAbonnes}
								/>
								nbRecetteFavoris
								<Touchable
									text={`${user.nbRecetteFav} Favori(s)`}
									onPressFunction={this.onPressButtonFavoris}
								/>
								<Touchable
									text={`${user.nbRecetteCreate} Creation(s)`}
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
		})
	}

	onPressButtonCreations = () => {
		this.props.navigation.push('ListRecetteCreation', {
			idUser : this.state.user.idUser,
		})
	}

	onPressButtonAbonnes = () => {

		this.props.actions.user.getAbonnesByUser(this.state.user.idUser)
		this.props.navigation.push('ListUsers', {
			namePage: 'Abonnements',
			backToProfil: this.goBackUserConnect,
			userPage : this.state.user.idUser,
			abonnementPage: false
		})
	}

	onPressButtonAbonnements = () => {
		this.props.actions.user.getAbonnementsByUser(this.state.user.idUser)
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
			Axios.get(`http://51.75.22.154:8080/Cookyn/relation/DeleteRelation/${userProfil.user.idUser}/${user}`).then(() => {
				this.props.actions.user.getAbonnesByUser(user)
				Axios.get(`http://51.75.22.154:8080/Cookyn/user/GetUserById/${userProfil.user.idUser}`).then(res =>{
					this.setState({
						user : res.data,
						following: false
					})
					})
			})
		}
		else {
			Axios.get(`http://51.75.22.154:8080/Cookyn/relation/CreateRelation/${userProfil.user.idUser}/${user}`).then(() => {
				this.props.actions.user.getUserConnect(userProfil.user.idUser)
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