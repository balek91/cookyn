import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ImageContainer = styled.View`
flex : 1;
`

const TextContainer = styled.View`
flex : 6;
`

const StyledTouchable = styled.TouchableOpacity`
flex : 1;
height : 80px;
flex-direction : row;
align-items : center;
justify-content : center;
flex-shrink : 0;
border-bottom-width : 0.3px;
border-bottom-color : #707070;
`

const StyledImage = styled.Image`
height: 26;
width: 26; 
`

const TextPrincipal = styled.Text`
font-size: 17;
padding-left: 20;
line-height: 24;
`

const TextDetail = styled.Text`
font-size: 13;
padding-left: 20;
line-height: 24;
`



export default class Touchable extends React.Component {

    static propTypes = {
        textPrincipal: PropTypes.string,
        textDetail: PropTypes.string,
        onPressFunction: PropTypes.func
    }

    render() {
        const { textPrincipal, textDetail, onPressFunction } = this.props;
        return (

                <StyledTouchable onPress={onPressFunction}>
                    <TextContainer>
                        <TextPrincipal>{textPrincipal}</TextPrincipal>
                        <TextDetail>{textDetail}</TextDetail>
                    </TextContainer>
                    <ImageContainer>
                    <StyledImage
                    source={require('../../assets/icons/right-arrow.png')}
                />
                    </ImageContainer>
                </StyledTouchable>

                
        )
    }
}