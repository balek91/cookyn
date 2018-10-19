import React from 'react';
import { Platform,StyleSheet,Text,View,Button, TextInput,TouchableOpacity, Modal, Image,TouchableHighlight, ScrollView , CameraRoll} from 'react-native';
import { WebBrowser } from 'expo';
import OptionsMenu from "react-native-options-menu";
import { ImagePicker, Permissions, Camera, Constants } from 'expo';



export default class AddScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this._takePhoto = this._takePhoto.bind(this);
    this.state = {
      Etapes : [],
      difficulte:null,
      PickerVisible : false,
      Photo:false,
      photoCamera: null,
      image: null,
      hasCameraRollPermission: null,
      HasCameraPermission: null,
      type: Camera.Constants.Type.back,
    }

}

addTextInput = (key) => {
  let Etapes = this.state.Etapes;
  Etapes.push(
  <TextInput key={key}
    style={styles.inputBoxEtape2} 
    underlineColorAndroid='rgba(0,0,0,0)' 
    placeholder="Étape"
    placeholderTextColor = "#707070"
    multiline={true} />);
  this.setState({ Etapes })
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

   

  render() {
    console.log(this.state.photoCamera);
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
              />  

          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Catégorie"
              placeholderTextColor = "#707070"
              ref={(input) => this.categorie = input}
              />  

              <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Prix estimé"
              placeholderTextColor = "#707070"
              ref={(input) => this.price = input}
              />  

          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Temps de préparation"
              placeholderTextColor = "#707070"
              ref={(input) => this.tps = input}
              />  
              
              <View style={styles.viewSignUp}>
              <TouchableOpacity style={styles.buttonDif}  onPress={() => this.displayPickerDiff()}>
               <Text style={styles.buttonText}>Difficulté</Text>
           </TouchableOpacity> 

            <Text style={styles.inputBoxDif}>{this.displayDiff()}</Text>
                </View>    
           
            <Modal visible={this.state.PickerVisible}>
            <View style={{margin:20,backgroundColor:'#efefef', bottom:20,left:20, right:20, position:'absolute',alignItems:'center'}}>
            <Text style={{fontWeight :'bold', marginBottom:10}}> Selectionnez la difficulté</Text>
            { diffValue.map((value, index) => {
              return(
              <TouchableHighlight key={index} onPress={() => this.setDifficulte(value.value)} style={{paddingTop:4, paddingBottom:4, alignItems:'center'}} >
              <Text>{value.title}</Text>
          </TouchableHighlight>)
            })}
            </View>
            </Modal>
            <View style={styles.viewSignUp}>
            <TextInput 
              style={styles.inputBoxEtape1} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Étape"
              placeholderTextColor = "#707070"
              multiline={true}
               />);
             <TouchableOpacity style={styles.buttonPlus} onPress={() => this.addTextInput(this.state.Etapes.length)} > 
             <Text style={styles.buttonText}>+</Text>
             </TouchableOpacity> 
                </View>    
                {this.state.Etapes.map((value, index) => {
                    return value
                  })}
                  
            
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
    textAlign:'center',
    fontSize:16,
    fontWeight:'500',    
  },
  inputBoxEtape1: {
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
  },
  inputBoxEtape2: {
    width:300,
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