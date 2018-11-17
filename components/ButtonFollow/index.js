import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Touchable from '../Touchable'
import ViewCustom from '../ViewContainer'


const StyledView = styled.View
`
flex: 1;
background-color: #fff;
align-items: center;
`

export default class ButtonFollow extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        onChangeTextFunction: PropTypes.func,
        onPressRightIconFunction : PropTypes.func
    }

    render(){
        const {text, onPressFunction} = this.props;
        return(
        <ViewCustom>
            <Touchable
                text={text}
                onPressFunction={onPressFunction}
            />
        </ViewCustom>
        );
    }
}