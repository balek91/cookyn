import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Image} from 'react-native'

import addblue from '../../assets/icons/addblue.png'

const StyledTouchable = styled.TouchableOpacity
`margin-vertical: 10;
padding-vertical: 13;
`

const StyledImage = styled.Image
`
width: 50;
 height: 50;
`

export default class TouchablePlus extends Component {
    static propTypes = {
        onPressFunction: PropTypes.any,
    }

    render(){
        const {onPressFunction } = this.props
        return (
            <StyledTouchable onPress={onPressFunction}>
                <StyledImage source={require('../../assets/icons/addOrange.png')} />
            </StyledTouchable>   
        )
    }
}