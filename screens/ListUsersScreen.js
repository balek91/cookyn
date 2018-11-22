import React from 'react'
import { FlatList } from 'react-native'
import Touchable from '../components/Touchable'
import ViewContainer from '../components/ViewContainer'
import ScrollViewCustom from '../components/ScrollViewContainer'

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
    return (
        <ViewContainer>
            <ScrollViewCustom>
                {users ? (
                    <FlatList
                        data={users}
                        keyExtractor={this.keyExtractor}
                        renderItem={({ item }) => (
                            <Touchable text={`${item.prenomUser} ${item.nomUser}`} onPressFunction={() => { this.onPress(item) }} />
                        )} />) : (null)}
            </ScrollViewCustom>
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
