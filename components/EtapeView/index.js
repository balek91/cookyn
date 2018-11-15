import React from 'react'
import PropTypes from 'prop-types'
import {View, Text} from 'react-native'
import {ListItem} from 'react-native-elements'
import styled from 'styled-components/native'
import InputText from '../TextInput/index'


export default class EtapeView extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        onChangeTextFunction: PropTypes.func,
        onPressRightIconFunction : PropTypes.func
    }
  

    render(){
        const {data, onChangeTextFunction, onPressRightIconFunction} = this.props;

    
        const StyledView = styled.View
        `
        alignItems:flex-end;
        flexGrow: 1;
        justifyContent: center;
        paddingVertical: 16;
        flexDirection: row;
        `

        const StyledText = styled.Text
        ` 
        width:90;
        height:40;
        backgroundColor:#fff;
        paddingHorizontal:16;
        borderRadius:70;
        padding:2%;
        fontSize:16;
        color:#707070;
        marginVertical: 10;
        textAlign:center;
        fontSize:16;
        fontWeight:500;`

        return(
            <View>
            {
             data
             .sort((itemA, itemB) => itemA.ordre > itemB.ordre )
              .map((item, index) => (
                <View key={'etape' + item.ordre}>
                  <StyledView>
                  <StyledText>{"Étape n° "}</StyledText> 
                     <InputText
                onChangeTextFunction={(val) => onChangeTextFunction(index, val)}
                keyboard="number-pad" 
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