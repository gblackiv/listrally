import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../actions';

class ListItem extends Component {

    deleteSingleItem = ()=>{
        console.log('delete Single item click handler work :', this.props);
        // const { ID } = request.body;
        const {ID} = this.props;
        const itemID = {ID}
        this.props.deleteItem(itemID);//this is not working because the server doesn't recognize the ID
        //for some reason
        // this.props.history.push('/list');
        this.props.history.push('/')
    }

    updateSingleItem=()=>{
        // const { ID, name, listID, assignedUserID } = request.body;
        const { ID, itemName: name,} = this.props;
        let assignedUserID = 0;
        const listID = 1;
        const updatedObject = {ID, name, listID, assignedUserID}
        console.log('updatedObject :', updatedObject);
        //this function needs to lead to another page or a modal to edit the item
    }

    render() {
        const {itemName} = this.props;
        console.log('OWNER LIST ITEM this.props :', this.props);
        return (
            <Fragment>
                <div className="list-item">
                    <div className="list-left">
                        <i class="sort fas fa-sort"></i>
                        <label>{itemName}</label>
                    </div>
                    <div className="list-right">
                        <div onClick={this.updateSingleItem} className="edit"><i class="fas fa-pen"></i></div>
                        <div onClick={this.deleteSingleItem} className="delete"><i class="fas fa-trash-alt"></i></div>                     
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    // console.log('Redux state.list.list inside mapStateToProp :', state.list.list);
    return {
        list: state.list.list,
        items: state.list.items
    }
}


export default connect(mapStateToProps,{
    deleteItem
})(ListItem); 

