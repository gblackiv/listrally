import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/app-list-rally-logo-icon-BLUE.svg';



export default props => (
    <div className="home-link-container">
        <Link to="/">
            <div className="home-link-logo-container">
                <img className="home-link-logo" src={logo} alt="logo"/>
            </div>
            <span className="home-link-text">ListRally</span>
        </Link>
    </div>
)