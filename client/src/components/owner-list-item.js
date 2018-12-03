import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteItem, getListData, editSingleItem } from '../actions';
import { Link } from 'react-router-dom';
import { Field, reduxForm, initialize } from 'redux-form';
import DeleteModal  from './delete_modal.js';
import EditItem from './edit_item.js';


class ListItem extends Component {

    state = {
        edit: false,
        value: this.props.itemName,
        modalStatus: false
    }
    close = () => this.setState({modalStatus: false});

    deleteSingleItem = ()=>{
        const {ID} = this.props;
        const itemID = {ID}
        this.props.deleteItem(itemID);
        this.props.getListData(this.props.url);
    }

    updateSingleItem=(values)=>{
        // const { ID, name, listID, assignedUserID } = request.body;
        const name = this.state.value;
        const { ID, listID} = this.props;
        let assignedUserID = 0;
        const updatedObject = {ID, name, listID, assignedUserID};
        this.props.editSingleItem(updatedObject);
        this.props.getListData(this.props.url);
        this.setState({
            edit: false
        })
    }

    enableEdit=()=>{
        this.setState({
            edit: true
        })
    }

    render() {
        const {handleSubmit} = this.props;
        const {itemName, userInfo, list} = this.props;
        return (
                <Fragment>
                    <DeleteModal isOpen={this.state.modalStatus} close={this.close} confirmDelete={() => {this.deleteSingleItem()}} />
                    {this.state.edit ? 
                        <div className="edit">
                            <form className='edit-form-container' onSubmit={handleSubmit(this.updateSingleItem.bind(this))}>
                                <Field name="itemName" listID={2} type="text" component={EditItem} defaultValue={itemName} parent={this} label="Add Item"/>
                            </form>
                        </div>
                        :
                        <div className="list-item">
                            <div className="list-left">
                                <label className="item-name">{itemName}</label>
                            </div>
                            <div className="list-right">
                              {userInfo.ID !== list[0].ownerID ? null : <Fragment><div onClick={this.enableEdit} className="edit"><i className="fas fa-pen"></i></div>
                                <div onClick={() => this.setState({modalStatus: true})} className="delete"><i className="fas fa-trash-alt"></i></div> </Fragment>}                    
                            </div>
                        </div> 
                    }
                </Fragment>
        )
    }
}


function mapStateToProps(state){
    return {
        list: state.list.list,
        items: state.list.items,
        user: state.list.userInfo
    }
}

ListItem = reduxForm({
    form: 'edit_single_item',
})(ListItem);

export default connect(mapStateToProps,{
    deleteItem, getListData, editSingleItem
})(ListItem); 
