import '../assets/css/list_owner.scss';
import dummyAvatar from '../assets/images/user.png'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userInfo } from 'os';


class Avatar extends Component{

    constructor(props){
        super(props);
    
    }

    render(){
        console.log('This.prop: ', this.props);
        let { userInfo } = this.props;
        console.log('User Info: ', userInfo);
        if(userInfo.avatar){
            var { avatar } = userInfo;
        }

        return ( 
            <Link to="/dashboard"><img id="avatar" src={this.props.avatar} alt="avatar"/></Link>
        )
    }
}

function mapStateToProps(state){
    console.log('State: ', state);
    return {
        userInfo: state.user.userInfo
    }
}

export default connect(mapStateToProps,{
    userInfo
})(Avatar); 