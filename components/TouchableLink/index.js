import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTouchable = styled.TouchableOpacity
`
background-color:${props => props.backgroundColorTouchable ? props.backgroundColorTouchable :'rgba(52, 52, 52, 0.1)'};
padding-left:5;
padding-right:5;
bottom:100;
`
const StyledText = styled.Text
`
font-size:16;
font-weight:bold;
color:${props => props.colorText ? props.colorText : '#000'};
text-align:center;
padding-left:5;
padding-right:5;
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
        const {text, onPressFunction, widthTouchable, backgroundColorTouchable,colorText } = this.props;
        return (
                <StyledText onPress={onPressFunction}>
                    {text}
                </StyledText>
        );
    }
}