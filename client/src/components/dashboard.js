import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/dashboard.css';

import Header from './header';
import Footer from './footer';
import Avatar from './avatar';
import DashboardCard from './dashboard_card';
import { connect } from 'react-redux';
import { getListTitle} from '../actions/index';
import UserNotification from './user_notification';

class DashBoard extends Component { 
    constructor(props) {
      super(props);

      this.state = {
        isIconLocked: false,
      }
    }

        componentDidMount(){
        this.props.getListTitle();
    }
    render() {
        const {user} = this.props;
        if(user){
            var avatar = user.avatar
        }
        console.log('Dashboard Props', this.props.user);

        const listCards = this.props.allLists.map( list => {
            return (
                <DashboardCard title={list.name} {...list}/>
            )
        });


        return (    
        <div className="col-2">
            <header>
                <Header avatar={user ? avatar : null} buttons={['Back_button', 'Home_nav_button', 'Sign_out_button']} history={this.props.history}/>
            </header> 
            <div className='content'>
                <div className="layout-container">
                    <div className="dark-text">
                        {/* <Top Nav */}
                        {/* <!-- User name, details, user avatar --> */}
                        <div className="dashboard-top">
                            <h5 className="dashboard-details">First Name <br/> Last Name</h5>
                        {/* <!-- <h4 className="details">Last Name</h4> --> */}
                        {/* <i className="dashboard_user fal fa-user"></i> */}
                        <Avatar avatar={user ? avatar : null} />   
                        </div>
                        {/* <!-- dashboard Toggle --> */}
                        <div className="dashboard_toggle">
                            {/* <div>All Lists</div> */}
                            <div>
                            {/* <i className="fas fa-toggle-off"></i> */}
                            {/* <input type="checkbox" id="switch" /><label className="label-user" for="switch"></label> */}
                            </div>
                            {/* <button className="dashboard-button btn btn-blue">User Settings</button> */}
                            {/* Notifications 
                            <UserNotification/> */}
                        </div>
                        {/* <!-- dashboard-items --> */}
                        {listCards}
                    </div>
                </div>
            </div>
            <footer>
                <Link to="/create-list"><Footer buttons={['new_list_button']} /></Link>
            </footer>
        </div>
        );
    }
}

function mapStateToProps(state){
    console.log('1111: ', state.list.user.user);
    return {
        list: state.list.list,
        allLists: state.list.allLists,
        user: state.list.user.user
    }
}

export default connect(mapStateToProps,{
    getListTitle
})(DashBoard); 
