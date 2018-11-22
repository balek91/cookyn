import React from 'react'
import styled from 'styled-components'

const StyledView = styled.ScrollView
`
flex: 1;
background-color: #fff;
margin-top : 30;
`

export default class ScrollViewContainer extends React.Component {

	render(){
		return(
			<StyledView>
				{this.props.children}
			</StyledView>

		);
	}
}