import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text, TouchableOpacity, Image, AsyncStorage, ScrollView, ImageBackground
} from 'react-native';
import Axios from 'axios'


import compare from '../utils/CompareDate'

import Calendar from 'react-native-calendar'
import styled from 'styled-components'
import ViewContainer from '../components/ViewContainer/index'
import { FlatGrid } from 'react-native-super-grid';
import { SectionGrid } from 'react-native-super-grid';



const StyledView = styled(ViewContainer)`
padding : 50px 0px 0px 0px;
backgroundColor: rgba(52, 52, 52, 0.1)`

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state ={
    dateSelected :new Date(),
    listRecette :[],
    today : null,
    actualMonth:null,
    actualYear : null,
    listDateRecette:[],
    daySelected:null
  }

  displayDate = (date) => {
    var newDate= compare.stringToDateCalandar(date,"-","T")   
    console.log(newDate)
  }

  async componentDidMount(){
    var today = new Date()
        var monthSend = null
        var yearSend = today.getFullYear()
        var daySend=null
        if(today.getDate() <=9){
          daySend=`0${today.getDate()}`
        }else{
          daySend=today.getDate()
        }
        if(today.getMonth() +1 <=9){
          monthSend = `0${today.getMonth() +1}`
        } else {
          monthSend = today.getMonth()
        }

        var dateSend = `${yearSend}-${monthSend}-${daySend}`
       console.log("date ",dateSend )
       this.setState({
         daySelected: dateSend,
         today : dateSend
       })
    const idUser = await AsyncStorage.getItem('idUser');
    var json = {
      idUser : idUser,
      date : dateSend
    }
    Axios.post(`http://51.75.22.154:8080/Cookyn/planning/GetListPlanningByUserMonthYear`, json)
    .then((response) => {
      if (response.status == 200) {
        var tab = Object.keys(response.data.listPlanningUser)
        var tabFinal =[]
        tab.map((item) =>{
          tabFinal.push(item.split("T")[0])
        })
        this.setState({
          listDateRecette : tabFinal
        })
      }
    })

    var jsonToday = {
      idUser : idUser,
      date : dateSend
    }
    Axios.post('http://51.75.22.154:8080/Cookyn/planning/GetListPlanningByUserAndDate', jsonToday).then((response) =>{
      if (response.status == 200){
        console.log(response.data)
        this.setState({
          listRecette : response.data.listPlanningUser
        })
        console.log(this.state.listRecette)
      }
    })
  }

  getListRecette = async (date) => {
     const idUser = await AsyncStorage.getItem('idUser');
     var trueDate = date.split("T")[0]
     this.setState({
      daySelected: trueDate
     })
     let json = {
       idUser : idUser,
       date : trueDate
     }
     console.log(json)
     Axios.post('http://51.75.22.154:8080/Cookyn/planning/GetListPlanningByUserAndDate', json).then((response) =>{
       if (response.status == 200){
         console.log(response.data)
         this.setState({
           listRecette : response.data.listPlanningUser
         })
       }
     })    

  }


  nextHandle =async () =>{

   
    const {today} = this.state
    var now = new Date(today)
    var monthSend = null
    var yearSend = now.getFullYear()
    var daySend=null
    if(now.getDate() <=9){
      daySend=`0${now.getDate()}`
    }else{
      daySend=now.getDate()
    }
    if(now.getMonth() +2 <=9){
      monthSend = `0${now.getMonth() +2}`
    } else {
      if(now.getMonth() +2 > 12){
        monthSend = "01"
        yearSend = yearSend +1
      } else {
        monthSend = now.getMonth() +2
      }
      
    }
    var dateSend = `${yearSend}-${monthSend}-${daySend}`
    
    const idUser = await AsyncStorage.getItem('idUser');
    var json = {
      idUser : idUser,
      date : dateSend
    }
    this.setState({
      today : dateSend
    })
    Axios.post(`http://51.75.22.154:8080/Cookyn/planning/GetListPlanningByUserMonthYear`, json)
    .then((response) => {
      if (response.status == 200) {
        var tab = Object.keys(response.data.listPlanningUser)
        var tabFinal =[]
        tab.map((item) =>{
          tabFinal.push(item.split("T")[0])
        })
        this.setState({
          listDateRecette : tabFinal
        })
      }
    })
  }

  prevHandled =async () =>{
    const {today} = this.state
    var now = new Date(today)
    var monthSend = null
    var yearSend = now.getFullYear()
    var daySend=null
    if(now.getDate() <=9){
      daySend=`0${now.getDate()}`
    }else{
      daySend=now.getDate()
    }
    if(now.getMonth() > 10){
      monthSend = now.getMonth()
    } else {
      if(now.getMonth() ==0){
        monthSend = "12"
        yearSend = yearSend -1
      } else {
        monthSend = `0${now.getMonth()}`
      }
    }
    var dateSend = `${yearSend}-${monthSend}-${daySend}`
    this.setState({
      today : dateSend
    })

    const idUser = await AsyncStorage.getItem('idUser');
    var json = {
      idUser : idUser,
      date : dateSend
    }
    Axios.post(`http://51.75.22.154:8080/Cookyn/planning/GetListPlanningByUserMonthYear`, json)
    .then((response) => {
      if (response.status == 200) {
        var tab = Object.keys(response.data.listPlanningUser)
        var tabFinal =[]
        tab.map((item) =>{
          tabFinal.push(item.split("T")[0])
        })
        this.setState({
          listDateRecette : tabFinal
        })
      }
    })
  }

  

  navigateDetail =(recette) =>{
    this.props.navigation.push('DetailRecette', { recette: recette })
  }

  render() {
    const {listRecette, listDateRecette, daySelected} = this.state
    const PhotoRecette = require('../assets/icons/generique.png')
    return (
      <View style={{flex:1,paddingTop:20}}>
        <View style={{flex:1}}>
       <Calendar 
       customStyle={{padding:10,day: {fontSize: 15, textAlign: 'center'},  eventIndicator: {backgroundColor: '#E88110',width: 10,height: 5,},}} 
       eventDates={listDateRecette}
       showEventIndicators={true}
       showControls={true}
       prevButtonText={'Préc'}
       nextButtonText={'Suiv'}
       onTouchNext={()=> this.nextHandle()}
       onTouchPrev={()=> this.prevHandled()}
       dayHeadings={['D','L','M','M','J','V','S']}
       onDateSelect={(date) => this.getListRecette(date)}
       selectedDate={daySelected}
       monthNames={['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre']}
       />
       </View>
       <View style={{flex:1}}>
       <ImageBackground source={require('../assets/images/homeBack.jpg')} style={{width: '100%', height: '100%'}}>

       { listRecette.length >0 ?
          <SectionGrid
                        itemDimension={90}
                        // staticDimension={300}
                        // fixed
                        // spacing={20}
                        sections={[
                            {
                            title: 'Les Recettes',
                            data: listRecette
                            }
                        ]}
                        horizontal={true}
                        style={styles.gridView}
                        renderItem={({ item, section, index }) => (
                            <TouchableOpacity   style={{flex:2}} onPress={ () => {this.navigateDetail(item)}}>
                            <View style={[styles.itemContainer, { backgroundColor: '#E88110' }]}>
                            <Image source={item.urlRecette === null ? PhotoRecette: {uri:item.urlRecette}} resizeMode="cover" style={{ flex:1}}/>
                            <Text style={styles.itemName}>{item.libelleRecette}</Text>
                            <Text style={styles.itemCode}>{item.prix + " €"}</Text>
                            </View>
                            </TouchableOpacity>
                        )}
                        
                    />
                    : <Text style={{alignSelf: "center", fontSize:14, fontWeight:'bold', color:"white", marginTop:100}}> Aucune recette pour ce jour</Text>
                        }
                        </ImageBackground>
       </View>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 5,
    height: 150,
  },
  itemName: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    maxWidth: 100
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
  },
});