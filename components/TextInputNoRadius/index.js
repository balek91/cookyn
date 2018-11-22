import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const StyledTextInput = styled.TextInput`

width: ${props => props.width ? props.width : 300};
height:${props => props.height ? props.height : 100};
backgroundColor:#fff;
paddingHorizontal:16;
fontSize:16;
color:#000;
marginVertical: 10;
textAlign:center;
fontSize:16;
fontWeight:500;
borderWidth:0.5;
margin:5%;
`

export default class InputTextNoRadius extends React.Component {

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        reference: PropTypes.any,
        placeholderText: PropTypes.string,
        onChangeTextFunction: PropTypes.func,
        onSubmitEditingFunction: PropTypes.func,
        keyboard: PropTypes.string,
        multi: PropTypes.bool,
        isPassword: PropTypes.bool,
        bordercolor: PropTypes.string,
        value: PropTypes.string
    }
    render() {
        const {
            reference,
            placeholderText,
            onChangeTextFunction,
            onSubmitEditingFunction,
            keyboard,
            multi,
            width,
            height,
            value,
            isPassword,
            bordercolor
        } = this.props;
        return (
            <StyledTextInput
                width={width}
                height={height}
                bordercolor={bordercolor}
                value={value}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder={placeholderText ? placeholderText : ''}
                placeholderTextColor='#707070'
                ref={reference ? reference : null}
                keyboardType={keyboard ? keyboard : 'default'}
                multiline={multi ? multi : false}
                secureTextEntry={isPassword ? isPassword : false}
                onChangeText={onChangeTextFunction ? onChangeTextFunction : null}
                onSubmitEditing={() =>
                    onSubmitEditingFunction ? onSubmitEditingFunction : null
                } />
        )
    }
}