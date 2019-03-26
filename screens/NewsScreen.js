import PropTypes from 'prop-types'
import React from 'react'
import News from '../components/News'
import { View } from 'react-native';
import ViewCustom from '../components/ViewContainer'
import ScrollView from '../components/ScrollViewContainer'
import {ImageBackground} from 'react-native'
import ContentContainer from '../components/ContentContainer/index'
import styled from 'styled-components'
import ViewContainer from '../components/ViewContainer/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'




const StyledView = styled(ViewContainer)`
padding : 0px 0px 0px 0px;
backgroundColor: rgba(52, 52, 52, 0.1)`

class NewsScreen extends React.Component {

    componentDidMount(){
        console.log(new Date())
    }

    render(){
        return(<StyledView>
                    <ImageBackground source={require('../assets/images/homeBack.jpg')} style={{width: '100%', height: '100%'}}>
                    <ContentContainer>
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