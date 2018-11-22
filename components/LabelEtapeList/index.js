import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledText = styled.Text
`
font-size: ${props => props.fontsize ? props.fontsize : 15};
width: ${props => props.width ? props.width : 200};
height:${props => props.height ? props.height : 100};
color:#707070;
background-color:#fff;
padding-horizontal:10;
marginVertical: 10;
fontWeight:bold;
padding:10%;
textAlign:center;
`

export default class LabelCustom extends React.Component {

    static propTypes = {
        text: PropTypes.string,
        fontsize: PropTypes.number,
        width : PropTypes.number,
        height : PropTypes.number,
    }

    render(){
        const {text,fontsize, width, height} = this.props;
        return(
            <StyledText width={width} height={height} fontsize={fontsize}>{text}</StyledText>
        );
    }
}