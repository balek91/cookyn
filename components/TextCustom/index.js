import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledText = styled.Text
`
font-size: ${props => props.fontsize ? props.fontsize : 15};
padding-left: 20;
color: ${props => props.color ? props.color : 'rgba(96,100,109, 1)'};
line-height: 24;
font-weight : ${props => props.fontweight ? props.fontweight : 400}
`

export default class TextCustom extends React.Component {

    static propTypes = {
        text: PropTypes.string,
        fontsize: PropTypes.number,
        onPress : PropTypes.func,
        fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        color: PropTypes.string,
    }

    render(){
        const {text,fontsize, onPress,color, fontweight} = this.props;
        return(
            <StyledText fontsize={fontsize} fontweight={fontweight} color={color} onPress={onPress ? onPress : null}>{text}</StyledText>
        );
    }
}