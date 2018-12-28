import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'
import {Text, View} from 'react-native'

import ListCourseElement from '../ListCourseElement'

const StyledFlatList = styled.FlatList`
flex: 1;
width: 100%;
`


class ListCourse extends React.Component {

    static propTypes = {
        categorie: PropTypes.any
        }

        keyExtractor = item => item.categorie
    render(){
        const {categorie} = this.props
            return(
                <View >
                    {categorie ? (
                        <StyledFlatList
                            data={categorie}
                            keyExtractor={this.keyExtractor}
                            renderItem={({ item }) => (
                                <View>
                                    <Text>{`La catégorie est ${item.categorie}`}</Text>
                                    <ListCourseElement listCourseDto ={item.listCourseDto} />
                                </View> 
                            )} />) : (null)}
                </View>
            )
    }
}

export default ListCourse