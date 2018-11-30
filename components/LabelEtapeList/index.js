import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledText = styled.Text
`
font-size: ${props => props.fontsize ? props.fontsize : 15};
height:${props => props.height ? props.height : 100};
border-radius: ${props => props.radius ? props.radius : 0}
border-width:${props => props.radius ? 0.5 : 0}
color:#707070;
background-color:#fff;
padding-horizontal:10;
marginVertical: 10;
fontWeight:bold;
padding:2%;
textAlign:center;
alignSelf:flex-start;

`

export default class LabelCustom extends React.Component {

    static propTypes = {
        text: PropTypes.string,
        fontsize: PropTypes.number,
        height : PropTypes.number,
        radius: PropTypes.number
    }

    render(){
        const {text,fontsize, height,radius} = this.props;
        return(
            <StyledText height={height} fontsize={fontsize} radius={radius}>{text}</StyledText>
        );
    }
}