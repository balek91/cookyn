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
    today:null,
    actualMonth:null,
    actualYear : null
  }

  displayDate = (date) => {
    var newDate= compare.stringToDateCalandar(date,"-","T")   
    console.log(newDate)
  }

  async componentDidMount(){
    var today = new Date()
        var month = today.getMonth()+1
        var year = today.getFullYear()
        console.log("month ",month)
        this.setState({
          actualMonth : month,
          actualYear : year
        })
    const idUser = await AsyncStorage.getItem('idUser');
    Axios.get(`http://51.75.22.154:8080/Cookyn/planning/GetListPlanningsByUserOffset/${idUser}/0`)
    .then((response) => {
      if (response.status == 200) {
        var tab = []
        response.data.listPlanning.map((item)=>{
          var date = new Date(item.datePlanning)
          var day=null
          if(date.getDate()<=9){
            day=`0${date.getDate()}`
          }else{
            day=date.getDate()
          }
          var month = date.getMonth()+1
          var formatedDate = date.getFullYear() + "-0"+month+"-"+day
          
            tab.push(formatedDate)
          
        })
        console.log(tab)
      }
    })
  }

  getListRecette = async (date) => {
     const idUser = await AsyncStorage.getItem('idUser');
     var trueDate = date.split("T")[0]
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
         console.log(this.state.listRecette)
       }
     })
     

  }

  navigateDetail =(recette) =>{
    this.props.navigation.push('DetailRecette', { recette: recette })
  }

  render() {
    const {listRecette} = this.state
    const PhotoRecette = require('../assets/icons/generique.png')
    return (
      <View style={{flex:1,paddingTop:20}}>
        <View style={{flex:1}}>
       <Calendar 
       customStyle={{padding:10,day: {fontSize: 15, textAlign: 'center'}}} 
       showEventIndicators={true}
       showControls={true}
       prevButtonText={'Préc'}
       nextButtonText={'Suiv'}
       dayHeadings={['D','L','M','M','J','V','S']}
       onDateSelect={(date) => this.getListRecette(date)}
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
                            <TouchableOpacity  onPress={ () => {this.navigateDetail(item)}}>
                            <View style={[styles.itemContainer, { backgroundColor: '#E88110' }]}>
                            <Image source={item.urlRecette === null ? PhotoRecette: {uri:item.urlRecette}} resizeMode="cover" style={{height:100, width:100}}/>
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