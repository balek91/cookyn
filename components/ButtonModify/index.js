import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Image} from 'react-native'

const StyledTouchable = styled.TouchableOpacity
`margin-vertical: 10;
padding-vertical: 13;
`

const StyledImage = styled.Image
`
width: 30;
 height: 30;
`

export default class TouchableModifier extends Component {
    static propTypes = {
        onPressFunction: PropTypes.any,

    }

    render(){
        const {onPressFunction } = this.props;
        return (
            <StyledTouchable onPress={onPressFunction}>
                 <StyledImage source={require('../../assets/icons/Modifier.png')} />
            </StyledTouchable>   
        );
    }
}