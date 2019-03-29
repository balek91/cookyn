import PropTypes from 'prop-types'
import React from 'react'
import { Image, View } from 'react-native'
import OptionsMenu from 'react-native-options-menu'
import styled from 'styled-components'
import { colors } from 'react-native-elements';


const StyledImage = styled.Image
	`
  height : 150;
  width : 300;
  border-radius:20;
  borderColor:black;
  borderWidth:1;
`

export default class OptionPicker extends React.Component {

    static propTypes = {
        action: PropTypes.array,
        option: PropTypes.array,
        image: PropTypes.string,
    }

    render() {
        const { action, option, image } = this.props;
        const PhotoIcon = require('../../assets/icons/addPhoto.png')
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <OptionsMenu
                    button={PhotoIcon}
                    buttonStyle={{ width: 50, height: 50, margin: 7.5, resizeMode: "contain" }}
                    options={option}
                    actions={action} />
                {image &&
                    <StyledImage source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        );
    }
}