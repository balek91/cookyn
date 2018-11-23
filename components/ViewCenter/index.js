import React from 'react'
import styled from 'styled-components'


const StyledView = styled.View`
justifyContent: center;
alignItems: center;
`


export default class ViewCenter extends React.Component {
    render(){
        return(
            <StyledView>
                {this.props.children}
            </StyledView>
        );
    }
}