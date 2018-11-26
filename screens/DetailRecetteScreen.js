import React from 'react'
import TextCustom from '../components/TextCustom'
import ViewCustom from '../components/ViewContainer'

export default class ProfilScreen extends React.Component {

	state = {
		recette: null
	}

	render() {
		const { recette } = this.state
		return (
			<ViewCustom>
				{recette ?
					(<TextCustom text={'Bienvenue sur la page de detail de la recette :' + recette.libelleRecette} />)
					: (null)
				}
			</ViewCustom>
		);
	}

	componentDidMount() {
		const { navigation } = this.props
		this.setState({
			recette: navigation.getParam('recette', null)
		})
	}
}