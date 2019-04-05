import React from 'react'
import ViewContainer from '../components/ViewContainer'
import ListItemElement from '../components/FlatListElement'
import styled from 'styled-components'
import BackButton from '../components/BackButton'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import allTheActions from '../actions'

const StyledFlatList = styled.FlatList`
flex: 1;
width: 100%;
`

class ListUsersScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.state.params.title}`,
            headerLeft: (
                <BackButton onPress={() => navigation.state.params.backToProfil()} />
            )
        }
    }

    state = {
        users: []
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.setState({
            users: navigation.getParam('users')
        })
        const { setParams } = this.props.navigation;
        setParams({ title: navigation.getParam('namePage') })
    }

    keyExtractor = item => item.idUser.toString()

    onPress = (contact) => {
        this.props.actions.user.getUserConnect(contact.idUser)
        this.props.navigation.navigate('ProfilUser', { contact: contact.idUser })
    }


    render() {
        const { abonnementList, abonneList } = this.props
        if (this.props.navigation.getParam('abonnementPage')) {
            return (
                <ViewContainer>
                    {abonnementList ? (
                        <StyledFlatList
                            data={abonnementList}
                            keyExtractor={this.keyExtractor}
                            renderItem={({ item }) => (
                                <ListItemElement textPrincipal={item.usernameUser} textDetail={`${item.nomUser} ${item.prenomUser}`} onPressFunction={() => { this.onPress(item) }} />
                            )} />) : (null)}
                </ViewContainer>
            )
        } else {
            return (
                <ViewContainer>
                    {abonneList ? (
                        <StyledFlatList
                            data={abonneList}
                            keyExtractor={this.keyExtractor}
                            renderItem={({ item }) => (
                                <ListItemElement textPrincipal={item.usernameUser} textDetail={`${item.nomUser} ${item.prenomUser}`} onPressFunction={() => { this.onPress(item) }} />
                            )} />) : (null)}
                </ViewContainer>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        abonnementList: state.user.abonnementList,
        abonneList: state.user.abonneList,
        allState: state
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        user: bindActionCreators(allTheActions.user, dispatch)
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListUsersScreen)