import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';

export default class CreateList extends Component{

    render(){
        return(
            <div className="col-2">
            <header>
                {/* <Header buttons={['Back_button', 'Home_nav_button']}/> */}
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