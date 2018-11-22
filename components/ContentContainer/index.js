import React from 'react'
import styled from 'styled-components'

const Content = styled.View`
flex: 3;
justifyContent: flex-start;
alignItems: center;
`


export default class ContentContainer extends React.Component {
    render() {
        return (
            <Content>
                {this.props.children}
            </Content>
        )
    }


}