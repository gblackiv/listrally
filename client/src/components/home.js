import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/css/home.scss';
import logo from '../assets/images/todolist.png';
import google from '../assets/images/google-signin/btn_google_signin_dark_normal_web.png'
import { Link } from 'react-router-dom';



export default class Home extends Component{
    render(){
        return     (    
            <div>
                <div className="home-container">
                    <div className="home-content">
                        <img id="logo" src={logo} alt="logo"/>
                        <div className="home-title">ListRally</div>
                        <img src={google} alt="" className="sign-in"/>
                        <p>Click the + icon to make a list</p>
                        <Link to="/list"><i className="home-add fas fa-plus-square"></i></Link>
                        <div className="home-templates">
                            <p>click the down arrow for list templates</p>
                            <i className="home-arrow fas fa-angle-down"></i>
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
