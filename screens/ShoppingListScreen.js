import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import Touchable from '../components/Touchable/index'
import ViewCustom from '../components/ViewContainer'
import DatePicker from 'react-native-datepicker'




export default class ShoppingListScreen extends React.Component {
  static navigationOptions = {
    title: 'Liste de course',
  };

  state = {
    currentDate: new Date(),
    firstDate : null,
    secondDate : null
  } 

  render() {
    return (
      <ViewCustom>
         <DatePicker
								style={{width: 200}}
								locale={'fr'}
								date={this.state.currentDate}
								mode="date"
								placeholder="select date"
								format="DD-MM-YYYY"
								minDate={this.state.currentDate}
								maxDate="2050-06-01"
								confirmBtnText="Ok"
								cancelBtnText="Annuler"
								customStyles={{
								dateIcon: {
									position: 'absolute',
									left: 0,
									top: 4,
									marginLeft: 0
								},
								dateInput: {
									marginLeft: 36
								}
								// ... You can check the source to find the other keys.
								}}
								onDateChange={(date) => {this.setState({firstDate: date})}}
							/>

               <DatePicker
								style={{width: 200}}
								locale={'fr'}
								date={this.state.currentDate}
								mode="date"
								placeholder="select date"
								format="DD-MM-YYYY"
								minDate={this.state.currentDate}
								maxDate="2050-06-01"
								confirmBtnText="Ok"
								cancelBtnText="Annuler"
								customStyles={{
								dateIcon: {
									position: 'absolute',
									left: 0,
									top: 4,
									marginLeft: 0
								},
								dateInput: {
									marginLeft: 36
								}
								// ... You can check the source to find the other keys
								}}
								onDateChange={(date) => {this.setState({secondDate: date})}}
							/>
              <Touchable
								text='Générer la liste de course'
								onPressFunction={()=> alert("TAFFF MOUHSIN PUTAIN")}
								widthTouchable={200}
								backgroundColorTouchable='#78C9DC'
								colorText='#FFF'/>
      </ViewCustom>
    )
  }
}


