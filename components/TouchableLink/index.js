import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTouchable = styled.TouchableOpacity
`
background-color:rgba(52, 52, 52, 0.1);
margin-vertical: 10;
padding-vertical: 13;
padding-left:5;
`
const StyledText = styled.Text
`
font-size:16;
font-weight:500;
color:${props => props.colorText ? props.colorText : '#000'};
textDecorationLine:underline;
text-align:left;
`
export default class TouchableLink extends React.Component {

    static propTypes = {
        text : PropTypes.string,
        onPressFunction: PropTypes.func,
        widthTouchable: PropTypes.number,
        backgroundColorTouchable: PropTypes.string,
        colorText: PropTypes.string
    }

    render(){
        const {text, onPressFunction, widthTouchable, backgroundColorTouchable,colorText } = this.props
        return (
            <StyledTouchable widthTouchable={widthTouchable} colorText={colorText} backgroundColorTouchable={backgroundColorTouchable} onPress={onPressFunction}>
                <StyledText>
                    {text}
                </StyledText>
            </StyledTouchable>   
        )
    }
}