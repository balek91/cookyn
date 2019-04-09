import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTouchable = styled.TouchableOpacity
`
`
const StyledText = styled.Text
`
font-size : 15;
text-align:center;
`

const StyledTextNumber = styled.Text
`
font-size : 25;
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
        const {number, text, onPressFunction } = this.props
        return (
            <StyledTouchable onPress={onPressFunction}>
                <StyledTextNumber>
                    {number}
                </StyledTextNumber>
                <StyledText>
                    {text}
                </StyledText>
            </StyledTouchable>   
        )
    }
}