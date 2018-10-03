import React from 'react';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => (    
    <div>
           <div className="container dark-text">
        {/* <Top Nav */}
        <div className="nav">
            <i className="fas fa-chevron-circle-left"></i>
            <div>Sign Out</div>
            <i className="fas fa-sign-out-alt"></i>
        </div>
        {/* <!-- Main Content --> */}
        <div className="listContent">
            {/* <!-- User name, details, user avatar --> */}
            <div className="top">
                    <h4 className="details">First Name <br/> Last Name</h4>
                    {/* <!-- <h4 className="details">Last Name</h4> --> */}

                    {/* <i className="far fa-user"></i> */}
                    <FontAwesomeIcon icon="stroopwafel" />
                    <FontAwesomeIcon icon="user" />
                    
            </div>
            {/* <!-- List Toggle --> */}
            <div className="list_toggle">
                    <div>All Lists</div>
                    <i className="fas fa-toggle-off"></i>
                    <button className="button">User Settings</button>
                </div>

            {/* <!-- Items --> */}
            <div className="items">
                <div className="item1">
                    <div className="left">
                        <i className="fas fa-link"></i>
                        My First List
                    </div>
                    <div className="right">
                        <i className="fas fa-unlock-alt"></i>
                        <i className="fas fa-cog"></i>
                    </div>
                </div>
                <div className="item2">
                    <div className="left">
                        <i className="fas fa-link"></i>
                        Office Potluck List
                    </div>
                    <div className="right">
                        <i className="fas fa-unlock-alt"></i>
                        <i className="fas fa-cog"></i>
                    </div>
                </div>
                <div className="item2">
                    <div className="left">
                        <i className="fas fa-link"></i>
                        Family Reunion
                    </div>
                    <div className="right">
                        <i className="fas fa-unlock-alt"></i>
                        <i className="fas fa-cog"></i>
                    </div>
                </div> 
            </div>
            <br/>
            {/* <!-- Add List Button --> */}
            <i className="fas fa-plus-circle"></i>
        </div>
    </div>
    </div>
)