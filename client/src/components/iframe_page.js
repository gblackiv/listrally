import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

export default class IframeLoginPage extends Component{

    render(){
        return(
            <div className="col-2">
            <header>
                {/* <Header buttons={['Back_button']}/> */}
            </header> 
                <div className='content'>
                    <div className="layout-container">

            
                        <h2>You have successfuly logged in!</h2>
                        <h3>Redirecting...</h3>
        
                    </div>
                </div>
                <footer>
                    <p>Footer Component Here</p>
                </footer>
            </div>
        )
    }
}