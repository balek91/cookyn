import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTextInput = styled.TextInput`
  width: ${props => props.width ? props.width : 300};
  height: 40;
  background-color: #fff;
  border-radius: 50;
  padding-horizontal: 16;
  font-size: 16;
  color: #000;
  border-color : ${props => props.bordercolor ? props.bordercolor : 'gray'};
  margin-vertical: 10;
  text-align: center;
  border-width: 0.5;
`;

export default class InputText extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    reference: PropTypes.any,
    placeholderText: PropTypes.string,
    onChangeTextFunction: PropTypes.func,
    onSubmitEditingFunction: PropTypes.func,
    keyboard: PropTypes.string,
    multi: PropTypes.bool,
    isPassword: PropTypes.bool
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
      value,
      isPassword,
      bordercolor
    } = this.props;

    return (
      <StyledTextInput
        width={width}
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
        }
      />
    )
  }
}