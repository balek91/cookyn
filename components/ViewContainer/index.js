import React from 'react'
import styled from 'styled-components'

const StyledView = styled.View
`
flex: 1;
background-color: #fff;
align-items: ${props => props.align ? props.align : 'center'};

`

export default class ViewContainer extends React.Component {


    render(){
        const {align} = this.props;
        return(
            <StyledView align={align} style={this.props.style} >
                {this.props.children}
            </StyledView>
        );
    }
}