import React from 'react';
import { Platform,StyleSheet,Text,View, TextInput,TouchableOpacity, Image,ScrollView ,KeyboardAvoidingView} from 'react-native';
import { WebBrowser } from 'expo';
import OptionsMenu from "react-native-options-menu";
import { ImagePicker, Permissions, Camera, Constants } from 'expo';
import QuickPicker from 'quick-picker';
import Picker from 'react-native-multiple-picker';



export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: "Ajout"
  };

  constructor(props) {
    super(props);
    this._takePhoto = this._takePhoto.bind(this);
    this.state = {
      EtapesView : [],
      EtapesToSend : [],
      IngredientsRecu: [],
      IngredientsView: [],
      IngredientsToSend : [],
      UniteRecu : [],
      ALL_QUANTITY:[],
      dataPicker: [],
      labelPicker: [],
      difficulte:null,
      PickerVisible : false,
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
      phraseIngredient: "Cliquez pour chosir l'ingredients"
      
    }
    let test = [];
    for(let i =1; i<= 1000; i++)
    {
      test.push(i.toString());
    }
    console.log(test[2]);
    let QuatityPicker = [];
    for (let j = 1; j < 1000; j++){
      QuatityPicker.push({key: test[j],label: test[j]});
    }
  //  console.log(QuatityPicker);
    let IngredientsPicker =  [
      {key: 0, label: 'Ananas'},
      {key: 1, label: 'Bananes'},
      {key: 2, label: 'Jambon'},
      {key: 3, label: 'Tomate'},
      {key: 4, label: 'Olives'},
      {key: 5, label: 'Mayonaise'},
      {key: 6, label: 'Herbes de Provance'},
    ]
let UnitésPicker = [
      {key: 0, label: 'grammes'},
      {key: 1, label: 'kilogrammes'},
      {key: 2, label: 'tranches'},
      {key: 3, label: 'cuillérées'},
      {key: 4, label: 'pincées'},
      {key: 5, label: 'lamelles'},
   ]
   this.state.UniteRecu = UnitésPicker;
   this.state.IngredientsRecu = IngredientsPicker;
    this.state.dataPicker = [IngredientsPicker, UnitésPicker, QuatityPicker];
    this.state.labelPicker = ['Ingredients', 'Unités', 'Quantité'];
//  console.log(this.state.dataPicker);
}


addTextInputEtapes = (key) => {

  if(this.state.currentEtape != null){
    if (this.state.currentEtape.length !=0 ){
      let EtapesToSend = this.state.EtapesToSend;
      EtapesToSend.push(this.state.currentEtape);
      console.log(EtapesToSend);
      let EtapesView = this.state.EtapesView;
      EtapesView.push(
      <Text key={'e' +key}
      >{this.state.currentEtape}</Text>);
      this.setState({ currentEtape:'' });
      let textInput = this.refs.textInputEtape;
      textInput.setNativeProps({ text: ' ' });
      setTimeout(() => {  textInput.setNativeProps({ text: '' }) }, 5)  
      }
    }
    
  
}

addTextInputIngredients = (key) => {
  if (this.state.selectedIngredient != null || this.state.selectedIngredient !="Ingrédient"){
    if( this.state.selectedUnit != null || this.state.selectedUnit !="Unité"){
      if (this.state.selectedQuantity != null || this.state.selectedQuantity !="Nb"){
        let IngredientsToSend = this.state.IngredientsToSend;
        IngredientsToSend.push({
          ingredients: this.state.selectedIngredient,
          unite: this.state.selectedUnit,
          quatite: this.state.selectedQuantity
        });
        let IngredientsView = this.state.IngredientsView;
      
      IngredientsView.push(
        
        <Text key={'t'+key}>{ this.state.selectedQuantity + " " + this.state.selectedUnit + " de " + this.state.selectedIngredient}</Text> 
        );
    this.setState({
      selectedUnit:'Unité',
      selectedIngredient: 'Ingrédient',
      selectedQuantity : 'Nb'
    });
      console.log(IngredientsToSend);
      }
      
    }
    
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

  setDifficulte(newValue){
    this.setState({
      difficulte: newValue,
      PickerVisible: !this.state.PickerVisible
    });
  }
  displayPickerDiff(){
    this.setState({
      PickerVisible: !this.state.PickerVisible
    });
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

    displayDiff(){
      if(this.state.difficulte==1){
          return 'Facile';
      }else if(this.state.difficulte==2){
        return 'Moyen';
      }
      else if(this.state.difficulte==3){
        return 'Difficile'
      }
    }

/*     loadPicture(){
      this.setState({image :  this.props.navigation.getParam('photoCamera')})
    }
  */ 
  _selectDifficulty = () => {
    console.log("Dedans")
    const { selectedDiff } = this.state;
    QuickPicker.open({ 
        items: ['Facile', 'Moyen', 'Difficile'], 
        selectedValue: 'Facile', // this could be this.state.selectedLetter as well.
        onValueChange: (selectedValueFromPicker) => this.setState({ selectedDiff: selectedValueFromPicker }),
        
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

  render() {
    const gradStyle = {
      start: {x: 0, y: 0},
      end: {x: 1, y: 1.0},
      locations: [0, 0.5, 1],
      colors: ['#743e4e', '#fff', '#221d33']
  };
    const diffValue =[
      {
        title:'Facile',
        value:1,
      },
      {
        title:'Moyen',
        value:2,
      },
      {
        title:'Diffcile',
        value:3,
      },
    ]

  let { image } = this.state;
  /* const name = this.props.navigation.getParam('photoCamera');
    console.log(" TEEEEEESTT " + name); */
    const PhotoIcon = require("../assets/icons/addphoto.png");
    return(
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
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
            <TouchableOpacity style={styles.buttonPlus} onPress={() => this.addTextInputEtapes(this.state.EtapesView.length)} > 
            <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity> 
                </View>    
                {this.state.EtapesView.map((value, index) => {
                  console.log(index)
                    return (<Text  key={'lbE'+index} style={styles.itemAdd}>{value}</Text>)
                  })}

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
                      this.setState({
                        selectedIngredient : this.state.IngredientsRecu[option[0]].label,
                        selectedQuantity : option[2],
                        selectedUnit : this.state.UniteRecu[option[1]].label
                      })
                        console.log(this.state.IngredientsRecu[option[0]]);
                        this.setState({selectedValue: ""})
                    }
                  }}
                  label={this.state.labelPicker}


              >
                  <Text style={styles.inputBoxIngredient} >{this.state.phraseIngredient}</Text>

              </Picker>
           

            <TouchableOpacity style={styles.buttonPlus} onPress={() => this.addTextInputIngredients(this.state.IngredientsView.length)} > 
            <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity> 
                </View>    
{this.state.IngredientsView.map((value, index) => {
  return (<Text key={'lbIE'+index} style={styles.itemAdd}>{value}</Text>)
})}


<View style={styles.viewSignUp}>

  <TouchableOpacity style={styles.buttonDif} feedback="opacity" native={false}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
</View>

</KeyboardAvoidingView>
  
            </ScrollView>
    </View> )

    
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
  homeScreenFilename: {
    marginVertical: 7,
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