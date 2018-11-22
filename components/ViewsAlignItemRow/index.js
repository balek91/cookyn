import React from 'react'
import styled from 'styled-components'


const StyledView = styled.View`
justifyContent: center;
alignItems:  ${props => props.align ? props.align : 'center'};
flexDirection:row;
flex-grow: 1;
`

export default class ViewAlignItemRow extends React.Component {
    render(){
        return(
            <StyledView>
                {this.props.children}
            </StyledView>
        );
    }
}