import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Header = styled.View
`
flex: 0.3;
justifyContent: center;
alignItems: center;
`
const StyledTextBold = styled.Text
  `
fontWeight: bold;
fontSize: 24;
`

export default class HeaderContainer extends React.Component {


	static propTypes = {
        titleText: PropTypes.string
    }
    
    render(){
        const {titleText} = this.props;
        return(
            <Header>
                <StyledTextBold>{titleText}</StyledTextBold>
            </Header>
        );
    }

}