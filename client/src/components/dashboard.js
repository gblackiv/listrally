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
import DashboardUsername from './dashboard_username';
import UserName from './dashboard_username';
import emptyListImage from '../assets/images/empty-list.png'
import { relative } from 'path';

const style = {
    width: '275px',
    position: 'relative',
    left: '50%',
    transform: 'translateX',
    transform: 'translateX(-50%)'
}

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
        const {user, allLists} = this.props;
        if(user){
            var avatar = user.avatar
            var {GivenName, familyName} = user;
        }

        const listCards = this.props.allLists.map( list => {
            return (
                <DashboardCard key={list.name} title={list.name} {...list}/>
            )
        });


        return (    
        <div className="col-2">
            <header>
                <Header avatar={user ? avatar : null} buttons={['Back_button', 'Home_nav_button', 'Sign_out_button']} history={this.props.history}  />
            </header> 
            <div className='content'>
                <div className="layout-container">
                    <div className="dark-text">
  
                        <div className="dashboard-top">
                            <img id="avatar" src={avatar} alt="avatar" />
                            <UserName/>
                        </div>
                        {/* <div className="dashboard_toggle"> */}
                            {/* <div>All Lists</div> */}
                            {/* <div> */}
                            {/* <i className="fas fa-toggle-off"></i> */}
                            {/* <input type="checkbox" id="switch" /><label className="label-user" for="switch"></label> */}
                            {/* </div> */}
                            {/* <button className="dashboard-button btn btn-blue">User Settings</button> */}
                            {/* Notifications 
                            <UserNotification/> */}
                        {/* </div> */}
                        {allLists[0] ? listCards : <img style={style} src={emptyListImage}/>}
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
    return {
        list: state.list.list,
        allLists: state.list.allLists,
        user: state.list.user.user
    }
}

export default connect(mapStateToProps,{
    getListTitle
})(DashBoard); 
