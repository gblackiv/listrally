import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import ListLinkButton from './buttons/list_link_button';
import ChatButton from './buttons/chat_button';
import AddListItemButton from './buttons/add_list_item_button'

export default class LayoutTemplate extends Component{

    render(){
        return(
            <div className="col-2">
            <header>
                <Header />
            </header> 
                <div className='content'>
                    <div className="layout-container">

            
                        <h1>Main Content Here</h1>
        
                    </div>
                </div>
                <footer>
                    <p>Footer Component Here</p>
                </footer>
            </div>
        )
    }
}