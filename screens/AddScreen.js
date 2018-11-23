import { ImagePicker, Permissions, Camera } from 'expo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ListItem } from 'react-native-elements'
import { View } from 'react-native'
import Axios from 'axios'
import ContentContainer from '../components/ContentContainer/index'
import HeaderContainer from '../components/HeaderContainer/index'
import InputText from '../components/TextInput/index'
import InputTextNoRadius from '../components/TextInputNoRadius/index'
import Label from '../components/LabelEtapeList/index'
import OptionPicker from '../components/OptionPicker/index'
import Picker from 'react-native-multiple-picker'
import QuickPicker from 'quick-picker'
import React from 'react'
import Touchable from '../components/Touchable/index'
import ViewAlignItemRow from '../components/ViewsAlignItemRow/index'
import ViewCenter from '../components/ViewCenter/index'
import ViewContainer from '../components/ViewContainer/index'
import allTheActions from '../actions'
import { connect } from 'react-redux';




class AddScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this._addTextInputIngredients = this._addTextInputIngredients.bind(this)
    this.state = {
      EtapesToSend: [],
      IngredientsToSend: [],
      IngredientsView: [],
      ALL_QUANTITY: [],
      dataPicker: [],
      labelPicker: [],
      difficulte: null,
      Photo: false,
      photoCamera: null,
      image: null,
      hasCameraRollPermission: null,
      HasCameraPermission: null,
      type: Camera.Constants.Type.back,
      selectedDiff: null,
      selectedUnit: null,
      currentEtape: null,
      selectedIngredient: null,
      selectedQuantity: null,
      phraseIngredient: 'Cliquez pour choisir l\'ingredient',
      nbEtape: 0,
      currentValueUpdate: null,
      libelleRecette: '',
      catRecette: '',
      tempPrepRecette: null,
      diffRecette: '',
      prixRecette: null,
      IngredientsPicker: [],
      UnitésPicker: []
    }

    let test = []
    for (let i = 1; i <= 1000; i++) {
      test.push(i.toString())
    }
    let QuatityPicker = []
    for (let j = 0; j < 1000; j++) {
      QuatityPicker.push({ key: test[j], label: test[j] })
    }
    //  console.log(QuatityPicker)

    let IngredientsPicker = []
    Axios.get('http://51.75.22.154:8080/Cookyn/ingredient/GetListAllIngredient').then((response) => {
      response.data.map((item) => {
        this.state.IngredientsPicker.push({
          key: 'ingr' + item.idIngredient,
          label: item.libelleIngredient
        })
      })
    })

    let UnitésPicker = []
    Axios.get('http://51.75.22.154:8080/Cookyn/unite/ListUnites').then((response) => {
      response.data.map((item) => {
        this.state.UnitésPicker.push({
          key: 'unit' + item.idUnite,
          label: item.libelleUnite
        })
      })
    })


    this.state.UniteRecu = UnitésPicker
    this.state.IngredientsRecu = IngredientsPicker
    this.state.dataPicker = [QuatityPicker, this.state.UnitésPicker, this.state.IngredientsPicker]
    this.state.labelPicker = ['Quantité', 'Unités', 'Ingrédients']
    //  console.log(this.state.dataPicker)
  }

  _addTextInputEtapes = () => {

    if (this.state.currentEtape != null) {
      if (this.state.currentEtape.length != 0) {
        let nombreEtape = this.state.nbEtape
        nombreEtape += 1
        let EtapesToSend = this.state.EtapesToSend
        EtapesToSend.push({
          etape: this.state.currentEtape,
          ordre: nombreEtape
        })
        this.setState({ currentEtape: '', nbEtape: nombreEtape })
        /* let textInput = this.refs.textInputEtape
          textInput.setNativeProps({ text: ' ' })
          setTimeout(() => {  textInput.setNativeProps({ text: '' }) }, 5) */
      }
    }
  }

  _addTextInputIngredients = () => {

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
            phraseIngredient: "Cliquez pour chosir l'ingredient"
          })
          // console.log(IngredientsToSend)
        } else {
          alert("Veuillez choisir un ingrédient")
        }

      } else {
        alert("Veuillez choisir un ingrédient")
      }

    } else {
      alert("Veuillez choisir un ingrédient")
    }

  }

  async componentWillMount() {
    console.log('User : ', this.props.user);
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    this.setState({ hasCameraRollPermission: status === 'granted' })
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status2 === 'granted' })
  }

  _deleteInputIngredients = (key) => {
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

  _deleteListEtape = (index) => {
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

  _deleteListIngredient = (index) => {
    let tableau = this.state.IngredientsToSend
    let tableauView = this.state.IngredientsView
    tableau.splice(index, 1)
    tableauView.splice(index, 1)
    this.setState({
      IngredientsToSend: tableau,
      IngredientsView: tableauView
    })
  }

  _isVoyelle = (item) => {
    let allVoyelle = ['a', 'e', 'i', 'o', 'u', 'y']
    let result = false
    allVoyelle.forEach(element => {
      if (element == item.toString().charAt(0)) {
        result = true
      }
    })

    return result
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })

    console.log(result)

    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
  }

  render() {
    let { image } = this.state
    return (
      <ViewContainer>
        <HeaderContainer titleText={'Ajout de recette'}></HeaderContainer>
        <ContentContainer>
          <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} showsVerticalScrollIndicator={false}  >

            <OptionPicker
              option={['Choisir une photo de la bibliothèque', 'Prendre une photo', 'Annuler']}
              action={[this._pickImage, this._takePhoto, null]}
              image={image}
            />

            <ViewCenter>

              <InputText
                reference={(input) => this.name = input}
                placeholderText='Nom de la recette'
                onChangeTextFunction={(val) => this.setState({ libelleRecette: val })}
                onSubmitEditingFunction={() => this.categorie.focus()}
                multi={false}
                width={300}
              />

              <InputText
                reference={(input) => this.categorie = input}
                placeholderText='Catégorie'
                onChangeTextFunction={(val) => this.setState({ catRecette: val })}
                onSubmitEditingFunction={() => this.price.focus()}
                multi={false}
                width={300}

              />
              <InputText
                reference={(input) => this.price = input}
                placeholderText='Prix estimé'
                onChangeTextFunction={(val) => this.setState({ prixRecette: val })}
                onSubmitEditingFunction={() => this.tps.focus()}
                keyboard='number-pad'
                multi={false}
                width={300}
              />

              <InputText
                reference={(input) => this.tps = input}
                placeholderText='Temps de préparation'
                onChangeTextFunction={(val) => this.setState({ tempPrepRecette: val })}
                onSubmitEditingFunction={() => this.tps.focus()}
                keyboard='number-pad'
                multi={false}
                width={300}
              />

            </ViewCenter>

            <ViewAlignItemRow>
              <Touchable
                text='Difficulté'
                onPressFunction={this._selectDifficulty}
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

              <Touchable
                text='+'
                onPressFunction={this._addTextInputEtapes}
                widthTouchable={50}
                backgroundColorTouchable='#78C9DC'
                colorText='#FFF'
              />
            </ViewAlignItemRow>
            <View>

              {
                this.state.EtapesToSend
                  .sort((itemA, itemB) => itemA.ordre > itemB.ordre)
                  .map((item, index) => (
                    <View key={'etape' + item.ordre}>
                      <ViewAlignItemRow align={'flex-end'}>
                        <Label text={'Étape n° '} width={50} height={40} fontSize={16} radius={0} />
                        <InputText
                          onChangeTextFunction={(val) => this._updateOrdre(index, val)}
                          keyboard='number-pad'
                          value={item.ordre.toString()}
                          width={60}
                        />
                      </ViewAlignItemRow>
                      <ListItem
                        key={index}
                        title={item.etape}
                        rightIcon={{ name: 'delete' }}
                        onPressRightIcon={() => this._deleteListEtape(index)}
                        input={item.ordre}
                      />
                    </View>
                  ))
              }
            </View>

            <ViewAlignItemRow>

              <Picker
                gradStyle={{
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 1.0 },
                  locations: [0, 0.5, 1],
                  colors: ['#743e4e', '#fff', '#221d33']
                }}
                height={0.5}
                data={this.state.dataPicker}
                onChange={(option) => this._setInputTextIngredients(option)}
                label={this.state.labelPicker}>
                <Label width={260} height={40} text={this.state.phraseIngredient} />
              </Picker>

              <Touchable
                text='+'
                onPressFunction={this._addTextInputIngredients}
                widthTouchable={50}
                backgroundColorTouchable='#78C9DC'
                colorText='#FFF'
              />
            </ViewAlignItemRow>

            <View>
              {
                this.state.IngredientsView.map((item, index) => (
                  <ListItem
                    key={index}
                    title={this._isVoyelle(item.ingredients) ? item.quantite + ' ' + item.unite + ' d\'' + item.ingredients : item.quantite + ' ' + item.unite + ' de ' + item.ingredients}
                    rightIcon={{ name: 'delete' }}
                    onPressRightIcon={() => this._deleteListIngredient(index)}
                  />
                ))
              }
            </View>
            <ViewCenter>
              <Touchable
                text='Ajouter'
                onPressFunction={this._sendRecepie}
                widthTouchable={100}
                backgroundColorTouchable='#78C9DC'
                colorText='#FFF'
              />
            </ViewCenter>
          </KeyboardAwareScrollView>
        </ContentContainer>
      </ViewContainer>

    )

  }

  returnData = (photo) => {
    this.setState({
      image: photo
    })
  }

  _selectDifficulty = () => {
    QuickPicker.open({
      items: ['Facile', 'Moyen', 'Difficile'],
      selectedValue: 'Facile',
      onPressDone: (selectedValueFromPicker) => {
        this.setState({ selectedDiff: selectedValueFromPicker })
        QuickPicker.close()
      }
    })
  }

  _sendRecepie = () => {
    let recette = {
      catRecette: this.state.catRecette,
      libelleRecette: this.state.libelleRecette,
      tempPrepRecette: parseInt(this.state.tempPrepRecette, 10),
      diffRecette: this.state.selectedDiff,
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
    let json = {
      etapes: etapes,
      ingredients: ingredients,
      recette: recette,
    }

    console.log(json)

    Axios.post('http://51.75.22.154:8080/Cookyn/recette/AddRecette', json).then((response) => {
      console.log(response.data)
    })
  }

  _setInputTextIngredients = (option) => {
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
            idIngredient = option[2].toString().substring(4)
            if (this._isVoyelle(this.state.IngredientsPicker[idIngredient - 1].label)) {
              this.setState({
                selectedIngredient: option[2].toString().substring(4),
                phraseIngredient: option[0] + ' ' + this.state.UnitésPicker[idUnit - 1].label + ' d\'' + this.state.IngredientsPicker[idIngredient - 1].label
              })
            } else {
              this.setState({
                selectedIngredient: option[2].toString().substring(4),
                phraseIngredient: option[0] + ' ' + this.state.UnitésPicker[idUnit - 1].label + ' de ' + this.state.IngredientsPicker[idIngredient - 1].label
              })
            }
          }
        }
      }
      this.setState({ selectedValue: '' })
    }
  }

  _setLibelle = (val) => {
    let text = this.state.libelleRecette
    text = val
    this.setState({
      libelleRecette: t
    })
  }

  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })

    if (!result.cancelled) {
      this.setState({ image: result.uri })
    }
    console.log(result)
  }

  _updateOrdre = (index, value) => {
    let objetTableau = this.state.EtapesToSend
    objetTableau[index].ordre = value
    this.setState({
      EtapesToSend: objetTableau
    })
  }

  _urlToBlob = (url) => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.onerror = reject
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response)
        }
      }
      xhr.open('GET', url)
      xhr.responseType = 'blob' // convert type
      xhr.send()
    })
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
   }
}

export default connect(mapStateToProps)(AddScreen)