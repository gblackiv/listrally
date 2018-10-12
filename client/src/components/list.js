import avatar from '../assets/images/user.png';
import '../assets/css/list_owner.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { addSingleItem } from '../actions/index';
import { getListData } from '../actions/index';

import ListLinkButton from './buttons/list_link_button';
import ChatButton from './buttons/chat_button';
import AddListItemButton from './buttons/add_list_item_button'
import ListItems from './owner-list-item';


class ListOwner extends Component{

    componentDidMount() {
        console.log('componentdidmount this.props :', this.props);
        this.props.getListData();//getListData becomes part of props from the connect function down below
    }

    goBack = () => {
        console.log('go back');
        this.props.history.goBack();
    }


    renderInput = (props) => {
    const { input } = props;
        return (
            <div className="row">
                <input className="add-input-field" {...input} type="text" autoComplete="off" placeholder="Add Item" />
            </div>
        )
    }

    submitItem = (values) => {
        console.log('Submit Item values :', values);
        const { itemName : name } = values;
        const testObject = {name, listID: 1, assignedUserID: 1}
        this.props.addSingleItem(testObject);
        this.props.getListData();
    }

    render(){
        const {handleSubmit} = this.props;
        console.log('List this.props :', this.props);

        let {items, list} = this.props;
        console.log('list Info :', list[0]);
        // if(list.length>0){
        //     const {description, ID, eventTime, name, ownerID, securityStatus, status, url} = list[0];
        //     console.log(description, ID, eventTime, name, ownerID, securityStatus, status, url);
        // }
        const sharedlistItems = items.map(item=>{
            return <ListItems key={item.ID} {...item} />
        })

        return ( 
            <Fragment>
                <div className="list-container">
                    <div className="list-nav">
                        <div onClick={this.goBack}>
                            <i  className="back fas fa-chevron-left"></i>
                        </div>
                        <Link to="/list-shared">
                            <ListLinkButton />
                        </Link>
                    </div>
                    <Link to="/dashboard"><img id="avatar" src={avatar} alt="avatar"/></Link>
                    <div className="list-content">
                        <div className="list-top">
                            <h4 className="list-title">{list.length>0 ? list[0].name : 'Sue\'s Party'}</h4>
                            <h6 className="list-details">{list.length>0 ? list[0].description : 'Get spooky'}</h6>
                            <div className="list-date">{list.length>0 ? list[0].eventTime : 'Saturday April 1st'}</div>
                        </div>
                        <div className="list-items">
                            <div className="add">                       
                                <form onSubmit={handleSubmit(this.submitItem)}>
                                    <Field name="itemName" listID={2} type="text" component={this.renderInput} label="Add Item"/>
                                    <div className="add-item-btn">
                                        <AddListItemButton className="add-item-button" name="Add Item" />
                                    </div>                               
                                </form>
                            </div>
                            {sharedlistItems}
                        </div>
                    </div>
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

function mapStateToProps(state){//the redux will be given to us in its entirety when this function is called
    //the redux state is the same no matter where you try to access it
    console.log('Redux state.list.list inside mapStateToProp :', state.list.list);
    return {
        list: state.list.list,
        items: state.list.items
    }
}

ListOwner = reduxForm({
    form: 'add_item',
})(ListOwner);

export default connect(mapStateToProps,{
    addSingleItem, getListData
})(ListOwner); 