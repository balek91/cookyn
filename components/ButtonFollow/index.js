import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import styled from 'styled-components'

const Touchable = styled.TouchableOpacity`
width : 150;
backgroundColor : #E88110;
margin-vertical: 10;
padding :5px 0px 5px 0px;
margin-top : 10px;`

const StyledText = styled.Text
`
font-size:16;
font-weight:500;
color:white;
text-align:center;
`
export default class ButtonFollow extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        onChangeTextFunction: PropTypes.func,
        onPressRightIconFunction : PropTypes.func
    }

    render(){
        const {text, onPressFunction} = this.props;
        return(
        <View>
            <Touchable  onPress={onPressFunction} >
                <StyledText>
                    {text}
                </StyledText>
            </Touchable>
        </View>
        );
    }
}