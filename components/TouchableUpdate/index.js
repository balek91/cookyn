import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTouchable = styled.TouchableOpacity
`
padding-bottom : 5px;
`
const StyledImage = styled.Image
`
`

export default class Touchable extends React.Component {

    static propTypes = {
        onPressFunction: PropTypes.func,
    }

    render(){
        const { onPressFunction} = this.props
        const PhotoIcon = require('../../assets/icons/Modifier.png')
        return (
            <StyledTouchable  onPress={onPressFunction}>
                <StyledImage source={PhotoIcon}  />
            </StyledTouchable>   
        );
    }
}