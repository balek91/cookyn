import React from 'react'
import Label from '../components/LabelEtapeList'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import axios from 'axios'

import ViewTwoItem from '../components/ViewsAlignItemRow'

const Content = styled.ScrollView`
flex: 3;
backgroundColor: #E88110;
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
backgroundColor: #F5FCFF;
`

const StyledImage = styled.Image
  `
  height : 150;
  width : 150;
  border-radius:75;
`

const AlignContent = styled.View
`
flex:1
justifyContent: center;
alignItems: center;
flexDirection:row;
flex-grow: 1;
`

const StyledTitle = styled.View
`
justifyContent: center;
alignItems: center;
padding:2%
`


const StyledTextBold = styled.Text
  `
fontWeight: bold;
fontSize: 24;
`

const StyledTextItalic = styled.Text
  `
fontWeight: 100;
font-style: italic;
fontSize: 24;
`


export default class DetailScreen extends React.Component {

	state = {
		idRecette: this.props.navigation.getParam('recette').idRecette,
		data : PropTypes.array
	}

	render() {
		const { data } = this.state
		data.etapes == undefined ? console.log('error') : console.log(data.recette.libelleRecette)
		if (data.etapes == undefined) {
			return (
				<StyledView>
					{'error'}
				</StyledView>
			)
		} else {
		return (
			<StyledView>
				 <Header>
				 <StyledTextBold>{data.recette.libelleRecette}</StyledTextBold>
				 </Header>
				 <Content>
					 <AlignContent>
					 <Label width={180} height={40} text={'Catégorie Recette :'} />
					 <Label width={190} height={40} text={data.recette.catRecette} />
					 </AlignContent>
					 <AlignContent>
					 <Label width={180} height={40} text={'Difficulté Recette :'} />
					 <Label width={190} height={40} text={data.recette.diffRecette} />
					 </AlignContent>
					 <AlignContent>
					 <Label width={180} height={40} text={'Prix Recette :'} />
					 <Label width={190} height={40} text={data.recette.prix} />
					 </AlignContent>
					 <AlignContent>
					 <Label width={180} height={40} text={'Temps de préparation :'} />
					 <Label width={190} height={40} text={data.recette.tempPrepaRecette + 'min'} />
					 </AlignContent>
					 <StyledTitle>
						 <StyledTextBold>{'Étapes'}</StyledTextBold>
					 </StyledTitle>
					 
				</Content>
				
			</StyledView>
		)}	
	}

	componentWillMount() {
		const { navigation } = this.props
		this.setState({
			idRecette: navigation.getParam('recette').idRecette
		})
		axios.get('http://51.75.22.154:8080/Cookyn/recette/ByIdRecetteAll/'+ this.state.idRecette)
		.then(res =>{
			this.setState({
				data : res.data
			})
		})
	}
}