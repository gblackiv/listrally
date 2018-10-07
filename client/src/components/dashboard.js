import React from 'react';
import '../assets/css/dashboard.css';

export default props => (    
    <div>
           <div className="dashboard-container dark-text">
        {/* <Top Nav */}
        <div className="dashboard-nav">
            <i className="far fa-chevron-circle-left"></i>
            <div className="dashboard-signout">Sign Out</div>
            <i className="far fa-sign-out-alt"></i>
            
        </div>
        {/* <!-- Main Content --> */}
        <div className="dashboard-content">
            {/* <!-- User name, details, user avatar --> */}
            <div className="dashboard-top">
                    <h5 className="dashboard-details">First Name <br/> Last Name</h5>
                    {/* <!-- <h4 className="details">Last Name</h4> --> */}

                    <i className="dashboard_user fal fa-user"></i>
                    {/* <FontAwesomeIcon icon="stroopwafel" /> */}
                    {/* <FontAwesomeIcon icon="user" /> */}
                    
            </div>
            {/* <!-- dashboard Toggle --> */}
            <div className="dashboard_toggle">
                    <div>All dashboards</div>
                    <div>
                    {/* <i className="fas fa-toggle-off"></i> */}
                    <input type="checkbox" id="switch" /><label className="label-user" for="switch"></label>
                    </div>
                    <button className="dashboard-button btn-blue">User Settings</button>
                </div>

            {/* <!-- dashboard-items --> */}
            <div className="dashboard-items">
                <div className="dashboard-item1">
                    <div className="dashboard-left">
                        <i className="dashboard_link far fa-link btn-blue"></i>
                        <div className="dashboard_text">My First dashboard</div>
                    </div>
                    <div className="dashboard-right">
                        <i className="fas fa-lock-alt btn-red"></i>
                        <i className="fas fa-cog btn-grey"></i>
                    </div>
                </div>
                <div className="dashboard-item2">
                    <div className="dashboard-left">
                        <i className="dashboard_link far fa-link btn-blue"></i>
                        <div className="dashboard_text">Office Potluck dashboard</div>
                    </div>
                    <div className="dashboard-right">
                        {/* <i className="fas fa-unlock-alt"></i>
                        <i className="fas fa-cog"></i> */}
                    </div>
                </div>
                <div className="dashboard-item2">
                    <div className="dashboard-left">
                        <i className="dashboard_link far fa-link btn-blue"></i>
                        <div className="dashboard_text">Family Reunion dashboard</div>
                    </div>
                    <div className="dashboard-right">
                        <i className="fas fa-unlock-alt btn-green"></i>
                        <i className="fas fa-cog btn-grey"></i>
                    </div>
                </div> 
            </div>
            <br/>
            {/* <!-- Add dashboard Button --> */}
            <i className="dashboard_plus fal fa-plus-circle btn-green"></i>
            {/* <button className="btn btn-green ">+</button> */}
        </div>
    </div>
    </div>
)