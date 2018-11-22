import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledText = styled.Text
`
font-size: ${props => props.fontsize ? props.fontsize : 15};;
padding-left: 20;
color: rgba(96,100,109, 1);
line-height: 24;
`

export default class TextCustom extends React.Component {

    static propTypes = {
        text: PropTypes.string,
        fontsize: PropTypes.number,
    }

    render(){
        const {text,fontsize} = this.props;
        return(
            <StyledText fontsize={fontsize}>{text}</StyledText>
        );
    }
}