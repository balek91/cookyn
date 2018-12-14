import React from 'react'
import ViewContainer from '../components/ViewContainer'
import ListItemElement from '../components/FlatListElement'
import styled from 'styled-components'
import BackButton from '../components/BackButton'
import Axios from 'axios'

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
        users: [],
        userId: null,
        abonneList: [],
        abonnementList: [],
        offset : 0,
        limite : 20
    }

    componentDidMount() {
        const { navigation } = this.props
        this.setState({
            users: navigation.getParam('users'),
            userId: navigation.getParam('userPage')
        })
        const { setParams } = this.props.navigation
        setParams({ title: navigation.getParam('namePage') })
        Axios.get(`http://51.75.22.154:8080/Cookyn2/relation/GetListAbonnement/${navigation.getParam('userPage')}/${this.state.offset}`)
            .then(res => {
                this.setState({
                    abonnementList: res.data.listRelation,
                    limite : res.data.limite,
                    offset : res.data.offset
                })
            })
        Axios.get(`http://51.75.22.154:8080/Cookyn2/relation/GetListAbonne/${navigation.getParam('userPage')}/${this.state.offset}`)
            .then(res => {
                this.setState({
                    abonneList: res.data.listRelation,
                    limite : res.data.limite,
                    offset : res.data.offset
                })
            })
    }

    keyExtractor = item => item.idUser.toString()

    onPress = (contact) => {
        this.props.actions.user.getUserConnect(contact.idUser)
        this.props.navigation.push('ProfilUser', { contact: contact.idUser })
    }

    loadMoreContentAsyncAbonnement = async () => {
        const { navigation } = this.props
        Axios.get(`http://51.75.22.154:8080/Cookyn2/relation/GetListAbonnement/${navigation.getParam('userPage')}/${this.state.offset+this.state.limite}`)
            .then(res => {
                this.setState({
                    abonnementList: [...this.state.abonnementList , ...res.data.listRelation],
                    offset : res.data.offset
                })
            })
    }

    loadMoreContentAsyncAbonne = async () => {
        const { navigation } = this.props
        console.log('NOOOOOOOOOOOOOOOOOOO')
        console.log(`http://51.75.22.154:8080/Cookyn2/relation/GetListAbonne/${navigation.getParam('userPage')}/${this.state.offset+this.state.limite}`)
            Axios.get(`http://51.75.22.154:8080/Cookyn2/relation/GetListAbonne/${navigation.getParam('userPage')}/${this.state.offset+this.state.limite}`)
            .then(res => {
                this.setState({
                    abonneList: [...this.state.abonneList , ...res.data.listRelation],
                    offset : res.data.offset
                })
            })
    }

    refreshContentAsync = async () => {
        console.log('ok')
    }


    render() {
        const { abonnementList, abonneList } = this.state
        if (this.props.navigation.getParam('abonnementPage')) {
            return (
                <ViewContainer>
                    {abonnementList ? (
                        <StyledFlatList
                            onEndReached={() => this.loadMoreContentAsyncAbonnement()}
                            onEndReachedThreshold={0}
                            data={abonnementList}
                            keyExtractor={this.keyExtractor}
                            refreshing={false}
                            onRefresh={() => this.refreshContentAsync()}
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
                            onEndReached={() => this.loadMoreContentAsyncAbonne()}
                            onEndReachedThreshold={0}
                            data={abonneList}
                            keyExtractor={this.keyExtractor}
                            refreshing={false}
                            onRefresh={() => this.refreshContentAsync()}
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
