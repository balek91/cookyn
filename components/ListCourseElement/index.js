import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'
import {Text, View} from 'react-native'

const CustomFlatList = styled.FlatList`
flex: 1;
width: 100%;
`


class ListCourseElement extends React.Component {

    static propTypes = {
        listCourseDto: PropTypes.any
        }

        keyExtractor = item => item.idIngredient.toString()
    render(){
        const {listCourseDto} = this.props
            return(
                <View >
                    {listCourseDto ? (
                        <View>
                            <Text>Ingredient</Text>
                            <CustomFlatList
                            data={listCourseDto}
                            keyExtractor={this.keyExtractor}
                            renderItem={({ item }) => (
                               <Text>{item.libelleIngredient}</Text>
                                
                            )} />
                        </View>
                            ) : (<Text>Pas d'ingredient</Text>)} 
                </View>
            )
    }
}

export default ListCourseElement