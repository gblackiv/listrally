import '../assets/css/list_owner.scss';
import dummyAvatar from '../assets/images/user.png'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userInfo } from 'os';


class UserName extends Component{

    constructor(props){
        super(props);
    
    }

    render(){
        let { userInfo = {}} = this.props;
        let name = 'Guest';
        console.log('UserInfo:', userInfo);
        if(userInfo.name){
            name = userInfo.name;
        }

        return ( 
            // <Link to="/dashboard"><img id="avatar" src={this.props.avatar} alt="avatar"/></Link>
            <h5 className="dashboard-details">{name}</h5>
        )
    }
}

function mapStateToProps(state){
    console.log('33333333', state);
    return {
        userInfo: state.list.user.user
    }
}

export default connect(mapStateToProps,{
    userInfo
})(UserName); 