import React from 'react'
import { FlatList } from 'react-native'
import ViewContainer from '../components/ViewContainer'
import ListItemElement from '../components/FlatListElement'
import ScrollViewCustom from '../components/ScrollViewContainer'
import styled from 'styled-components'

const StyledFlatList = styled.FlatList`
flex: 1;
width: 100%;
`


export default class ListUsersScreen extends React.Component {

    state = {
        users: []
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.state.params.title}`
        }
    }

keyExtractor = item => item.idUser.toString()



render() {
    const {users} = this.state
    console.log("users sss",users)
    return (
        <ViewContainer>
                {users ? (
                    <StyledFlatList
                        data={users}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => (
                            <ListItemElement textPrincipal={item.prenomUser} textDetail={item.nomUser} onPressFunction={() => { this.onPress(item) }} />
                        )} />) : (null)}
        </ViewContainer>
        )
}
    onPress = (contact) => {
        this.props.navigation.navigate('ProfilUser')
    }

    componentDidMount() {
        const { navigation } = this.props;
        console.log(navigation.getParam('users'))
        this.setState({
            users: navigation.getParam('users')
        })
        const { setParams } = this.props.navigation;
        setParams({ title: navigation.getParam('namePage') })
    }
}
