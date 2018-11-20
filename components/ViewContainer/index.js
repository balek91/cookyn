import React from 'react'
import styled from 'styled-components'
import {Constants} from "expo"

const StyledView = styled.View
`
flex: 1;
background-color: #fff;
align-items: ${props => props.align ? props.align : 'center'};
padding-top:${Constants.statusBarHeight}
`

export default class ViewContainer extends React.Component {


    render(){
        const {align} = this.props;
        return(
            <StyledView align={align}>
                {this.props.children}
            </StyledView>
        );
    }
}