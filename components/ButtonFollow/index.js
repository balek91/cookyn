import React from 'react'
import PropTypes from 'prop-types'
import Touchable from '../Touchable'
import ViewCustom from '../ViewContainer'

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