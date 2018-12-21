import React from 'react';
import axios from 'axios'
import { AsyncStorage } from 'react-native';


import Touchable from '../components/Touchable/index'
import ViewCustom from '../components/ViewContainer'
import DatePicker from 'react-native-datepicker'




export default class ShoppingListScreen extends React.Component {
  static navigationOptions = {
    title: 'Liste de course',
  };

  state = {
		currentDate: new Date(),
		currentDateOneWeekLater:new Date(new Date().getTime() + 604800000),
    firstDate : null,
		secondDate : null,
		user: null,
	} 
	
	componentDidMount =() => {
		this.retrieveUser()
	}

	 retrieveUser =async () => {
		const value = await AsyncStorage.getItem('idUser')
		this.setState({
			user : value
		})
	}
	generateShoppingList = () => {
		let json = {
			dateDebut : this.state.currentDate,
			dateFin: this.state.currentDateOneWeekLater,
			idUser : this.state.user
		}
		
		axios.post('http://51.75.22.154:8080/Cookyn2/course/GenerationCourse', json)
		.then((response) => {
			if (response.status == 200){
				alert('la liste a bien été reçue')
				console.log(response.data)
			}
		})
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
								onDateChange={(date) => {this.setState({currentDate: date,})}}
							/>

               <DatePicker
								style={{width: 200}}
								locale={'fr'}
								date={this.state.currentDateOneWeekLater}
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
								onDateChange={(date) => {this.setState({currentDateOneWeekLater: date})}}
							/>
              <Touchable
								text='Générer la liste de course'
								onPressFunction={()=> this.generateShoppingList()}
								widthTouchable={200}
								backgroundColorTouchable='#78C9DC'
								colorText='#FFF'/>
      </ViewCustom>
    )
  }
}


