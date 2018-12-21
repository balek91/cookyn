import PropTypes from 'prop-types'
import React from 'react'
import News from '../components/News'
import { View } from 'react-native';
import ViewCustom from '../components/ViewContainer'
import ScrollView from '../components/ScrollViewContainer'




class NewsScreen extends React.Component {

    componentDidMount(){
        console.log(new Date())
    }

    render(){
        return(<ViewCustom>
            <ScrollView>
            <News who={'Steve'} what={'Les cousins'} action={'Create'} date={new Date('2018-12-20')}></News>
            <News who={'Mouhsin'} what={'Steve'} action={'Follow'} date={new Date('2018-11-20')}></News>
            </ScrollView>
           
            </ViewCustom>
           
        )
    }
}

export default NewsScreen