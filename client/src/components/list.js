import avatar from '../assets/images/user.png';
import '../assets/css/list_owner.scss';
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


class ListOwner extends Component{

    componentDidMount() {
        console.log('componentdidmount this.props :', this.props);
        console.log('List Id:', this.props.match.params.url);
        this.props.getListData(this.props.match.params.url);
    }

    goBack = () => {
        this.props.history.goBack();
    }


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
        const {reset} = this.props;
        reset();
        const { itemName : name } = values;
        const testObject = {name, listID: 1, assignedUserID: 1}
        this.props.addSingleItem(testObject);
        this.props.getListData();
    }

    render(){
        const {handleSubmit} = this.props;
        console.log('List this.props :', this.props);
        let {items, list} = this.props;
        const sharedlistItems = items.map(item=>{
            return <ListItems key={item.ID} {...item} />
        })

        return ( 

            <div className="col-2">
                <header>
                    <Header buttons={[]}/>
                </header> 
                <div className='content'>
                    <div className="layout-container">
                        <div className="list-top">
                            <Link to="/dashboard"><img id="avatar" src={avatar} alt="avatar"/></Link>
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
                    <p>Footer Component Here</p>
                </footer>
            </div>

        )
    }
}

function mapStateToProps(state){
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