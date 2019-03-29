import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'
import compare from '../../utils/CompareDate'

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


class New extends React.Component {

    static propTypes = {
        who: PropTypes.string,
        what:PropTypes.string,
        action : PropTypes.string,
        date: PropTypes.instanceOf(Date)
        }


    render(){
        const {who, what, action, date} = this.props;

        if (action == 'Create'){
            return(
                <StyledView >
                    <StyledViewArray>
                        <StyledTextArray>{`${who} a ajouté la recette "${what}"`}</StyledTextArray>
                        <StyledTextArray>{compare.getDifference(date)}</StyledTextArray>
                    </StyledViewArray>
                </StyledView>
            )
        } else if (action =='Favoris') {
            return(
                <StyledView>
                    <StyledViewArray>
                        <StyledTextArray>{`${who} a ajouté "${what}" à ses favoris`}</StyledTextArray>
                        <StyledTextArray>{compare.getDifference(date)} </StyledTextArray>
                    </StyledViewArray>
                </StyledView>
            )
        } else if (action == 'Follow')
        return(
            <StyledView>
                <StyledViewArray>
                    <StyledTextArray>{`${who} a commencé à suivre ${what}`}</StyledTextArray>
                    <StyledTextArray>{compare.getDifference(date)} </StyledTextArray>
                </StyledViewArray>
            </StyledView>
        )
    }
}

export default New