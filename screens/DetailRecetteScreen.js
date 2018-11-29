import React from 'react'
import Label from '../components/LabelEtapeList'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import axios from 'axios'


const Content = styled.ScrollView`
flex: 3;
backgroundColor: #F5FCFF;
width:100%
`

const StyledView = styled.View
	`
flex: 1;
justifyContent: center;
alignItems: center;
backgroundColor: #F5FCFF;
`
const Header = styled.View`
flex: 1;
justifyContent: center;
alignItems: center;
backgroundColor: #E88110;
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
  height : 150;
  width : 150;
  border-radius:75;
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


export default class DetailScreen extends React.Component {

	state = {
		idRecette: this.props.navigation.getParam('recette').idRecette,
		data: PropTypes.array,
	}

	render() {
		const { data } = this.state
		const PhotoRecette = require('../assets/icons/photoRecette.jpg')
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
			etapes.map((item) => {
				console.log(item.indexEtape + ' - ' + item.descriptionEtape)
			})
			return (
				<StyledView>
					<Content>
						<Header>
							<StyledImage source={PhotoRecette} />
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
		axios.get(`http://51.75.22.154:8080/Cookyn/recette/GetRecetteById/${this.state.idRecette}`)
			.then(res => {
				this.setState({
					data: res.data
				})
			})
	}
}