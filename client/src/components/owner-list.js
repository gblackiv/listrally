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
// import addItemImage from '../assets/images/list-hand-placeholder.png';


class OwnerList extends Component{

    constructor(props){
        super(props);
        this.url = this.props.match.params.url;
    }

    componentDidMount() {
        this.props.getListData(this.url);
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
                <input className="add-input-field" {...input} type="text" autoComplete="off" placeholder="Eg. plastic plates" />
                <AddListItemButton className="add-item-button btn btn-green" name="Add" />
            </div>
        )
    }

    submitItem = (values) => {
        console.log('Submit Item values :', values);
        const {reset, list, userInfo: {ID}} = this.props;
        if(list.length>0){
             var {ID: listID, ownerID} = list[0];
             if(ownerID!==ID){
                 return;
             }
        }
        const { itemName : name } = values;
        const testObject = {name, listID, assignedUserID: 0}
        this.props.addSingleItem(testObject);
        this.props.getListData(this.url);
        reset();//clears form after submitting
    }

    render(){
        const {handleSubmit} = this.props;
        console.log('List this.props :', this.props);
        console.log('List this.props.history :', this.props.history);
        let {items, list, userInfo } = this.props;
        if(userInfo.avatar){
            var { avatar } = userInfo;
        }
        const sharedlistItems = items.map(item=>{
            return <ListItems key={item.ID} {...item} url={this.url} />
        })

        return(
            <div className="col-2">
            <header>
                <Header url={this.url} buttons={['Back_button', 'Home_nav_button', 'List_link_button']} history={this.props.history} avatar={userInfo.avatar ? avatar: null}  login={this.props.userInfo.ID}  />
            </header> 
                <div className='content'>
                    <div className="layout-container">
                        <div className="list-top">
                        {/* <Link to="/dashboard"><img id="avatar" src={userInfo.avatar ? avatar : dummyAvatar } alt="avatar"/></Link> */}
                       <h4 contenteditable="true" className="list-title">{list.length>0 ? list[0].name : ''}</h4>
                       <div className="list-date">{list.length>0 ? list[0].eventTime.slice(0, 19).replace('T', ' ')  : ''}</div>
                        <h6 className="list-details">{list.length>0 ? list[0].description : ''}</h6>
                   </div>
                    <div className="add">                       
                        <form className='add-item-form-container' onSubmit={handleSubmit(this.submitItem)}>
                            <Field name="itemName" listID={2} type="text" component={this.renderInput} label="Add Item"/>
                        </form>
                    </div>
                    <div className="list-items">
                        {items ? sharedlistItems : <div>Loading...</div>}
                    </div>
                    {/* <div className="add-item-image">
                        <img src={addItemImage} alt="" />
                    </div> */}
                    </div>
                </div>
                <footer>
                    <Link to={`/list-shared/${this.url}`}><Footer buttons={['next_page_button']} /></Link>
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

OwnerList = reduxForm({
    form: 'add_item',
})(OwnerList);

export default connect(mapStateToProps,{
    addSingleItem, getListData
})(OwnerList); 

