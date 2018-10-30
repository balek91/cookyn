import React from 'react';
import { Platform,StyleSheet,Text,View, TextInput,TouchableOpacity, Image} from 'react-native';
import { WebBrowser } from 'expo';
import OptionsMenu from "react-native-options-menu";
import { ImagePicker, Permissions, Camera, Constants } from 'expo';
import QuickPicker from 'quick-picker';
import Picker from 'react-native-multiple-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { ListItem } from 'react-native-elements';


export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: "Ajout"
  };

  constructor(props) {
    super(props);
    this.addTextInputIngredients = this.addTextInputIngredients.bind(this);
    this.state = {
      EtapesToSend : [],
      IngredientsRecu: [],
      IngredientsToSend : [],
      UniteRecu : [],
      ALL_QUANTITY:[],
      dataPicker: [],
      labelPicker: [],
      difficulte:null,
      Photo:false,
      photoCamera: null,
      image: null,
      hasCameraRollPermission: null,
      HasCameraPermission: null,
      type: Camera.Constants.Type.back,
      selectedDiff: null,
      selectedUnit:null,
      currentEtape:null,
      selectedIngredient:null,
      selectedQuantity:null,
      phraseIngredient: "Cliquez pour chosir l'ingredient",
      nbEtape:0,
      currentValueUpdate:null,
      
    }
    let test = [];
    for(let i =1; i<= 1000; i++)
    {
      test.push(i.toString());
    }
    console.log(test[0]);
    let QuatityPicker = [];
    for (let j = 0; j < 1000; j++){
      QuatityPicker.push({key: test[j],label: test[j]});
    }
  //  console.log(QuatityPicker);
    let IngredientsPicker =  [
      {key: 'Ananas', label: 'Ananas'},
      {key: 'Bananes', label: 'Bananes'},
      {key: 'Jambon', label: 'Jambon'},
      {key: 'Tomate', label: 'Tomate'},
      {key: 'Olives', label: 'Olives'},
      {key: 'Mayonaise', label: 'Mayonaise'},
      {key: 'Herbes de Provance', label: 'Herbes de Provance'},
    ]
let UnitésPicker = [
      {key: 'grammes', label: 'grammes'},
      {key: 'kilogrammes', label: 'kilogrammes'},
      {key: 'tranches', label: 'tranches'},
      {key: 'cuillérées', label: 'cuillérées'},
      {key: 'pincées', label: 'pincées'},
      {key: 'lamelles', label: 'lamelles'},
   ]
   this.state.UniteRecu = UnitésPicker;
   this.state.IngredientsRecu = IngredientsPicker;
    this.state.dataPicker = [QuatityPicker,UnitésPicker, IngredientsPicker];
    this.state.labelPicker = ['Quantité', 'Unités', 'Ingrédients'];
//  console.log(this.state.dataPicker);
}


addTextInputEtapes = () => {

  if(this.state.currentEtape != null){
    if (this.state.currentEtape.length !=0 ){
      let nombreEtape = this.state.nbEtape;
      nombreEtape +=1;
      let EtapesToSend = this.state.EtapesToSend;
      EtapesToSend.push({
        etape : this.state.currentEtape,
         ordre: nombreEtape});
      console.log(EtapesToSend);
      this.setState({ currentEtape:'', nbEtape: nombreEtape });
      let textInput = this.refs.textInputEtape;
      textInput.setNativeProps({ text: ' ' });
      setTimeout(() => {  textInput.setNativeProps({ text: '' }) }, 5)  
      }
    }
}

deleteInputIngredients = (key) => {
  console.log(key);
  let Ingredients = this.state.IngredientsView;
    for (let i = key; i <= Ingredients.length; i++){
      if (Ingredients[i+1]!= null) {
        Ingredients[i] = Ingredients[i+1];
      } else {
        Ingredients.splice(i, 1);
      }
    }
  this.setState({
    IngredientsView: Ingredients,
  });
}

addTextInputIngredients = () => {
  
  if (this.state.selectedIngredient != null) {
    if( this.state.selectedUnit != null){
      if (this.state.selectedQuantity != null ){
        let IngredientsToSend = this.state.IngredientsToSend;
        IngredientsToSend.push({
          ingredients: this.state.selectedIngredient,
          unite: this.state.selectedUnit,
          quatite: this.state.selectedQuantity
        });
    this.setState({
      selectedUnit:null,
      selectedIngredient: null,
      selectedQuantity : null,
      IngredientsToSend : IngredientsToSend,
      phraseIngredient: "Cliquez pour chosir l'ingredient"
    });
     // console.log(IngredientsToSend);
      } else {
        alert("Veuillez choisir un ingrédient");
      }
      
    } else {
      alert("Veuillez choisir un ingrédient");
    }
    
  } else {
    alert("Veuillez choisir un ingrédient");
  } 
  
}

  onSelect = data => {
    this.setState(data);
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermission: status === 'granted' });
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status2 === 'granted' });
  }



  _takePhoto = async () => {
  let result =  await ImagePicker.launchCameraAsync({allowsEditing: true,
    aspect: [4, 3]});

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    console.log(result);
    //this.props.navigation.navigate("Camera", {returnData: this.returnData.bind(this)});
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  urlToBlob(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.response);
            }
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob'; // convert type
        xhr.send();
    })
}
    returnData(photo) {
      console.log("Jsuis la");
      console.log(this.props.navigation.getParam('photoCamera'));
      console.log(photo);
      this.setState({
        image: photo
      });
    }


    _updateOrdre(index, value) {
      let objetTableau = this.state.EtapesToSend;
      objetTableau[index].ordre = value;
      this.setState({
        EtapesToSend : objetTableau
      });
      const tableau = JSON.stringify(this.state.EtapesToSend)
      console.log("NEW TABLEAU  " + tableau);
    }
   

 _selectDifficulty = () => {
  const { selectedDiff } = this.state;
  QuickPicker.open({ 
      items: ['Facile', 'Moyen', 'Difficile'], 
      selectedValue: 'Facile', // this could be this.state.selectedLetter as well.
      onPressDone: (selectedValueFromPicker) =>{
          this.setState({ selectedDiff: selectedValueFromPicker });
          QuickPicker.close();
      }
  });
}
  _selectUnit = () => {
    const { selectedUnit } = this.state;
    QuickPicker.open({ 
        items: ['Grammes', 'Kilogramme', 'Tranche'], 
        selectedValue: 'Grammes', // this could be this.state.selectedLetter as well.
        onValueChange: (selectedValueFromPicker) => this.setState({ selectedUnit: selectedValueFromPicker }),
        onPressDone: this._selectQuantity,
    });
  }
  _selectIngredient = () => {
    const { selectedIngredient } = this.state;
    QuickPicker.open({ 
        items: ['Jambon', 'Fromage de chèvre', 'Aubergine'], 
        selectedValue: 'Jambon', // this could be this.state.selectedLetter as well.
        onValueChange: (selectedValueFromPicker) => this.setState({ selectedIngredient: selectedValueFromPicker }),
        onPressDone: this._selectUnit,
    });
  }
  
  _selectQuantity = () => {
    const { selectedQuantity } = this.state;
    QuickPicker.open({ 
        items: this.state.ALL_QUANTITY, 
        selectedValue: '1', // this could be this.state.selectedLetter as well.
        onValueChange: (selectedValueFromPicker) => this.setState({ selectedQuantity: selectedValueFromPicker }),
        onPressDone:QuickPicker.close()
    });
  }
  deleteListIngredient(index) {
    let tableau = this.state.IngredientsToSend;
    tableau.splice(index, 1);
    this.setState({
      IngredientsToSend: tableau
    })
  }

  deleteListEtape (index) {
    let tableau = this.state.EtapesToSend;
    tableau.splice(index, 1);
    this.setState({
      EtapesToSend: tableau
    })
  }

  render() {
  let { image } = this.state;
    const PhotoIcon = require("../assets/icons/addphoto.png");
    return(
    <View style={styles.container}>
        <KeyboardAwareScrollView  resetScrollToCoords={{x:0,y:0}} showsVerticalScrollIndicator={false}  >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <OptionsMenu
              button={PhotoIcon}
              buttonStyle={{ width: 50, height: 50, margin: 7.5, resizeMode: "contain" }}
              options={["Choisir une photo de la bibliothèque", "Prendre une photo", "Annuler"]}
              actions={[this._pickImage, this._takePhoto,null]}/>

        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>

      
              <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Nom de la recette"
              placeholderTextColor = "#707070"
              ref={(input) => this.name = input}
              onSubmitEditing={()=> this.categorie.focus()}
              />  

          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Catégorie"
              placeholderTextColor = "#707070"
              ref={(input) => this.categorie = input}
              onSubmitEditing={()=> this.price.focus()}
              />  

              <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Prix estimé"
              placeholderTextColor = "#707070"
              ref={(input) => this.price = input}
              onSubmitEditing={()=> this.tps.focus()}
              />  

          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Temps de préparation"
              placeholderTextColor = "#707070"
              ref={(input) => this.tps = input}
              />  
              
              <View style={styles.viewSignUp}>

          <TouchableOpacity style={styles.buttonDif} feedback="opacity" native={false} onPress={this._selectDifficulty}>
          <Text style={styles.buttonText}>Difficulté</Text>
        </TouchableOpacity>

            <Text style={styles.TextDiffculté}>{this.state.selectedDiff}</Text>
                </View>    
          
            <View style={styles.viewEtape}>
            <TextInput 
              style={styles.inputBoxEtape}
              ref="textInputEtape" 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Étape"
              placeholderTextColor = "#707070"
              multiline={true}
              onChangeText={(value) => this.setState({
                currentEtape:value})}
              />
            <TouchableOpacity style={styles.buttonPlus} onPress={() => this.addTextInputEtapes()} > 
            <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity> 
                </View>    
                <View>
  {
    this.state.EtapesToSend
    .sort((itemA, itemB) => itemA.ordre > itemB.ordre )
    .map((item, index) => (
      <View key={'etape' + item.ordre}>
        <View style={styles.viewSignUp}>
        <Text  style={styles.labelListEtape}>{"Étape n° "}</Text> 
        <TextInput value={item.ordre.toString()}  keyboardType='number-pad' onChangeText={(value) => 
          this._updateOrdre(index, value)} style={styles.inputBoxListEtape} />
          </View>
      <ListItem
        key={index}
        title={item.etape}
        rightIcon= {{name: 'delete'}}
        onPressRightIcon= {() => this.deleteListEtape(index)}
        input={item.ordre}
      />
      </View>
    ))
  }
</View>

            <View style={styles.viewSelect}>
                  
            <Picker
              gradStyle = {{start: {x: 0, y: 0},
              end: {x: 1, y: 1.0},
              locations: [0, 0.5, 1],
              colors: ['#743e4e', '#fff', '#221d33']}}
              height = {0.5}
              data={this.state.dataPicker}
              onChange={(option) => {
                if (option !=undefined){
                  if (option[0]!= undefined){
                    this.setState({
                      selectedQuantity : option[0]
                    });
                    if (option[1] != undefined){
                      this.setState({
                        selectedUnit : option[1]
                      });
                      if (option[2] != undefined){
                        this.setState({
                          selectedIngredient : option[2],
                          phraseIngredient: option[0] +" " + option[1] + " de " + option[2]
                        });
                      }
                    }
                  }
                  
                    console.log(this.state.IngredientsRecu[option[0]]);
                    this.setState({selectedValue: ""})
                }
              }}
              label={this.state.labelPicker}>
                  <Text style={styles.inputBoxIngredient} >{this.state.phraseIngredient}</Text>

              </Picker>
           

            <TouchableOpacity style={styles.buttonPlus} onPress={() => this.addTextInputIngredients()} > 
            <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity> 
                </View>    

<View>
  {
    this.state.IngredientsToSend.map((item, index) => (
      <ListItem
        key={index}
        title={item.quatite + ' ' + item.unite + ' de ' + item.ingredients}
        rightIcon= {{name: 'delete'}}
        onPressRightIcon= {() => this.deleteListIngredient(index)}
      />
    ))
  }
</View>


<View style={styles.viewSignUp}>

  <TouchableOpacity style={styles.buttonDif} feedback="opacity" native={false}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
</View>
</KeyboardAwareScrollView>
  
    </View> 
    
    )    
  }

  

  submit(){
    var data = 'data:image/png;base64,...';
urlToBlob(data)
.then(blob => {
    console.log(blob);
})
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#fff',
    paddingTop: Constants.statusBarHeight,
  },
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#fff',
    paddingTop: Constants.statusBarHeight,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  centerDisplay: {
    justifyContent:'center',
    alignItems: 'center',
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  inputBox: {
    width:300,
    height:40,
    backgroundColor:'#fff',
    borderRadius: 50,
    paddingHorizontal:16,
    fontSize:16,
    color:'#000',
    marginVertical: 10,
    textAlign:'center',
    borderWidth:0.5,
  },
  inputBoxDif: {
    width:200,
    height:40,
    backgroundColor:'#fff',
    borderRadius: 50,
    paddingHorizontal:16,
    fontSize:16,
    color:'#000',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:16,
    fontWeight:'500',    
  },
  inputBoxEtape: {
    width:200,
    height:100,
    backgroundColor:'#fff',
    paddingHorizontal:16,
    fontSize:16,
    color:'#000',
    marginVertical: 10,
    textAlign:'center',
    fontSize:16,
    fontWeight:'500',
    borderWidth:0.5,
    margin: 35,
  },
  itemAdd: {
    width:300,
    height:40,
    backgroundColor:'#fff',
    borderRadius: 20,
    paddingHorizontal:16,
    fontSize:16,
    color:'#000',
    marginVertical: 10,
    textAlign:'center',
    borderWidth:0.5,
    padding:10,
  },
  inputBoxIngredient: {
    width:260,
    height:40,
    backgroundColor:'#fff',
    paddingHorizontal:16,
    borderRadius:20,
    padding:10,
    fontSize:16,
    color:'#707070',
    marginVertical: 10,
    textAlign:'center',
    fontSize:16,
    fontWeight:'500',
    borderWidth:0.5,
    margin: 10,
  },
  inputBoxListEtape: {
    width:60,
    height:40,
    backgroundColor:'#fff',
    paddingHorizontal:16,
    borderRadius:70,
    padding:10,
    fontSize:16,
    color:'#707070',
    marginVertical: 10,
    textAlign:'center',
    fontSize:16,
    fontWeight:'500',
    borderWidth:0.5,
  },
  labelListEtape: {
    width:90,
    height:40,
    backgroundColor:'#fff',
    paddingHorizontal:16,
    borderRadius:70,
    padding:10,
    fontSize:16,
    color:'#707070',
    marginVertical: 10,
    textAlign:'center',
    fontSize:16,
    fontWeight:'500',
  },
   TextDiffculté: {
    width:100,
    height:40,
    backgroundColor:'#fff',
    paddingHorizontal:16,
    borderRadius:20,
    padding:10,
    fontSize:16,
    color:'#707070',
    marginVertical: 10,
    textAlign:'center',
    fontSize:16,
    fontWeight:'500',
    borderWidth:0.5,
    margin: 10,
  },
  button: {
    width:300,
    backgroundColor:'#78C9DC',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  signupBtn: {
      fontWeight: '500',
      fontSize: 17,
  },
  viewSignUp: {
    alignItems: "flex-end",
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  viewEtape: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  viewSelect: {
    alignItems: "flex-end",
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 5,
    flexDirection: 'row',
  },
  buttonDif: {
    width:100,
    backgroundColor:'#78C9DC',
    borderRadius: 100,
    marginVertical: 10,
    paddingVertical: 13,
    
  },
  buttonPlus: {
    width:50,
    backgroundColor:'#78C9DC',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  
});