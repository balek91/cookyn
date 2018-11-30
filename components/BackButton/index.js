import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Image, Text} from 'react-native'
import styled from 'styled-components'

const Touchable = styled.TouchableOpacity`
flex : 1;
flex-direction : row;
`
const ImageCustom = styled.Image`
margin-left: 12;
margin-right : 8;
`
const ViewFlex = styled.View`
flex : 1;`
const TextCustom = styled.Text`
color : #007AFF
font-size : 17`
export default class BackButton extends React.Component {

    static propTypes = {
        onPress: PropTypes.func
    }

    render(){
        const { onPress} = this.props;
        return(
                <Touchable onPress={onPress}>
                    <ViewFlex>
                        <ImageCustom source={ require('../../assets/icons/left-arrow.png') }/> 
                    </ViewFlex>
                    <ViewFlex>
                    <ViewFlex></ViewFlex>
                    <TextCustom>Profil</TextCustom>
                    <ViewFlex></ViewFlex>
                    </ViewFlex>
                </Touchable>
        );
    }
}