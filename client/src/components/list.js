import avatar from '../assets/images/user.png';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/css/list_owner.scss';
import ListLinkButton from './buttons/list_link_button';
import ChatButton from './buttons/chat_button';
import AddListItemButton from './buttons/add_list_item_button'
import ListItems from './owner-list-item';
import { Fragment } from 'react';
import dummyData from './dummyItemsData';


export default class ListOwner extends Component{

    goBack = () => {
        console.log('go back');
        this.props.history.goBack();
    }

    addItem = async (values) => {
        console.log('Submitted Form values :', values);

        await this.props.addListItem(values);
    }

    render(){
        const { data } = dummyData;
        console.log('data :', data);
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
                            <input id="add-input" type="text" name="sauce" placeholder="Item Name" />
                            <AddListItemButton />
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
