import avatar from '../assets/images/user.png';
import '../assets/css/list_owner.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { addSingleItem } from '../actions/index';


import ListLinkButton from './buttons/list_link_button';
import ChatButton from './buttons/chat_button';
import AddListItemButton from './buttons/add_list_item_button'
import ListItems from './owner-list-item';

import dummyData from './dummyItemsData';


class ListOwner extends Component{

    goBack = () => {
        console.log('go back');
        this.props.history.goBack();
    }


    renderInput = (props) => {
    const{ input,label,meta: { touched,error } } = props;
    return (
        <div className="row">
            <label type="text">{label}</label>
            <input className="add-input-field" {...input} type="text" autoComplete="off" />
        </div>
    )
    }

    submitItem = () => {
        console.log('Submit Item this.props :', this.props);
    }

    render(){
        console.log('List this.props :', this.props);
        const { data } = dummyData;
        const listElements = data.map(item=>{
            return <ListItems key={item.ID} {...item} />
        })
        return     ( 
        <Fragment>
            <div className="list-container">
                {/*Top Nav*/}
                <div className="list-nav">
                    <div onClick={this.goBack}>
                        <i  className="back fas fa-chevron-left"></i>
                    </div>
                    <Link to="/list-shared">
                        <ListLinkButton />
                    </Link>
                </div>
                {/* User Avatar */}
                <Link to="/dashboard"><img id="avatar" src={avatar} alt="avatar"/></Link>
                {/* <!-- Main Content --> */}
                <div className="list-content">
                    {/* <!-- List name, details, and filter button --> */}
                    <div className="list-top">
                        <h4 className="list-title">Sue's Party</h4>
                        <h6 className="list-details">Saturday April 1st</h6>
                    </div>
                    {/* <!-- Items --> */}
                    <div className="list-items">
                        <div className="add">
                            {/* <input className="add-input-field" type="text" name="sauce" placeholder="Item Name" /> */}
                            <form onSubmit={()=>this.submitItem}>
                                <Field name="add_item" component={this.renderInput} label="Add Item" />
                                <AddListItemButton />
                            </form>
                        </div>
                        {listElements}
                    </div>
                    {/* <!-- Add List Button --> */}
                </div>
                {/* <!-- Footer --> */}
                <div className="list-footer">
                    <Link to="/chatmodal">
                        <ChatButton />
                    </Link>
                </div>
            </div>
        </Fragment>
        )
    }
}

ListOwner = reduxForm({
    form: 'add-item',
})(ListOwner);

export default connect(null,{
    addSingleItem
})(ListOwner); 