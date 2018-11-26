import Axios from 'axios'
import React from 'react'
import { AsyncStorage } from 'react-native'
import ButtonFollow from '../components/ButtonFollow'
import ScrollViewCustom from '../components/ScrollViewContainer'
import TextCustom from '../components/TextCustom'
import Touchable from '../components/Touchable'
import ViewCustom from '../components/ViewContainer'

export default class ProfilScreen extends React.Component {
	static navigationOptions = {
		title: 'Profil',
	}

	state = {
			id : '',
			following: 'Suivre',
			nom : '',
			prenom : '',
			mail : '',
			ville : '', 
			user : '', 
			nbAbonnement : '',
			nbAbonnee : '',
			idConnecteUser : '',
			showSuivre : false
	}

	render() {
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
						<TextCustom fontsize={18} text={'Informations Personnelles :'}/>
					</ViewCustom>
					<ViewCustom align={'flex-start'}>
						<TextCustom text={`Username : ${this.state.user}`}/>
						<TextCustom text={`Nom : ${this.state.nom}`}/>
						<TextCustom text={`Prenom : ${this.state.prenom}`}/>
						<TextCustom text={`Mail : ${this.state.mail}`}/>  
						<TextCustom text={`Ville : ${this.state.ville}`}/> 
					</ViewCustom>
					<ViewCustom>
						{this.state.showSuivre ? 
						(<ButtonFollow
						text={this.state.following}
						onPressFunction={this.onPressButtonFollow}
						/>): (null)}
						<Touchable
							text={`${this.state.nbAbonnement} Abonnement(s)`} 
							onPressFunction={this.onPressButtonAbonnements}
						/>
						<Touchable
							text={`${this.state.nbAbonnee} Abonné(s)`} 
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
				</ScrollViewCustom>
			</ViewCustom>
		);
	}

	redirectModify = () => {
		this.props.navigation.navigate('ModifyUser', {
			id : this.state.id,
			nom : this.state.nom,
			prenom : this.state.prenom,
			mail : this.state.mail,
			ville : this.state.ville,
			user : this.state.user,
			onNavigateBack: this.retrieveData
		});
	}

	retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem('idUser');
			if (value !== null) {
				this.setState({id: value})
				Axios.get('http://51.75.22.154:8080/Cookyn/user/getUserById/'+value).then(response => this.setState({
					id : response.data.idUser,
					nom : response.data.nomUser,
					prenom : response.data.prenomUser,
					mail : response.data.mailUser,
					ville : response.data.villeUser,
					user : response.data.usernameUser,
					nbAbonnement : response.data.nbAbonnement,
					nbAbonnee : response.data.nbAbonnee,
				}))
			}
		} catch (error) {
			// Error retrieving data
		}
	}

	loadUserConnect = async () => {

		const value = await AsyncStorage.getItem('idUser');
			if (value !== null) {
				this.setState({idConnecteUser: value})
				console.log("VALUUUUUUUUUUUE",value)
			}

	}

	onBackFromListUser= () =>{
		console.log(user);
		if(user.idUser != null){
			Axios.get('http://51.75.22.154:8080/Cookyn/user/getUserById/'+user.idUser).then(response => this.setState({
					id : response.data.idUser,
					nom : response.data.nomUser,
					prenom : response.data.prenomUser,
					mail : response.data.mailUser,
					ville : response.data.villeUser,
					user : response.data.usernameUser,
					nbAbonnement : response.data.nbAbonnee,
					nbAbonnee : response.data.nbAbonnee,
				}));
		}
	}
	onPressButtonFavoris = () => {
		this.props.navigation.navigate('ListRecette');
	}

	onPressButtonCreations = () => {
		this.props.navigation.navigate('ListRecette');
	}

	onPressButtonAbonnes = () => {
		Axios.get('http://51.75.22.154:8080/Cookyn/user/GetListAbonne/'+this.state.id).then(response => 
			this.props.navigation.navigate('ListUsers', {
				users : response.data,
				namePage : 'Abonnes',
				backToProfil: this.onBackFromListUser.bind(this)
		}));
	}

	onPressButtonAbonnements = () => {
		Axios.get('http://51.75.22.154:8080/Cookyn/user/GetListAbonnement/'+this.state.id).then(response => 
			this.props.navigation.navigate('ListUsers', {
				users : response.data,
				namePage : 'Abonnements',
				backToProfil: this.onBackFromListUser.bind(this)
		}));
	}

	onPressButtonFollow = () => {
		if(this.state.following == 'Suivre'){
			this.setState({following: 'Ne plus suivre'})
		}
		else{
			this.setState({following: 'Suivre'})
		}
	}

	loadContactDetail = (contact) => {
		console.log(contact)
		if(contact.idUser != null){
			Axios.get('http://51.75.22.154:8080/Cookyn/user/getUserById/'+contact.idUser).then(response => this.setState({
					id : response.data.idUser,
					nom : response.data.nomUser,
					prenom : response.data.prenomUser,
					mail : response.data.mailUser,
					ville : response.data.villeUser,
					user : response.data.usernameUser,
					nbAbonnement : response.data.nbAbonnement,
					nbAbonnee : response.data.nbAbonnee,
					showSuivre : true,

				}));
				this.loadUserConnect()

		}
	}

	componentDidMount() {
		const { navigation } = this.props
		{navigation.getParam('contact') ? this.loadContactDetail(navigation.getParam('contact')): 
		
		this.retrieveData()
	}
	}
}