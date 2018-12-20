import axios from 'axios'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'
import ViewCenter from '../components/ViewCenter'
import Touchable from '../components/Touchable'
import TouchableLink from '../components/TouchableLink'
import Axios from 'axios'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import allTheActions from '../actions'
import { AsyncStorage } from 'react-native';



const Content = styled.ScrollView`
flex: 3;
backgroundColor: #FFFFFF;
width:100%
`

const StyledView = styled.View
	`
flex: 1;
justifyContent: center;
alignItems: center;
backgroundColor: #FFFFFF;
`
const Header = styled.View`
flex: 1;
justifyContent: center;
alignItems: center;
backgroundColor: #FFFFFF;
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
border-radius:10;
border-width:0.5;
margin: 0px 20px 20px 20px
`
//alignSelf:flex-start;


const StyledImage = styled.Image
	`
  height : 300;
  width : 300;
  border-radius:20;
  borderColor:black;
  borderWidth:1;
`

const StyledIcon = styled.Image
	`
  height : 50;
  width : 50;
  margin:4%;
`

const AlignContentLeft = styled.View
	`
flex:1
justifyContent: flex-start;
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
fontWeight: 300;
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
		user: null
	}

	addFavorite =(idRecette) => {
		console.log(`http://51.75.22.154:8080/Cookyn2/favoris/AddFavoris/${idRecette}/${this.state.user}`)
		Axios.get(`http://51.75.22.154:8080/Cookyn2/favoris/AddFavoris/${idRecette}/${this.state.user}`)
		.then((response) => {
			if (response.status == 200){
				alert('La recette à été ajouté')
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
		const IconCourse = require('../assets/icons/liste_de_courses.png')
		const IconFb = require('../assets/icons/reseaux_sociales/facebook.png')
		const IconMail = require('../assets/icons/reseaux_sociales/mail.png')
		const IconTwitter = require('../assets/icons/reseaux_sociales/twitter.png')
		const IconWA = require('../assets/icons/reseaux_sociales/whatsapp.png')

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
					<Content>
						<Header>
							<StyledImage source={(data.recette.urlRecette) ? {uri:data.recette.urlRecette} : PhotoRecette} />
							<StyledTextBold>{data.recette.libelleRecette}</StyledTextBold>
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
							<LabelRight>{data.recette.prix}</LabelRight>
						</AlignContentLeft>
						<AlignContentLeft>
							<LabelLeft>{'Temps de préparation :'}</LabelLeft>
							<LabelRight>{`${data.recette.tempPrepaRecette} min`}</LabelRight>
						</AlignContentLeft>
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
							<Touchable
								text='Ajouter à mes Favoris'
								onPressFunction={() => this.addFavorite(this.state.idRecette)}
								widthTouchable={200}
								backgroundColorTouchable='#78C9DC'
								colorText='#FFF'
							/>
							<Touchable
								text='Ajouter à mon calendrier'
								onPressFunction={() =>console.log('lol2')}
								widthTouchable={200}
								backgroundColorTouchable='#78C9DC'
								colorText='#FFF'
							/>
						</ViewCenter>
						<Footer>
							<StyledTextBold>{'Partagez cette recette'}</StyledTextBold>
							<AlignContentLeft>
								<StyledIcon source={IconFb} />
								<StyledIcon source={IconMail} />
								<StyledIcon source={IconTwitter} />
								<StyledIcon source={IconWA} />
							</AlignContentLeft>
						</Footer>
					</Content>


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
		axios.get(`http://51.75.22.154:8080/Cookyn2/recette/GetRecetteById/${this.state.idRecette}`)
			.then(res => {
				console.log(res.data)
				this.setState({
					data: res.data,
				})
			})
	}

	retrieveData = async () => {
		const value = await AsyncStorage.getItem('idUser')
		this.setState({
			user: value
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