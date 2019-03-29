import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text, TouchableOpacity, Image
} from 'react-native';

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
    dateSelected :new Date()
  }

  render() {
    const hotels = [
      {name: "Hotel Nice Riviera", code: "#2980b9", latitude:43.700008, longitude :7.2695535 ,stars: 4,price:64, description:"Relaxed hotel offering warm rooms, minibars, plus free Wi-Fi, an indoor pool & a cafe bar."},
      {name: "Hotel Vendome", code: "#2980b9", latitude:43.7009352, longitude :7.2713842 ,stars: 4, price:62,description:"Warm rooms with Wi-Fi included in 19th-century mansions offering cocktail bar & bright lounge."},
      {name: "Hotel Radisson Blu", code: "#2980b9", latitude:43.6846665, longitude :7.23506193 ,stars: 4,price:121, description:"Modern residence with free Wi-Fi, breakfast, plenty of dining options, plus a pool & sauna."},
      {name: "Hotel Alba", code: "#2980b9", latitude:43.7038916, longitude :7.2656768 ,stars: 4,price:76, description:"Sophisticated hotel in former palace offering restaurant and bar with sea views and terraces."},
      {name: "Hotel Nice Exelsior", code: "#2980b9", latitude:43.7033392,longitude :7.2623368 ,stars: 4,price:58, description:"Colorful rooms with murals and free Wi-Fi in a 19th-century hotel offering a garden bar."},

  ]
  
    return (
      <View style={{flex:1,paddingTop:20}}>
        <View style={{flex:2}}>
       <Calendar 
       customStyle={{padding:10,day: {fontSize: 15, textAlign: 'center'}}} 
       showEventIndicators={true}
       showControls={true}
       prevButtonText={'Préc'}
       nextButtonText={'Suiv'}
       dayHeadings={['D','L','M','M','J','V','S']}
       onDateSelect={(date) => this.setState({dateSelected : compare.stringToDate(date,"dd-mm-yyyy","-")})}
       monthNames={['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre']}
       />
       </View>
       <View style={{flex:1}}>
          <SectionGrid
                        itemDimension={90}
                        // staticDimension={300}
                        // fixed
                        // spacing={20}
                        sections={[
                            {
                            title: 'Home/Hotels',
                            data: hotels
                            }
                        ]}
                        horizontal={true}
                        style={styles.gridView}
                        renderItem={({ item, section, index }) => (
                            <TouchableOpacity onPress={ () => {this.navigateDetail(item)}}>
                            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                            <Image  />
                            <Text style={styles.itemName}>{"Hotel"}</Text>
                            <Text style={styles.itemCode}>{item.name}</Text>
                            </View>
                            </TouchableOpacity>
                        )}
                    />
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
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 5,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
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