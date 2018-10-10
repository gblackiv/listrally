import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListLinkButton from './buttons/list_link_button';

export default class Header extends Component{
    render(){
        return (    
            <div className="list-nav">
                <div onClick={this.goBack}>
                    <i className="fas fa-chevron-left"></i>
                </div>
                <Link to="/list-shared">
                    <ListLinkButton />
                </Link>
            </div>
        )
    }
}