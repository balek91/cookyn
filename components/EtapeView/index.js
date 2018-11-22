import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'
import styled from 'styled-components'
import InputText from '../TextInput/index'
import ViewAlignItemRow from '../ViewsAlignItemRow/index'

const StyledView = styled.View
    `
align-items:flex-end;
flex-grow: 1;
justify-content: center;
padding-vertical: 16;
flex-direction: row;
`

const StyledText = styled.Text
    ` 
width:90;
height:40;
background-color:#fff;
padding-horizontal:16;
border-radius:70;
padding:2%;
font-size:16;
color:#707070;
margin-vertical: 10;
text-align:center;
font-size:16;
font-weight:500;`

export default class EtapeView extends React.Component {

    static propTypes = {
        array: PropTypes.array,
        onChangeTextFunction: PropTypes.func,
        onPressRightIconFunction: PropTypes.func
    }


    render() {
        const { array, onChangeTextFunction, onPressRightIconFunction } = this.props;
        return (
            <View>
                {
                    array
                        .sort((itemA, itemB) => itemA.ordre > itemB.ordre)
                        .map((item, index) => (
                            <View key={'etape' + item.ordre}>
                                <ViewAlignItemRow>
                                    <StyledText>{'Étape n° '}</StyledText>
                                    <InputText
                                        onChangeTextFunction={(val) => onChangeTextFunction(index, val)}
                                        keyboard='number-pad'
                                        value={item.ordre.toString()}
                                        width={60}
                                    />
                                </ViewAlignItemRow>
                                <ListItem
                                    key={index}
                                    title={item.etape}
                                    rightIcon={{ name: 'delete' }}
                                    onPressRightIcon={onPressRightIconFunction(index)}
                                    input={item.ordre}
                                />
                            </View>
                        ))
                }
            </View>

        )
    }
}