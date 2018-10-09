import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/css/home.scss';
import logo from '../assets/images/todolist.png';
import newList from '../assets/images/new-list-white.png';
import { Link } from 'react-router-dom';
import ListButton from './buttons/list_button';
import SignInButton from './buttons/sign_in_button';



export default class Home extends Component{
    render(){
        return (    
            <div>
                <div className="home-container">
                    <div className="home-content">
                        <img id="logo" src={logo} alt="logo"/>
                        <div className="home-title">ListRally</div>
                        <SignInButton />
                        <div className="new-list">
                            <p className="instruction">Click the + icon to make a list</p>
                            <Link to="/list"><img className="new-list-btn" src={newList} alt="new_list"/></Link>
                        </div>
                        <div className="home-templates">
                            <p className="instruction">or click the arrow to select a list template</p>
                                <ListButton />
                            <div>
                                <div className="home-hidden template">Office potluck list</div>
                                <div className="home-hidden template">BBQ at the park lIst</div>
                                <div className="home-hidden template">A day at the beach list</div>
                                <div className="home-hidden template">Vegan dinner party list<div/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
