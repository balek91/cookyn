import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'
import {Text, View} from 'react-native'

import ListCourseElement from '../ListCourseElement'

const StyledFlatList = styled.FlatList`
flex: 1;
width: 100%;
`

const StyledView = styled.View `
background-color : white;
opacity : 0.66;
border-radius : 20;
width : 100%;
border: 1px solid black;
padding : 10px;
margin-bottom : 5px;`

const StyledText = styled.Text`
text-align : center;
font-weight: bold;
font-size: 20;`



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
                                <StyledView>
                                    <StyledText>{item.categorie.toUpperCase()}</StyledText>
                                    <ListCourseElement listCourseDto ={item.listCourseDto} />
                                </StyledView> 
                            )} />) : (null)}
                </View>
            )
    }
}

export default ListCourse