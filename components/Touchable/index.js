import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTouchable = styled.TouchableOpacity
`
width:${props => props.widthTouchable ? props.widthTouchable : 300};
background-color:${props => props.backgroundColorTouchable ? props.backgroundColorTouchable :'#78C9DC'};
border-radius: ${props => props.widthTouchable ? props.widthTouchable : 150};
margin-vertical: 10;
padding-vertical: 13;
`
const StyledText = styled.Text
`
font-size:16;
font-weight:500;
color:${props => props.colorText ? props.colorText : '#FFF'};
text-align:center;
`
export default class Touchable extends React.Component {

    static propTypes = {
        text : PropTypes.string,
        onPressFunction: PropTypes.func,
        widthTouchable: PropTypes.number,
        backgroundColorTouchable: PropTypes.string,
        colorText: PropTypes.string
    }

    render(){
        const {text, onPressFunction, widthTouchable, backgroundColorTouchable,colorText } = this.props;
        return (
            <StyledTouchable widthTouchable={widthTouchable} colorText={colorText} backgroundColorTouchable={backgroundColorTouchable} onPress={onPressFunction}>
                <StyledText>
                    {text}
                </StyledText>
            </StyledTouchable>   
        );
    }
}