import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledView = styled.ScrollView
`
flex: 1;
background-color: #fff;
margin-top : 30;
`

export default class ScrollViewContainer extends React.Component {

	static propTypes = {
		data: PropTypes.array,
		onChangeTextFunction: PropTypes.func,
		onPressRightIconFunction : PropTypes.func
	}

	render(){
		return(
			<StyledView>
				{this.props.children}
			</StyledView>

		);
	}
}