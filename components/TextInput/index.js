    import React from 'react'
    import PropTypes from 'prop-types'
    import styled from 'styled-components/native'



    export default class InputText extends React.Component {

        static propTypes = {
            width: PropTypes.number,
            reference : PropTypes.any,
            placeholderText: PropTypes.string,
            onChangeTextFunction: PropTypes.func,
            onSubmitEditingFunction: PropTypes.func,
            keyboard: PropTypes.string,
            multi: PropTypes.bool,
            isPassword:PropTypes.bool,
        }


        render(){
            
            const {reference,placeholderText,onChangeTextFunction,onSubmitEditingFunction,keyboard, multi, width, isPassword} = this.props;
    const StyledTextInput = styled.TextInput
    `
    width:${width};
        height:40;
        backgroundColor:#fff;
        borderRadius: 50;
        paddingHorizontal:16;
        fontSize:16;
        color:#000;
        marginVertical: 10;
        textAlign:center;
        borderWidth:0.5;  
    `
            return(
                <StyledTextInput 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder={placeholderText ? placeholderText : ''}
                placeholderTextColor = "#707070"
                ref={reference ? reference : null}
                keyboardType={keyboard ? keyboard : "default"}
                multiline={multi ? multi : false}
                secureTextEntry={isPassword ? isPassword : false}
                onChangeText = {onChangeTextFunction ? onChangeTextFunction : null}
                onSubmitEditing={()=> onSubmitEditingFunction ? onSubmitEditingFunction : null}
                />  
            );
        }
    }