import axios from 'axios'
import PropTypes from 'prop-types'
import React from 'react'
import {ImageBackground, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import ViewCenter from '../components/ViewCenter'
import Touchable from '../components/Touchable'
import TouchableLink from '../components/TouchableLink'
import DatePicker from 'react-native-datepicker'
import compare from '../utils/CompareDate'
import DialogInput from '../components/DialogInput'


import {Alert} from 'react-native';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import allTheActions from '../actions'
import { AsyncStorage } from 'react-native';



const Content = styled.ScrollView`
flex: 3;
backgroundColor: #FFFFFF;
width:100%;
backgroundColor: rgba(52, 52, 52, 0.1);
`

const StyledView = styled.View
	`
flex: 1;
justifyContent: center;
alignItems: center;
backgroundColor: rgba(52, 52, 52, 0.1);
`
const Header = styled.View`
flex: 1;
justifyContent: center;
alignItems: center;
backgroundColor:rgba(52, 52, 52, 0.1);
`

const Footer = styled.View`
flex: 1;
justifyContent: center;
alignItems: center;
backgroundColor: #E88110;
`

const StyledViewArray = styled.View`
justifyContent: center;
alignItems: flex-start;
backgroundColor: #F5FCFF;
border-width:2;
borderColor:grey;
margin: 0px 20px 20px 20px
`
//alignSelf:flex-start;


const StyledImage = styled.Image
	`
  height : 200;
  width : 300;
  border-radius:20;
`

const StyledIcon = styled.Image
	`
  height : 50;
  width : 50;
  margin:4%;
`
const StyledIconShare = styled.Image
	`
  height : 25;
  width : 25;
  marginLeft :20;
`

const AlignContentLeft = styled.View
	`
flex:1
justifyContent: flex-start;
alignItems: center;
flexDirection:row;
flex-grow: 1;
`
const AlignContentCenter = styled.View
	`
flex:1
justifyContent: center;
alignItems: center;
flexDirection:row;
flex-grow: 1;
`


const StyledTextBold = styled.Text
	`
fontWeight: bold;
fontSize: 24;
`

const StyledText = styled.Text
	`
fontWeight: 300;
fontSize: 24;
`
const StyledTextArray = styled.Text
	`
fontWeight: 300;
fontSize: 16;
margin:15px 0px 10px 25px;
`

const LabelLeft = styled.Text
	`
fontWeight: bold;
fontSize: 16;
margin:15px 0px 10px 25px;
`

const LabelRight = styled.Text
	`
fontWeight: 300;
fontSize: 16;
margin:15px 0px 10px 5px;
`


class DetailScreen extends React.Component {

	state = {
		idRecette: this.props.navigation.getParam('recette').idRecette,
		data: PropTypes.array,
		user: null,
		currentDate: new Date(),
		isFavori: false,
		changeDate : null,
		isCreator : null,
		isDialogVisible : false
	}

	addFavorite =(idRecette) => {
		console.log(`http://51.75.22.154:8080/Cookyn/favoris/AddFavoris/${idRecette}/${this.state.user}`)
		axios.get(`http://51.75.22.154:8080/Cookyn/favoris/AddFavoris/${idRecette}/${this.state.user}`)
		.then((response) => {
			if (response.status == 200){
				alert('La recette à été ajouté')
				this.setState({
					isFavori: true
				})
			}
		})
	}

	deleteFavorite =(idRecette) => {
		axios.get(`http://51.75.22.154:8080/Cookyn/favoris/RemoveFavoris/${this.state.user}/${idRecette}`)
		.then((response) => {
			if (response.status == 200){
				alert('La recette à été supprimé des favoris')
				this.setState({
					isFavori: false
				})
			}
		})
	}

	goProfilPage = (idUser) => {
		this.props.actions.user.getUserConnect(idUser)
		const {navigation} = this.props
		navigation.push('ProfilUser',{
			contact : idUser
		} )
	}

	render() {
		const { data } = this.state
		const PhotoRecette = require('../assets/icons/generique.png')
		const IconCourse = require('../assets/icons/panier.png')
		const IconeShare = require('../assets/icons/share.png')
		

		if (data.etapes == undefined) {
			return (
				<StyledView>
					{'error'}
				</StyledView>
			)
		} else {
			const ingredients = data.ingredients
			const etapes = data.etapes
			return (
				<StyledView>
				<ImageBackground source={require('../assets/images/detailBack.jpg')} style={{width: '100%', height: '100%'}}>

					<Content>
						<Header>
							<StyledImage source={(data.recette.urlRecette) ? {uri:data.recette.urlRecette} : PhotoRecette} />
							<AlignContentCenter>
							<StyledTextBold>{data.recette.libelleRecette}</StyledTextBold>
							</AlignContentCenter>
						</Header>
						<AlignContentLeft>
							<LabelLeft>{'Catégorie Recette :'}</LabelLeft>
							<LabelRight>{data.recette.catRecette}</LabelRight>
						</AlignContentLeft>
						<AlignContentLeft>
							<LabelLeft>{'Difficulté :'}</LabelLeft>
							<LabelRight>{data.recette.diffRecette}</LabelRight>
						</AlignContentLeft>
						<AlignContentLeft>
							<LabelLeft>{'Prix estimé :'}</LabelLeft>
							<LabelRight>{`${data.recette.prix} €`}</LabelRight>
						</AlignContentLeft>
						<AlignContentLeft>
							<LabelLeft>{'Temps de préparation :'}</LabelLeft>
							<LabelRight>{`${data.recette.tempPrepaRecette} min`}</LabelRight>
						</AlignContentLeft>
						{this.state.isCreator ?
						
							null
					:
					<AlignContentLeft>
							<LabelLeft>{'Recette crée par :'}</LabelLeft>
							<TouchableLink
								text={data.recette.user.usernameUser}
								onPressFunction={()=> this.goProfilPage(data.recette.user.idUser)}
								widthTouchable={200}
								backgroundColorTouchable='#78C9DC'
								colorText='#000'
							/>
						</AlignContentLeft>
					}
						
						<AlignContentLeft>
							<StyledIcon source={IconCourse} />
							<StyledText>{'INGRÉDIENTS'}</StyledText>
						</AlignContentLeft>
						<StyledViewArray>
							{ingredients.map((item, index) => {
								return (<StyledTextArray key={`i${index}`}>{`${item.ingredient.libelleIngredient} ( ${item.quantite} ${item.unite.libelleUnite} )`}</StyledTextArray>)
							})}
						</StyledViewArray>
						<AlignContentLeft>
							<StyledIcon source={IconCourse} />
							<StyledText>{'ÉTAPES'}</StyledText>
						</AlignContentLeft>
						<StyledViewArray>
							{etapes.map((item, index) => {
								return (<StyledTextArray key={`e${index}`}>{`${item.indexEtape} - ${item.descriptionEtape}`}</StyledTextArray>)
							})}
						</StyledViewArray>
						<ViewCenter>

						{this.state.isFavori ? 
							<Touchable
								text='Supprimer de mes Favoris'
								onPressFunction={() => this.deleteFavorite(this.state.idRecette)}
								widthTouchable={200}
								backgroundColorTouchable='#E88110'
								colorText='#FFF'
							/> :
							<Touchable
								text='Ajouter à mes Favoris'
								onPressFunction={() => this.addFavorite(this.state.idRecette)}
								widthTouchable={200}
								backgroundColorTouchable='#E88110'
								colorText='#FFF'
							/>
							}
							 <DatePicker
								style={{width: 200}}
								locale={'fr'}
								date={this.state.currentDate}
								mode="date"
								placeholder="select date"
								format="DD-MM-YYYY"
								minDate={this.state.currentDate}
								iconSource={require('../assets/icons/calendar.png')} 
								maxDate="2050-06-01"
								confirmBtnText="Ok"
								cancelBtnText="Annuler"
								customStyles={{
								dateIcon: {
									position: 'absolute',
									left: 0,
									top: 4,
									marginLeft: 0,
								},
								dateInput: {
									marginLeft: 36
								}
								// ... You can check the source to find the other keys.
								}}
								onDateChange={(date) => {this.setState({currentDate: date, changeDate : true})}}
							/>

							<Touchable
								text='Ajouter à mon calendrier'
								onPressFunction={this.addCalandarConfirm}
								widthTouchable={200}
								backgroundColorTouchable='#E88110'
								colorText='#FFF'
							/>

							{this.state.isCreator ?
							<TouchableLink
							text={'Supprimer ma recette'}
							onPressFunction={()=> this.deleteHandle()}
							widthTouchable={200}
							backgroundColorTouchable='#78C9DC'
							colorText='#000'
						/>
						
						:
						null
						}
						</ViewCenter>
						<DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Confirmation de la suppression"}
            message={"Veuillez entrer votre mot de passe"}
						hintInput ={"mot de passe"}
						cancelText = {'Annuler'}
            submitText = {'Envoyer'}
            secureTextEntry = {true}
            submitInput={ (inputText) => {this.sendInput(inputText)} }
            closeDialog={ () => {this.setState({isDialogVisible : false})}}>
						</DialogInput>
					</Content>
								</ImageBackground>

				</StyledView>
			)
		}
	}

	componentWillMount() {
		const { navigation } = this.props
		this.setState({
			idRecette: navigation.getParam('recette').idRecette
		})
		this.retrieveData()
		axios.get(`http://51.75.22.154:8080/Cookyn/recette/GetRecetteById/${this.state.idRecette}`)
			.then(res => {
				console.log(res.data)
				this.setState({
					data: res.data,
				})
				this.userIsCreator(res.data)
			})
			
	}

	deleteHandle =() =>{
		Alert.alert(
			'Confirmation',
			`La recette "${this.state.data.recette.libelleRecette}" va être supprimer définitivement`,
			[
			  {text: 'Annuler', onPress: () => console.log('NO Pressed'), style: 'cancel'},
			  {text: 'Confirmer', onPress: () => this.setState({ isDialogVisible : true})},
			]
		  )
	}



	userIsCreator = async (data) =>{
		
		var idCreator = data.recette.user.idUser
		var idConnected = await AsyncStorage.getItem('idUser')
		if (idCreator == idConnected){
			this.setState({
				isCreator : true
			})
		} else {
			this.setState({
				isCreator : false
			})
		}
	}


	addCalandar = () => {
		let user = {
			idUser : this.state.user,
		}
		let recette = {
			idRecette : this.state.data.recette.idRecette,
		}
		let newDate = this.state.currentDate
		if (this.state.changeDate) {
			newDate= compare.stringToDate(this.state.currentDate,"dd-mm-yyyy","-")
		}
		let json = {
			user : user,
			recette: recette,
			datePlanning:newDate
		}
		console.log("DAAAAAATTTTEEE ",json )
		axios.post('http://51.75.22.154:8080/Cookyn/planning/AddPlanning',json).then((response) => {
      	if (response.status =='200'){
			alert('La recette a bien été ajoutée à votre calendrier!')
			this.setState({
				currentDate : new Date()
			})
    		}
		})
	}


	addCalandarConfirm =() => {
		let newDate =this.state.currentDate
		if (this.state.changeDate){
			newDate = compare.stringToDate(this.state.currentDate,"dd-mm-yyyy","-")
		} 
			

		Alert.alert(
			'Confirmation',
			`La recette "${this.state.data.recette.libelleRecette}" va être ajoutée au calendrier ${newDate.toLocaleDateString('fr')}`,
			[
			  {text: 'Annuler', onPress: () => console.log('NO Pressed'), style: 'cancel'},
			  {text: 'Confirmer', onPress: () => this.addCalandar()},
			]
		  )
}


	retrieveData = async () => {
		const value = await AsyncStorage.getItem('idUser')
		this.setState({
			user: value
		})
		axios.get(`http://51.75.22.154:8080/Cookyn/favoris/ExistFavoris/${value}/${this.state.idRecette}`)
		.then(res => {
			console.log('RRREEEESSS',res)
			this.setState({
				isFavori: res.data,
			})
		})
	 
	}
}

const mapStateToProps = state => {
    return {
        abonnementList: state.user.abonnementList,
        abonneList: state.user.abonneList,
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
)(DetailScreen)