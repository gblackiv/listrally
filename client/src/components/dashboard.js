import React from 'react';
import './dashboard.css';

export default props => (    
    <div>
           <div className="container dark-text">
        {/* <Top Nav */}
        <div className="nav">
            <i className="far fa-chevron-circle-left"></i>
            <div className="signout">Sign Out</div>
            <i className="far fa-sign-out-alt"></i>
            
        </div>
        {/* <!-- Main Content --> */}
        <div className="listContent">
            {/* <!-- User name, details, user avatar --> */}
            <div className="top">
                    <h5 className="details">First Name <br/> Last Name</h5>
                    {/* <!-- <h4 className="details">Last Name</h4> --> */}

                    <i className="fal fa-user"></i>
                    {/* <FontAwesomeIcon icon="stroopwafel" /> */}
                    {/* <FontAwesomeIcon icon="user" /> */}
                    
            </div>
            {/* <!-- List Toggle --> */}
            <div className="list_toggle">
                    <div>All Lists</div>
                    <i className="fas fa-toggle-off"></i>
                    <button className="button btn-blue">User Settings</button>
                </div>

            {/* <!-- Items --> */}
            <div className="items">
                <div className="item1">
                    <div className="left">
                        <i className="far fa-link btn-blue"></i>
                        <div className="list_text">My First List</div>
                    </div>
                    <div className="right">
                        <i className="fas fa-lock-alt btn-red"></i>
                        <i className="fas fa-cog btn-grey"></i>
                    </div>
                </div>
                <div className="item2">
                    <div className="left">
                        <i className="far fa-link btn-blue"></i>
                        <div className="list_text">Office Potluck List</div>
                    </div>
                    <div className="right">
                        {/* <i className="fas fa-unlock-alt"></i>
                        <i className="fas fa-cog"></i> */}
                    </div>
                </div>
                <div className="item2">
                    <div className="left">
                        <i className="far fa-link btn-blue"></i>
                        <div className="list_text">Family Reunion List</div>
                    </div>
                    <div className="right">
                        <i className="fas fa-unlock-alt btn-green"></i>
                        <i className="fas fa-cog btn-grey"></i>
                    </div>
                </div> 
            </div>
            <br/>
            {/* <!-- Add List Button --> */}
            <i className="fal fa-plus-circle btn-green"></i>
            {/* <button className="btn btn-green ">+</button> */}
        </div>
    </div>
    </div>
)