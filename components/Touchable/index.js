import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

export default class Touchable extends React.Component {

    static propTypes = {
        text : PropTypes.string,
        onPressFunction: PropTypes.func,
        widthTouchable: PropTypes.number,
        backgroundColorTouchable: PropTypes.string,
        colorText: PropTypes.string
      }

    render(){
        


        const {text, onPressFunction, widthTouchable, backgroundColorTouchable,colorText } = this.props;
        const StyledTouchable = styled.TouchableOpacity
        `
        width:${widthTouchable};
        backgroundColor:${backgroundColorTouchable};
        borderRadius: ${widthTouchable/2};
        marginVertical: 10;
        paddingVertical: 13;
        `

        const StyledText = styled.Text
        `
        fontSize:16;
        fontWeight:500;
        color:${colorText};
        textAlign:center;
        `

        return (
            <StyledTouchable  onPress={onPressFunction}>
                 <StyledText>
                 {text}
                 </StyledText>

            </StyledTouchable>
             
               
               
        );
    }
}