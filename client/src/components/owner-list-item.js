import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteItem, getListData, editSingleItem } from '../actions';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

class ListItem extends Component {

    state = {
        edit: false
    }

    renderInput = (props) => {
        const { input } = props;
        console.log('input :', input);
        return (
            <div className="row">
                <input className="add-input-field" {...input} type="text" autoComplete="off" />
                <button className="btn btn-blue">Edit</button>
            </div>
        )
    }

    deleteSingleItem = ()=>{
        const {ID} = this.props;
        const itemID = {ID}
        this.props.deleteItem(itemID);
        this.props.getListData(this.props.url);
    }

    updateSingleItem=(values)=>{
        // const { ID, name, listID, assignedUserID } = request.body;
        const {itemName: name} = values;
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
        console.log('List Item this.props :', this.props);
        const {itemName} = this.props;
        return (
                <div className="list-item">
                    {this.state.edit ? 
                        <div className="add">                       
                            <form className='add-item-form-container' onSubmit={handleSubmit(this.updateSingleItem)}>
                                <Field name="itemName" listID={2} type="text" component={this.renderInput} label="Add Item"/>
                            </form>
                        </div>
                        :
                        <div className="list-item">
                            <div className="list-left">
                                {/* <i className="sort fas fa-sort"></i> */}
                                <label className="item-name">{itemName}</label>
                            </div>
                            <div className="list-right">
                                <div onClick={this.enableEdit} className="edit"><i className="fas fa-pen"></i></div>
                                <div onClick={this.deleteSingleItem} className="delete"><i className="fas fa-trash-alt"></i></div>                     
                            </div>
                        </div> 
                    }
                </div>
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