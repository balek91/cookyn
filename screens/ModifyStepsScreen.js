import React from 'react'
import {TouchableOpacity, Text} from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Touchable from '../components/Touchable/index'
import ViewCustom from '../components/ViewContainer'
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
      this.setState({
          allSteps: navigation.getParam('AllStep')
        });
      }

      returnAddScreen = () =>{
        this.props.navigation.goBack(null)
      }


      renderItem = ({ item, index, move, moveEnd, isActive }) => {
        return (
          <TouchableOpacity
            style={{ 
              height: 100, 
              backgroundColor: isActive ? 'blue' : item.backgroundColor,
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
            onLongPress={move}
            onPressOut={moveEnd}
          >
            <Text style={{ 
              fontWeight: '300', 
              color: 'black',
              fontSize: 20,
            }}>{item.etape}</Text>
          </TouchableOpacity>
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