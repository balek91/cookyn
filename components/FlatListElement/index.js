import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Text} from 'react-native'

// const StyledView = styled.View`
// flex : 1;
// height : 30px;
// background-color:blue;
// flex-direction : row;
// `
const ImageContainer = styled.View`
flex : 1;
background-color : yellow`

const TextContainer = styled.View`
flex : 3;
background-color : green`

const StyledTouchable = styled.TouchableOpacity`
flex : 1;
height : 30px;
background-color:blue;
flex-direction : row;
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
                        <Text>{textPrincipal}</Text>
                    </TextContainer>
                    <ImageContainer>
                    </ImageContainer>
                </StyledTouchable>

                
        )
    }
}


//  <StyledView>
//                     <StyledTextPrincipal>
//                         {textPrincipal}
//                     </StyledTextPrincipal>
//                     <StyledTextDetail>
//                         {textDetail}
//                     </StyledTextDetail>
//                 </StyledView>
//                 <StyledImage
//                     source={require('../../assets/icons/right-arrow.png')}
//                 />