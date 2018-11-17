import React from 'react'
import PropTypes from 'prop-types'
import {View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'
import styled from 'styled-components'
import InputText from '../TextInput/index'

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
        data: PropTypes.array,
        onChangeTextFunction: PropTypes.func,
        onPressRightIconFunction : PropTypes.func
    }
  

    render(){
        const {data, onChangeTextFunction, onPressRightIconFunction} = this.props;
        return(
            <View>
            {
             data
             .sort((itemA, itemB) => itemA.ordre > itemB.ordre )
              .map((item, index) => (
                <View key={'etape' + item.ordre}>
                  <StyledView>
                  <StyledText>{'Étape n° '}</StyledText> 
                     <InputText
                onChangeTextFunction={(val) => onChangeTextFunction(index, val)}
                keyboard='number-pad'
                value={item.ordre.toString()}  
                width={60}
                />
                    </StyledView>
                <ListItem
                  key={index}
                  title={item.etape}
                  rightIcon= {{name: 'delete'}}
                  onPressRightIcon= {onPressRightIconFunction}
                  input={item.ordre}
                />
                </View>
              ))
            }
          </View>

        );
    }
}