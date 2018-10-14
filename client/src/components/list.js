import '../assets/css/list_owner.scss';
import dummyAvatar from '../assets/images/user.png'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './header';

import { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { addSingleItem } from '../actions/index';
import { getListData } from '../actions/index';

import ListLinkButton from './buttons/list_link_button';
import ChatButton from './buttons/chat_button';
import AddListItemButton from './buttons/add_list_item_button'
import ListItems from './owner-list-item';
import Footer from './footer';
import { userInfo } from 'os';


class ListOwner extends Component{

    componentDidMount() {
        console.log('componentdidmount this.props :', this.props);
        console.log('List Id:', this.props.match.params.url);
        this.props.getListData(this.props.match.params.url);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    // componentDidUpdate(){
    //     const {list, userInfo : {ID: userID}} = this.props;
    //     if(list.length>0){//if list is finally loaded
    //         debugger;
    //          var {ownerID} = list[0];//pull owner ID out of it
    //     }
    //     if(userID!==ownerID){//if the current user ID is not the list's ownerID
    //         this.props.history.push('/');//bring them back to landing page
    //     }
    // }


    renderInput = (props) => {
    const { input } = props;
        return (
            <div className="row">
                <input className="add-input-field" {...input} type="text" autoComplete="off" placeholder="Add Item" />
                <AddListItemButton className="add-item-button btn btn-green" name="Add" />
            </div>
        )
    }

    submitItem = (values) => {
        console.log('Submit Item values :', values);
        const {reset, list} = this.props;
        if(list.length>0){
             var {ID: listID, ownerID} = list[0];
        }
        reset();
        const { itemName : name } = values;
        const testObject = {name, listID, assignedUserID: 0}
        this.props.addSingleItem(testObject);
        this.props.getListData(this.props.match.params.url);
    }

    render(){
        const {handleSubmit} = this.props;
        console.log('List this.props :', this.props);
        let {items, list, userInfo } = this.props;
        if(userInfo.avatar){
            var { avatar } = userInfo;
        }
        const sharedlistItems = items.map(item=>{
            return <ListItems key={item.ID} {...item} url={this.props.match.params.url} />
        })

        return ( 

            <div className="col-2">
                <header>
                    <Header url={this.props.match.params.url} buttons={['Back_button', 'List_link_button']}/>
                </header> 
                <div className='content'>
                    <div className="layout-container">
                        <div className="list-top">
                            <Link to="/dashboard"><img id="avatar" src={userInfo.avatar ? avatar : dummyAvatar } alt="avatar"/></Link>
                            <h4 className="list-title">{list.length>0 ? list[0].name : 'Sue\'s Party'}</h4>
                            <div className="list-date">{list.length>0 ? list[0].eventTime.substr(0, 10) : 'Saturday April 1st'}</div>
                            <h6 className="list-details">{list.length>0 ? list[0].description : 'Get spooky'}</h6>
                        </div>
                        <div className="list-items">
                            <div className="add">                       
                                <form onSubmit={handleSubmit(this.submitItem)}>
                                    <Field name="itemName" listID={2} type="text" component={this.renderInput} label="Add Item"/>
                             
                                </form>
                            </div>
                            {sharedlistItems}
                        </div>
                    </div>
                </div>
                <footer>
                    <Link to={`/list-shared/${this.props.match.params.url}`}><Footer buttons={['next_page_button']} /></Link>
                </footer>
            </div>

        )
    }
}

function mapStateToProps(state){
    return {
        list: state.list.list,
        items: state.list.items,
        userInfo: state.user.userInfo
    }
}

ListOwner = reduxForm({
    form: 'add_item',
})(ListOwner);

export default connect(mapStateToProps,{
    addSingleItem, getListData
})(ListOwner); 