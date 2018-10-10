import React, { Component } from 'react';
import '../assets/css/dashboard.css';
import LockIcons from './buttons/lock_buttons';
import SettingsButton from './buttons/settings_button';
import Header from './header';
import Avatar from './avatar';
import DashboardCard from './dashboard_card';


class DashBoard extends Component { 
    constructor(props) {
      super(props);

      this.state = {
        isIconLocked: false,
      }

    }

      render() {
        return (    
            
            <div className="col-2">
            <header>
                <Header buttons={['Back_button', 'List_link_button']}/>
            </header> 
                <div className='content'>
                    <div className="layout-container">

            
            <div>
                <div className="dark-text">
                {/* <Top Nav */}
                {/* <div className="dashboard-nav">
                    <i className="far fa-chevron-circle-left"></i>
                    <div className="dashboard-signout">Sign Out</div>
                    <i className="far fa-sign-out-alt"></i>
                    
                </div> */}
                {/* <!-- Main Content --> */}

                    {/* <!-- User name, details, user avatar --> */}
                    <div className="dashboard-top">
                            <h5 className="dashboard-details">First Name <br/> Last Name</h5>
                            {/* <!-- <h4 className="details">Last Name</h4> --> */}

                            {/* <i className="dashboard_user fal fa-user"></i> */}
                            <Avatar/>

                            {/* <FontAwesomeIcon icon="stroopwafel" /> */}
                            {/* <FontAwesomeIcon icon="user" /> */}
                            
                    </div>
                    {/* <!-- dashboard Toggle --> */}
                    <div className="dashboard_toggle">
                            <div>All Lists</div>
                            <div>
                            {/* <i className="fas fa-toggle-off"></i> */}
                            <input type="checkbox" id="switch" /><label className="label-user" for="switch"></label>
                            </div>
                            <button className="dashboard-button btn btn-blue">User Settings</button>
                        </div>

                    {/* <!-- dashboard-items --> */}
                    <DashboardCard/>
                    {/* <div className="dashboard-items">
                        <div className="dashboard-item1">
                            <div className="dashboard-left">
                                <i className="dashboard_link far fa-link btn-blue"></i>
                                <div className="dashboard_text">My First List</div>
                            </div>
                            <div className="dashboard-right">
                            <LockIcons />
                            <SettingsButton />
                                
                            </div>
                        </div>
                        <div className="dashboard-item2">
                            <div className="dashboard-left">
                                <i className="dashboard_link far fa-link btn-blue"></i>
                                <div className="dashboard_text">Office Potluck List</div>
                            </div>
                            <div className="dashboard-right">

                            </div>
                        </div>
                        <div className="dashboard-item2">
                            <div className="dashboard-left">
                                <i className="dashboard_link far fa-link btn-blue"></i>
                                <div className="dashboard_text">Family Reunion List</div>
                            </div>
                            <div className="dashboard-right">
                                <LockIcons /><SettingsButton />
                                

                            </div>
                        </div> 

                    <br/>
                   
                    <i className="dashboard_plus fal fa-plus-circle btn-green"></i>

                </div> */}
            </div>
        </div>
        
                    </div>
                </div>
                <footer>
                    <p>Footer Component Here</p>
                </footer>
            </div>
    );

    }
}
export default DashBoard;
