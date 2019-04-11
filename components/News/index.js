import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'
import compare from '../../utils/CompareDate'
import TouchableLink from '../TouchableLink'
import { AsyncStorage } from 'react-native';

const StyledView = styled.View
	`
flex: 1;
justifyContent: center;
alignItems: center;
backgroundColor: rgba(52, 52, 52, 0.1)`

const StyledTextArray = styled.Text
	`
fontWeight: 300;
fontSize: 16;
margin:20px 10px 10px 25px;

`

const StyledViewArray = styled.View`
justifyContent: center;
alignItems: flex-start;
backgroundColor: #F5FCFF;
border-radius:10;
border-width:0.5;
margin: 0px 20px 10px 20px
width:90%;
`

export default class Actu extends React.Component {

    static propTypes = {
        who: PropTypes.string,
        what:PropTypes.string,
        action : PropTypes.string,
        date: PropTypes.instanceOf(Date),
        }

        goProfilPage =(navigation, idWho) =>{
		    navigation.push('ProfilUser',{contact : idWho} )
        }

        goRecettePage=(navigation, idWhat) =>{
            var recette = {
                idRecette : idWhat
            }
            navigation.push('DetailRecette',{recette : recette} )
        }

    render(){
        const {who, what, action, date, navigation, idWho, idWhat, currentUser} = this.props;

        if (action == 'Create'){
            return(
                <StyledView >
                    <StyledViewArray>
                        <StyledTextArray>
                        <TouchableLink
								text={who}
								onPressFunction={()=> this.goProfilPage(navigation,idWho)}
								widthTouchable={200}
								backgroundColorTouchable='rgba(245, 252, 255, 0.1)'
								colorText='#000'
							/>
                        {" a ajouté la recette "}<TouchableLink
								text={what}
								onPressFunction={()=> this.goRecettePage(navigation,idWhat)}
								widthTouchable={200}
								backgroundColorTouchable='rgba(245, 252, 255, 0.1)'
								colorText='#000'
							/></StyledTextArray>
                        <StyledTextArray>{compare.getDifference(date)}</StyledTextArray>
                    </StyledViewArray>
                </StyledView>
            )
        } else if (action =='Favoris') {
            return(
                <StyledView>
                    <StyledViewArray>
                        <StyledTextArray><TouchableLink
								text={who}
								onPressFunction={()=> this.goProfilPage(navigation, idWho)}
								widthTouchable={200}
								backgroundColorTouchable='rgba(245, 252, 255, 0.1)'
								colorText='#000'
							/>{" a ajouté "} <TouchableLink
                            text={what}
                            onPressFunction={()=> this.goRecettePage(navigation,idWhat)}
                            widthTouchable={200}
                            backgroundColorTouchable='rgba(245, 252, 255, 0.1)'
                            colorText='#000'
                        />{ " à ses favoris "}
                           </StyledTextArray>
                        <StyledTextArray>{compare.getDifference(date)} </StyledTextArray>
                    </StyledViewArray>
                </StyledView>
            )
        } else if (action == 'Follow')

        if(currentUser == idWhat) {
            return(
                <StyledView>
                    <StyledViewArray>
                        <StyledTextArray><TouchableLink
                                    text={who}
                                    onPressFunction={()=> this.goProfilPage(navigation, idWho)}
                                    widthTouchable={200}
                                    backgroundColorTouchable='rgba(245, 252, 255, 0.1)'
                                    colorText='#000'
                                />{" à commencé à vous suivre "}</StyledTextArray>
                        <StyledTextArray>{compare.getDifference(date)} </StyledTextArray>
                    </StyledViewArray>
                </StyledView>
            )

        } else{

        
        return(
            <StyledView>
                <StyledViewArray>
                    <StyledTextArray><TouchableLink
								text={who}
								onPressFunction={()=> this.goProfilPage(navigation, idWho)}
								widthTouchable={200}
								backgroundColorTouchable='rgba(245, 252, 255, 0.1)'
								colorText='#000'
							/>{" à commencé à suivre "}<TouchableLink
                            text={what}
                            onPressFunction={()=> this.goProfilPage(navigation,idWhat)}
                            widthTouchable={200}
                            backgroundColorTouchable='rgba(245, 252, 255, 0.1)'
                            colorText='#000'
                        /></StyledTextArray>
                    <StyledTextArray>{compare.getDifference(date)} </StyledTextArray>
                </StyledViewArray>
            </StyledView>
        )
    }
    }
}

 