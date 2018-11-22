import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledText = styled.Text`
    width: ${props => (props.width ? props.width : 300)};
    height: 40;
    background-color: #fff;
    border-radius: ${props => (props.width ? props.width / 2 : 300 / 2)};
    padding-horizontal: 16;
    font-size: 16;
    color: #000;
    border-color: ${props => (props.bordercolor ? props.bordercolor : "gray")};
    margin-vertical: 10;
    text-align: center;
    border-width: 0.5;
`;

export default class TextRadius extends React.Component {
    static propTypes = {
        text: PropTypes.string
    };
    render() {
        const { text } = this.props;
        return <StyledText>{text}</StyledText>;
    }
}
