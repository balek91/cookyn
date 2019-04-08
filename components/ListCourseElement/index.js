import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {View} from 'react-native'

import ListCourseUniteElement from '../ListCourseUniteElement'

const CustomFlatList = styled.FlatList`
width : 100%;
`
const StyledText = styled.Text`
margin-left : 5px;
font-size : 18;
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
                            <CustomFlatList
                            data={listCourseDto}
                            keyExtractor={this.keyExtractor}
                            ListEmptyComponent={<View><StyledText>Aucun ingrédient dans cette catégorie</StyledText></View>}
                            renderItem={({ item }) => (
                                <View>
                                    <StyledText>{`${item.libelleIngredient.toUpperCase()}`}</StyledText> 
                                    <ListCourseUniteElement lstRelationUniteDto={item.lstRelationUniteDto}/>
                                </View>
                            )} /> 
                            ) : (<StyledText>Pas d'ingredient</StyledText>)} 
                </View>
            )
    }
}

export default ListCourseElement