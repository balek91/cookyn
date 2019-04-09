import React from 'react'
import axios from 'axios'
import { AsyncStorage, ImageBackground } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import compare from '../utils/CompareDate'
import styled from 'styled-components'
import Touchable from '../components/TouchableCourse'
import ViewCustom from '../components/ViewContainer'
import ListCourse from '../components/ListCourse'

const GlobalView = styled.View`

`

const ContentView = styled.View`
align-items: center;
margin-top : 10px;
`

const PickerView = styled.View`
margin-top : 10px; 
`

export default class ShoppingListScreen extends React.Component {
  static navigationOptions = {
    header : null
  }

  state = {
		currentDate: new Date(),
		currentDateOneWeekLater:new Date(new Date().getTime() + 604800000),
    firstDate : null,
		secondDate : null,
		user: null,
		changeFirstDate : false,
		changeSecondDate : false, 
		listCourse : null
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
		let firstDate = this.state.currentDate
		if (this.state.changeFirstDate) {
			console.log('la1')
			firstDate= compare.stringToDate(this.state.currentDate,"dd-mm-yyyy","-")
		}
		let secondDate = this.state.currentDateOneWeekLater
		if (this.state.changeSecondDate) {
			console.log('la')
			secondDate= compare.stringToDate(this.state.currentDateOneWeekLater,"dd-mm-yyyy","-")
		}
		let json = {
			dateDebut : firstDate,
			dateFin: secondDate,
			idUser : this.state.user
		}
		
		axios.post('http://51.75.22.154:8080/Cookyn/course/GenerationCourse', json)
		.then((response) => {
			if (response.status == 200){
				alert('la liste a bien été reçue')
				console.log('responseeeeee',response.data.listeCourse)
				this.setState({
					listCourse : response.data.listeCourse
				})
			}
		})
	}

  render() {
	const {listCourse} = this.state
    return (
      <GlobalView>
			<ImageBackground source={require('../assets/images/CoursePage.jpeg')} style={{width: '100%', height: '100%'}}>
			<KeyboardAwareScrollView behavior='padding' resetScrollToCoords={{ x: 0, y: 0 }} showsVerticalScrollIndicator={false} >

			<ContentView>
				<PickerView>
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
								iconSource={require('../assets/icons/calendar.png')} 
								customStyles={{
								dateIcon: {
									position: 'absolute',
									left: 0,
									top: 4,
									marginLeft: 0
								},
								dateInput: {
									marginLeft: 36,
									backgroundColor : 'white',
									borderColor : 'black',
									height : 30
								},
								dateText : {
									fontSize : 18
								}
								}}
								onDateChange={(date) => {this.setState({currentDate: date, changeFirstDate : true})}}
							/>
							</PickerView>
							<PickerView>

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
								iconSource={require('../assets/icons/calendar.png')} 
								customStyles={{
								dateIcon: {
									position: 'absolute',
									left: 0,
									top: 4,
									marginLeft: 0,
								},
								dateInput: {
									marginLeft: 36,
									backgroundColor : 'white',
									borderColor : 'black',
									height : 30
								},
								dateText : {
									fontSize : 18
								}
								}}
								onDateChange={(date) => {this.setState({currentDateOneWeekLater: date, changeSecondDate : true})}}
							/>
							</PickerView>
              <Touchable
								text='Générer la liste'
								onPressFunction={()=> this.generateShoppingList()}
								widthTouchable={150}
								backgroundColorTouchable='#E88110'
								colorText='#FFF'/>

								{ 
									listCourse ? 
									<ListCourse categorie={listCourse} />
									:
									null
								}
								
					</ContentView>
					</KeyboardAwareScrollView>
				</ImageBackground>
      </GlobalView>
    )
  }
}


