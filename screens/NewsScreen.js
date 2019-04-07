import PropTypes from 'prop-types'
import React from 'react'
import News from '../components/News'
import {ImageBackground, Button, Text, View,Image, TouchableOpacity, AsyncStorage} from 'react-native'
import ContentContainer from '../components/ContentContainer/index'
import styled from 'styled-components'
import ViewContainer from '../components/ViewContainer/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SearchBar from 'react-native-searchbar'
import Touchable from '../components/Touchable';
import Axios from 'axios';




const StyledView = styled(ViewContainer)`
padding : 0px 0px 0px 0px;
backgroundColor: rgba(52, 52, 52, 0.1)`


const HeaderView = styled.View`
background-color : white;
height:60;
width:100%;
margin-bottom : 5px;
`

class NewsScreen extends React.Component {
    static navigationOptions = {
        header : null
    }

    state ={
        actualites :[]
    }
     navigateSearch =() => {
        this.props.navigation.push('Search')
     } 
    
    componentDidMount =async ()=>{
        console.log(new Date())
        var user = await AsyncStorage.getItem('idUser')
        Axios.get(`http://51.75.22.154:8080/Cookyn/actualite/GetActualiteByUser/${user}/0`)
        .then((response) => {
            console.log(response)
            this.setState({
                actualites : response.data.listActulalites
            })
        })
    }

    render(){
        const {actualites} = this.state
        return(<StyledView>
                    <ImageBackground source={require('../assets/images/homeBack.jpg')} style={{width: '100%', height: '100%'}}>
                    <ContentContainer>

                    <HeaderView>
                        <View style={{flex:1}}>
                        </View>
                        <View style={{flex:1, alignItems: "flex-end", marginRight:10}} >
                            <TouchableOpacity onPress={this.navigateSearch}>
                            <Image source={require('../assets/icons/loupe.png')} style={{height:20, width:20}} >
                            </Image>
                            </TouchableOpacity>
                        </View>
                    </HeaderView>
                    <KeyboardAwareScrollView behavior='padding' resetScrollToCoords={{ x: 0, y: 0 }} showsVerticalScrollIndicator={false} >


            <News who={'Steve'} what={'Les cousins'} action={'Create'} date={new Date('2018-12-20')}></News>
            <News who={'Mouhsin'} what={'Steve'} action={'Follow'} date={new Date('2018-11-20')}></News>
            <News who={'Antoine'} what={'Pates Bolo'} action={'Create'} date={new Date('2019-01-10')}></News>
            <News who={'Hasan'} what={'Stephanie'} action={'Follow'} date={new Date('2019-02-20')}></News>
            </KeyboardAwareScrollView>
            </ContentContainer>
           </ImageBackground>
            </StyledView>
           
        )
    }
}

export default NewsScreen