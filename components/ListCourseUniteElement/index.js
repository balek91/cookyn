import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {View} from 'react-native'


const CustomFlatList = styled.FlatList`
width : 100%;
`
const StyledText = styled.Text`
margin-left : 20px;
font-size: 16;
font-style: italic;
`



class ListCourseUniteElement extends React.Component {

    static propTypes = {
        lstRelationUniteDto: PropTypes.any
        }

        keyExtractor = item => item.unite.idUnite.toString()
    render(){
        const {lstRelationUniteDto} = this.props
            return(
                <View >
                    {lstRelationUniteDto ? (                        
                            <CustomFlatList
                            data={lstRelationUniteDto}
                            keyExtractor={this.keyExtractor}
                            renderItem={({ item }) => (
                            <StyledText>{`- ${item.quantite} ${item.unite.libelleUnite}`}</StyledText>

                            )} /> 
                            ) : (<StyledText>Pas d'unité</StyledText>)} 
                </View>
            )
    }
}

export default ListCourseUniteElement