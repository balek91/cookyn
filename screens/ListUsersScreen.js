import React from 'react'
import ViewContainer from '../components/ViewContainer'
import ListItemElement from '../components/FlatListElement'
import styled from 'styled-components'

const StyledFlatList = styled.FlatList`
flex: 1;
width: 100%;
`


export default class ListUsersScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.state.params.title}`
        }
    }

    state = {
        users: []
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

keyExtractor = item => item.idUser.toString()

onPress = (contact) => {
    this.props.navigation.navigate('ProfilUser')
}


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
                            <ListItemElement textPrincipal={item.usernameUser} textDetail={`${item.nomUser} ${item.prenomUser}`} onPressFunction={() => { this.onPress(item) }} />
                        )} />) : (null)}
        </ViewContainer>
        )
}
}
