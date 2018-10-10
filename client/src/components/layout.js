import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListLinkButton from './buttons/list_link_button';
import ChatButton from './buttons/chat_button';
import AddListItemButton from './buttons/add_list_item_button'

export default class LayoutTemplate extends Component{

    render(){
        return( 
            <div className="layout-container">

           
                    <h1>Main Content Here</h1>
      
               
            </div>
        )
    }
}