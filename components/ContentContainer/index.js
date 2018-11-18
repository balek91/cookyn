import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Content = styled.View`
flex: 3;
justifyContent: flex-start;
alignItems: center;
`


export default class ContentContainer extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        onChangeTextFunction: PropTypes.func,
        onPressRightIconFunction : PropTypes.func
    }

    render(){
        return(
            <Content>
                  {this.props.children}
            </Content>
        )
    }


}