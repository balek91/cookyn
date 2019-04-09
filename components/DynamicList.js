import React from 'react'
import {ListView, InteractionManager} from 'react-native'
import DynamicListRow from './DynamicListRow.js'


export default class DynamicList extends React.Component {

    state = {
        loading     : true,
        dataSource  : new ListView.DataSource({
            rowHasChanged : (row1, row2) => true 
        }),
        refreshing  : false,
        rowToDelete : null 
    }
  
 
  componentDidMount() {

}
    

 _loadData(){
    const data = this.props.data
    this.setState({
        dataSource: data
    })
    this.DataSource = data
 }

 render() {
        return (
            
                <ListView
                     dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                />
        )
    }

 _renderRow(rowData, sectionID, rowID) {
    return (
        <DynamicListRow
            remove={rowData.id === this.state.rowToDelete}
            onRemoving={this._onAfterRemovingElement.bind(this)}
        >
        </DynamicListRow>
    )
 }
 

 _deleteItem(id) {
    this.setState({
        rowToDelete : id
    })
 }

 _onAfterRemovingElement() {
    this.setState({
        rowToDelete : null,
        dataSource  : this.state.dataSource.cloneWithRows(this._data)
    })
 }

 componentWillUpdate(nextProps, nextState) {
    if (nextState.rowToDelete !== null) {
        this._data = this._data.filter((item) => {
            if (item.id !== nextState.rowToDelete) {
                return item
            }
        })
    }
 }
} 