import { ImagePicker, Permissions, Camera } from 'expo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ListItem } from 'react-native-elements'
import { View, Keyboard, TouchableOpacity, Text } from 'react-native'
import Axios from 'axios'
import ContentContainer from '../components/ContentContainer/index'
import InputText from '../components/TextInput/index'
import InputTextNoRadius from '../components/TextInputNoRadius/index'
import Label from '../components/LabelEtapeList/index'
import OptionPicker from '../components/OptionPicker/index'
import Picker from 'react-native-multiple-picker'
import QuickPicker from 'quick-picker'
import React from 'react'
import styled from 'styled-components'
import Touchable from '../components/Touchable/index'
import TouchablePlus from '../components/TouchablePlus'
import ViewAlignItemRow from '../components/ViewsAlignItemRow/index'
import ViewCenter from '../components/ViewCenter/index'
import ViewContainer from '../components/ViewContainer/index'
import ButtonModify from '../components/ButtonModify'


import allTheActions from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const StyledView = styled(ViewContainer)`
padding : 20px 0px 0px 0px;`

const StyledViewArray = styled.View`
flex:1;
width:100%;
justifyContent: center;
alignItems: flex-start;
backgroundColor: #F5FCFF;
border-radius:10;
border-width:0.5;
max-width:320
`

const StyledTextArray = styled.Text
`
fontWeight: 300;
fontSize: 16;
margin:15px 15px 10px 25px;
`

const StyledHeader = styled.View`
justifyContent: center;
flex-direction: row;
flex:1;
`
class AddScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

    state = {
      ALL_QUANTITY: [],
      catRecette: '',
      currentEtape: null,
      currentValueUpdate: null,
      dataPicker: [],
      difficulte: null,
      diffRecette: '',
      EtapesToSend: [],
      HasCameraPermission: null,
      hasCameraRollPermission: null,
      image: null,
      image64: null,
      IngredientsPicker: [],
      IngredientsToSend: [],
      IngredientsView: [],
      labelPicker: [],
      libelleRecette: '',
      goback : false,
      nbEtape: 0,
      nbEtapeEcrite:0,
      Photo: false,
      photoCamera: null,
      phraseIngredient: 'Cliquez pour choisir l\'ingredient',
      prixRecette: null,
      selectedDiff: null,
      selectedIngredient: null,
      selectedQuantity: null,
      selectedUnit: null,
      tempPrepRecette: null,
      type: Camera.Constants.Type.back,
      UnitésPicker: []
    }

  addTextInputEtapes = () => {
    Keyboard.dismiss()
    console.log("AAAASIUHQIUDGAIZEQUHDLFIZUEGFLIYZDSBLFIUHZESLIUDFHED : ",this.props.listEtape)
    if (this.state.currentEtape != null) {
      if (this.state.currentEtape.length != 0) {
        let nombreEtapeEcrite = this.state.nbEtapeEcrite
        let nombreEtape = this.state.nbEtape
        nombreEtape += 1
        nombreEtapeEcrite+=1
        let EtapesToSend = this.state.EtapesToSend
        EtapesToSend.push({
          key: `item-${nombreEtape}`,
          etape: this.state.currentEtape,
          ordre: nombreEtape,
          //backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${nombreEtape * 5}, ${132})`,
          backgroundColor: '#FFF'
        })
        let etape = {
          key: `item-${nombreEtapeEcrite}`,
          etape: this.state.currentEtape,
          ordre: nombreEtape,
          //backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${nombreEtape * 5}, ${132})`,
          backgroundColor: '#FFF'
        }
        console.log("je suis passééééé emkdsngvlsfgf,sdghdfghdfhvdx")
        if (this.state.goback == false) {
          this.props.actions.etape.Add(etape)
        }
        this.setState({ currentEtape: '', nbEtape: nombreEtape, nbEtapeEcrite :nombreEtapeEcrite })
        /* let textInput = this.refs.textInputEtape
          textInput.setNativeProps({ text: ' ' })
          setTimeout(() => {  textInput.setNativeProps({ text: '' }) }, 5) */
      }
    }
  }

  addTextInputIngredients = () => {
    if (this.state.selectedIngredient != null) {
      if (this.state.selectedUnit != null) {
        if (this.state.selectedQuantity != null) {
          let IngredientsToSend = this.state.IngredientsToSend
          IngredientsToSend.push({
            ingredients: this.state.selectedIngredient,
            unite: this.state.selectedUnit,
            quantite: this.state.selectedQuantity
          })
          let ingredientView = this.state.IngredientsView
          ingredientView.push({
            ingredients: this.state.IngredientsPicker[this.state.selectedIngredient - 1].label,
            unite: this.state.UnitésPicker[this.state.selectedUnit - 1].label,
            quantite: this.state.selectedQuantity
          })
          this.setState({
            selectedUnit: null,
            selectedIngredient: null,
            selectedQuantity: null,
            IngredientsToSend: IngredientsToSend,
            IngredientsView: ingredientView,
            phraseIngredient: 'Cliquez pour chosir l\'ingredient'
          })
        } else {
          alert('Veuillez choisir un ingrédient')
        }

      } else {
        alert('Veuillez choisir un ingrédient')
      }

    } else {
      alert('Veuillez choisir un ingrédient')
    }

  }

  componentWillMount() {
    let test = []
    for (let i = 1; i <= 1000; i++) {
      test.push(i.toString())
    }
    let QuatityPicker = []
    for (let j = 0; j < 1000; j++) {
      QuatityPicker.push({ key: test[j], label: test[j] })
    }
    let IngredientsPicker = []
    Axios.get('http://51.75.22.154:8080/Cookyn/ingredient/GetListAllIngredient').then((response) => {
      response.data.map((item) => {
        this.state.IngredientsPicker.push({
          key: `ingr${item.idIngredient}`,
          label: item.libelleIngredient
        })
      })
    })

    let UnitésPicker = []
    Axios.get('http://51.75.22.154:8080/Cookyn/unite/GetListUnites').then((response) => {
      response.data.map((item) => {
        this.state.UnitésPicker.push({
          key: `unit${item.idUnite}`,
          label: item.libelleUnite
        })
      })
    })

    this.state.UniteRecu = UnitésPicker
    this.state.IngredientsRecu = IngredientsPicker
    this.state.dataPicker = [QuatityPicker, this.state.UnitésPicker, this.state.IngredientsPicker]
    this.state.labelPicker = ['Quantité', 'Unités', 'Ingrédients']
    
  
  }

  deleteInputIngredients = (key) => {
    let Ingredients = this.state.IngredientsView
    for (let i = key; i <= Ingredients.length; i++) {
      if (Ingredients[i + 1] != null) {
        Ingredients[i] = Ingredients[i + 1]
      } else {
        Ingredients.splice(i, 1)
      }
    }
    this.setState({
      IngredientsView: Ingredients,
    })
  }

  deleteListEtape = (index) => {
    let tableau = this.state.EtapesToSend
    let nbEtape = this.state.nbEtape
    tableau.splice(index, 1)
    nbEtape -= 1

    tableau.map((item, index) => (
      item.ordre = index + 1
    ))
    this.setState({
      EtapesToSend: tableau,
      nbEtape: nbEtape
    })
  }

  deleteListIngredient = (index) => {
    let tableau = this.state.IngredientsToSend
    let tableauView = this.state.IngredientsView
    tableau.splice(index, 1)
    tableauView.splice(index, 1)
    this.setState({
      IngredientsToSend: tableau,
      IngredientsView: tableauView
    })
  }

  draggableSteps = () => {
    this.props.navigation.push('ModifySteps', {
     onNavigationBack: this.retrieveData
    
    })
  }

  isVoyelle = (item) => {
    let allVoyelle = ['a', 'e', 'i', 'o', 'u', 'y']
    let result = false
    allVoyelle.forEach(element => {
      if (element == item.toString().charAt(0)) {
        result = true
      }
    })

    return result
  }

  retrieveData = async () => {
    console.log("jsuis dedans avec ",this.props.listEtape)
    const { navigation } = this.props;
    this.props.navigation.goBack(null)
    let tableau = this.props.listEtape
    console.log("jsuis dedans avec " + tableau.length )

    if (tableau.length > 1){
      tableau.sort((itemA, itemB) => itemA.ordre > itemB.ordre)
    }
    this.setState({
      EtapesToSend: tableau,
      nbEtape : tableau.length,
      goback : true
    });


    console.log('NEEEEEEW ETAPE ', this.state.EtapesToSend)
    console.log("qfnsdjnfsjngs",tableau)

	}

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    this.setState({ hasCameraRollPermission: status === 'granted' })
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    })
    if (!result.cancelled) {
      this.setState({ 
        image: result.uri,
        image64 : result.base64 
      })
    }
  }

  convertDataURIToBinary = (dataURI) =>{
    var base64js = require('base64-js')
    let array = base64js.toByteArray(dataURI)
    console.log(array)
    return array;
  }

  returnData = (photo) => {
    this.setState({
      image: photo
    })
  }

  selectDifficulty = () => {
    Keyboard.dismiss()
    QuickPicker.open({
      items: ['Facile', 'Moyen', 'Difficile'],
      selectedValue: 'Facile',
      onPressDone: (selectedValueFromPicker) => {
        this.setState({ selectedDiff: selectedValueFromPicker })
        QuickPicker.close()
      }
    })
  }

  sendRecepie = () => {
    let recette = {
      catRecette: this.state.catRecette,
      libelleRecette: this.state.libelleRecette,
      tempPrepaRecette: this.state.tempPrepRecette,
      diffRecette: this.state.selectedDiff,
      prix: this.state.prixRecette,
      user: {
        idUser: 1
      }
    }
    let ingredients = []
    this.state.IngredientsToSend.map((items) => {
      ingredients.push({
        ingredient: {
          idIngredient: parseInt(items.ingredients, 10)
        },
        unite: {
          idUnite: parseInt(items.unite, 10)
        },
        quantite: parseInt(items.quantite, 10)
      })
    })

    let etapes = []
    this.state.EtapesToSend.map((items) => {
      etapes.push({
        descriptionEtape: items.etape,
        indexEtape: parseInt(items.ordre, 10)
      })
    })
    //let img = this.convertDataURIToBinary(this.state.image64)
    let json = {
      etapes: etapes,
      ingredients: ingredients,
      recette: recette,
      imageRecette : this.state.image64
    }

    Axios.post('http://51.75.22.154:8080/Cookyn2/recette/AddRecette', json).then((response) => {
      if (response.status =='200'){
        alert('La recette a bien été ajoutée !')
        this.setState({
          catRecette:'',
          EtapesToSend:[],
          image:'',
          IngredientsToSend:[],
          IngredientsView:[],
          libelleRecette:'',
          nbEtape:0,
          prixRecette:'',
          selectedDiff:'',
          tempPrepRecette:'',
        })
      }
      
    })
  }

  setInputTextIngredients = (option) => {
    Keyboard.dismiss()
    if (option != undefined) {
      if (option[0] != undefined) {
        this.setState({
          selectedQuantity: option[0]
        })
        if (option[1] != undefined) {
          this.setState({
            selectedUnit: option[1].toString().substring(4)
          })
          if (option[2] != undefined) {
            idUnit = option[1].toString().substring(4)
            idIngredient = option[2].toString().substring(5)
            

            if (this.isVoyelle(this.state.IngredientsPicker[idIngredient - 1].label)) {
              this.setState({
                selectedQuantity: option[0],
                selectedUnit:parseInt(idUnit,10),    
                selectedIngredient: parseInt(idIngredient,10),
                phraseIngredient: `${option[0]} ${this.state.UnitésPicker[idUnit - 1].label} d'${this.state.IngredientsPicker[idIngredient - 1].label}`
              })
            } else {
              this.setState({
                selectedQuantity: option[0],
                selectedUnit:parseInt(idUnit,10),    
                selectedIngredient: parseInt(idIngredient,10),
                phraseIngredient: `${option[0]} ${this.state.UnitésPicker[idUnit - 1].label} de ${this.state.IngredientsPicker[idIngredient - 1].label}`
              })
            }
          }
        }
      }
      this.setState({ selectedValue: '' })
    }
  }

  setLibelle = (val) => {
    let text = this.state.libelleRecette
    text = val
    this.setState({
      libelleRecette: t
    })
  }

  takePhoto = async () => {
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status2 === 'granted' })
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    })

    if (!result.cancelled) {
      console.log(result.base64)
      this.setState({ 
        image: result.uri,
        image64 : result.base64 
      })
    }
  }

  updateOrdre = (index, value) => {
    let objetTableau = this.state.EtapesToSend
    objetTableau[index].ordre = value
    this.setState({
      EtapesToSend: objetTableau
    })
  }

   b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      
      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
  

  dataURItoBlob = (dataURI) => {
    var base64 = require('base-64');

    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = base64.encode(dataURI.split(',')[1])//(dataURI.split(',')[1]);
    console.log(byteString)
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
 
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
 
    // create a view into the buffer
    var ia = new Uint8Array(ab);
 
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
 
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
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
          color: 'white',
          fontSize: 20,
        }}>{item.etape}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    let { image } = this.state
    return (
      <StyledView>
        <ContentContainer>
          <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}  >

            <OptionPicker
              option={['Choisir une photo de la bibliothèque', 'Prendre une photo', 'Annuler']}
              action={[this.pickImage, this.takePhoto, null]}
              image={image}
            />

            <ViewCenter>

              <InputText
                placeholderText='Nom de la recette'
                onChangeTextFunction={(val) => this.setState({ libelleRecette: val })}
                multi={false}
                value={this.state.libelleRecette}
                width={250}
              />

              <InputText
                placeholderText='Catégorie'
                onChangeTextFunction={(val) => this.setState({ catRecette: val })}
                multi={false}
                value={this.state.catRecette}
                width={250}

              />
              <InputText
                placeholderText='Prix estimé (en €)'
                onChangeTextFunction={(val) => this.setState({ prixRecette: val })}
                keyboard='number-pad'
                multi={false}
                value={this.state.prixRecette}
                width={250}
              />

              <InputText
                placeholderText='Temps de préparation (en min)'
                onChangeTextFunction={(val) => this.setState({ tempPrepRecette: val })}
                keyboard='number-pad'
                value={this.state.tempPrepRecette}
                multi={false}
                width={250}
              />
            </ViewCenter>

            <ViewAlignItemRow>
              <Touchable
                text='Difficulté'
                onPressFunction={this.selectDifficulty}
                widthTouchable={100}
                backgroundColorTouchable='#78C9DC'
                colorText='#FFF'
              />
              <InputText
                placeholderText='<-- Cliquez'
                width={120}
                value={this.state.selectedDiff}
                editable={false} />
            </ViewAlignItemRow>

            <ViewAlignItemRow>
              <InputTextNoRadius
                reference='textInputEtape'
                width={200}
                height={100}
                placeholderText='Étape'
                value={this.state.currentEtape}
                multi={true}
                onChangeTextFunction={(value) => this.setState({
                  currentEtape: value
                })}
              />
              <TouchablePlus onPressFunction={this.addTextInputEtapes} />
            </ViewAlignItemRow>
            <View>
{/* On tri le tableau d'étape par ordre, puis on le parcourt et pour chaque item, nous affichons une mini vu contenant un label, un text imput pour modifier 
l'ordre d'une étape a tout moment et enfin une row contenant le descriptif de l'étape.*/}
              {/* {
                this.state.EtapesToSend
                  .sort((itemA, itemB) => itemA.ordre > itemB.ordre)
                  .map((item, index) => (
                    <View key={`Etape ${item.ordre}`}>
                      <ViewAlignItemRow align={'flex-end'}>
                        <Label text={'Étape '} width={50} height={40} fontSize={16} radius={0} />
                        <InputText
                          onChangeTextFunction={(val) => this.updateOrdre(index, val)}
                          keyboard='number-pad'
                          value={item.ordre.toString()}
                          width={60}
                        />
                      </ViewAlignItemRow>
                      <ListItem
                        key={index}
                        title={item.etape}
                        rightIcon={{ name: 'delete' }}
                        onPressRightIcon={() => this.deleteListEtape(index)}
                        input={item.ordre}
                      />
                    </View>
                  ))
              } 
              
               <DraggableFlatList
          data={this.state.EtapesToSend}
          renderItem={this.renderItem}
          keyExtractor={(item, index) =>`draggable-item-${item.key}`}
          scrollPercent={100}
          onMoveEnd={({ data, to, from, row }) => {console.log("teeeeeeeeest",data, to, from, row)} }
        />*/
            
            }

            </View>

            <StyledViewArray>
              <StyledHeader>
                <View style={{flex:4, alignContent:"center", alignItems:"center", paddingTop:30}}><Text style={{fontSize:18}}>{'Liste des étapes'}</Text></View>
                <View style={{flex:1, paddingRight: 3}}><ButtonModify onPressFunction={this.draggableSteps} /></View>
              </StyledHeader>
            {this.state.EtapesToSend
            .map((item, index) => {
								return (<StyledTextArray key={`e${index}`}>{`${item.ordre} - ${item.etape}`}</StyledTextArray>)
							})}
            </StyledViewArray>
                
            <ViewAlignItemRow>

              <Picker
                gradStyle={{
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 1.0 },
                  locations: [0, 0.5, 1],
                  colors: ['#743e4e', '#fff', '#221d33'] // jsasis pas - couleur du text- couleur de la selection
                }}
                height={0.5}
                data={this.state.dataPicker}
                onChange={(option) => this.setInputTextIngredients(option)}
                label={this.state.labelPicker}>
                <Label width={250} height={40} radius={20} text={this.state.phraseIngredient} />
              </Picker>

              <TouchablePlus onPressFunction={this.addTextInputIngredients} />

            </ViewAlignItemRow>

            <View>
              {
                this.state.IngredientsView.map((item, index) => (
                  <ListItem
                    key={index}
                    title={this.isVoyelle(item.ingredients) ? `${item.quantite} ${item.unite} d'${item.ingredients}` : `${item.quantite} ${item.unite} de ${item.ingredients}`}
                    rightIcon={{ name: 'delete' }}
                    onPressRightIcon={() => this.deleteListIngredient(index)}
                  />
                ))
              }
            </View>\
          
            <ViewCenter>
              <Touchable
                text='Ajouter'
                onPressFunction={this.sendRecepie}
                widthTouchable={100}
                backgroundColorTouchable='#78C9DC'
                colorText='#FFF'
              />
            </ViewCenter>
          </KeyboardAwareScrollView>
        </ContentContainer>
      </StyledView>

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

export default connect(mapStateToProps,mapDispatchToProps)(AddScreen)