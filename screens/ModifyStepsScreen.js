import React from 'react'
import {TouchableOpacity, Text, TextInput, Image} from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Touchable from '../components/Touchable/index'
import ViewCustom from '../components/ViewContainer'
import ViewRow from '../components/ViewsAlignItemRow'
import BackButton from '../components/BackButton'


import allTheActions from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class ModifyStepsScreen extends React.Component {
    // static navigationOptions = {
    //     header: null
    //   }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Modifier étapes',
            headerLeft: (
                <BackButton onPress={() => navigation.state.params.onNavigationBack()} />
            )
        }
    }

    state = {
        allSteps : []
    }

    componentDidMount() {
      const { navigation } = this.props
      let array =this.props.listEtape
      console.log("refesdfjjsbdfglsnfdùgonbdfsmogbdsmfogmsfbdgmosnfgmovbslgbùdlsngùosfndmgofsi ", array)

      this.setState({
          allSteps: array
        });
      }

      renderItem = ({ item, index, move, moveEnd, isActive }) => {
        return (<ViewRow>
          <TouchableOpacity
            style={{ 
              height: 100, 
              backgroundColor: isActive ? 'white' : item.backgroundColor,
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
            onLongPress={move}
            onPressOut={moveEnd}
          >
           <Image source={require('../assets/icons/dragg.png')}/>
          </TouchableOpacity>
          <TextInput style={{height: 40, width:200, borderColor: 'black', borderWidth: 1, margin:20}} value={item.etape} onChangeText={(value) =>{
            let tableau = this.state.allSteps
            tableau[index].etape = value
            this.setState({
              allSteps : tableau
            })
            this.props.actions.etape.Update(tableau)
          }}>
          </TextInput>
          <TouchableOpacity 
            style={{ 
              height: 100, 
              backgroundColor: isActive ? 'white' : item.backgroundColor,
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
            onPress={() => {
              let tableau = this.state.allSteps
              if (index != tableau.length){
                tableau.splice(index, 1)
                for (let i = index; i < tableau.length; i++){
                  tableau[i].ordre = i+1
                }
              } else {
                tableau.splice(index-1,1)
              }
              this.setState({
                allSteps : tableau
              })
              this.props.actions.etape.Update(tableau)
            }}>
              <Image source={require('../assets/icons/garbage.png')} style={{height:30, width:30}}/>
            </TouchableOpacity>
        </ViewRow>
          
        )
      }
    
      render(){

        return(
            <ViewCustom>
                <DraggableFlatList
          data={this.state.allSteps}
          renderItem={this.renderItem}
          keyExtractor={(item, index) =>`draggable-item-${item.key}`}
          scrollPercent={5}
          onMoveEnd={({ data, to, from, row }) => {
              console.log("from : " +from + " to : "+ to + " row : ",row)

              if (from > to){
                row.ordre = to+1
                
                let tab = data
                for (let i = to+1; i < tab.length ; i++){
                     tab[i].ordre = i+1;
                }
                this.props.actions.etape.Update(tab)
                this.setState({
                    allSteps : tab
                })
              } else {
                row.ordre = to+1
                let tab = data
                for (let i = to-1; i >=0 ; i--){
                     tab[i].ordre = i+1;
                }
                this.props.actions.etape.Update(tab)
                this.setState({
                    allSteps : tab
                })
              }

            } }
        />
                {/* <Touchable
                text='Valider'
                onPressFunction={this.returnAddScreen}
                widthTouchable={100}
                backgroundColorTouchable='#78C9DC'
                colorText='#FFF'
              /> */}
            </ViewCustom>
        )
        }
}

const mapStateToProps = state => {
	return {
		listEtape: state.etape.data,
		allState: state
	}
}

const mapDispatchToProps = dispatch => ({
	actions: {
		etape: bindActionCreators(allTheActions.etape, dispatch)
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(ModifyStepsScreen)