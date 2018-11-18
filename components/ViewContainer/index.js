import React from 'react'
import PropTypes from 'prop-types'
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

    static propTypes = {
        data: PropTypes.array,
        onChangeTextFunction: PropTypes.func,
        onPressRightIconFunction : PropTypes.func
    }

    render(){
        const {align} = this.props;
        return(
            <StyledView align={align}>
                {this.props.children}
            </StyledView>
        );
    }
}