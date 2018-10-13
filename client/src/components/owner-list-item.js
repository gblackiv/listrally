import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../actions';
import { getListData } from '../actions/index';

class ListItem extends Component {

    deleteSingleItem = ()=>{
        console.log('Delete single item this.props :', this.props);
        // const { ID } = request.body;
        const {ID} = this.props;
        const itemID = {ID}
        this.props.deleteItem(itemID);
        this.props.getListData(this.props.url);
    }

    updateSingleItem=()=>{
        // const { ID, name, listID, assignedUserID } = request.body;
        const { ID, itemName: name,} = this.props;
        let assignedUserID = 0;
        const listID = 1;
        const updatedObject = {ID, name, listID, assignedUserID}
        console.log('updatedObject :', updatedObject);
    }

    render() {
        const {itemName} = this.props;
        console.log('OWNER LIST ITEM this.props :', this.props);
        return (
            <Fragment>
                <div className="list-item">
                    <div className="list-left">
                        <i className="sort fas fa-sort"></i>
                        <label>{itemName}</label>
                    </div>
                    <div className="list-right">
                        <div onClick={this.updateSingleItem} className="edit"><i className="fas fa-pen"></i></div>
                        <div onClick={this.deleteSingleItem} className="delete"><i className="fas fa-trash-alt"></i></div>                     
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    return {
        list: state.list.list,
        items: state.list.items
    }
}


export default connect(mapStateToProps,{
    deleteItem, getListData
})(ListItem); 

