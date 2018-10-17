import React, { Component } from 'react';
import '../assets/css/tooltips.css';
import { connect } from 'react-redux';
import { sendUserNotification } from '../actions';

class userNotification extends Component{
    constructor(props){
        super(props);
        this.state = {
            isChecked: !!props.notificationsSettings,
            style: {},
            isLogOn: true
        }
    }

    toggleCheck(){
        const { notificationsSettings, userInfo } = this.props;
        const {ID: userID} = userInfo;
        if(!userID){//if user is not logged in
            this.setState({
                isLogOn: false
            })
            return;
        }
        if(userID!==notificationsSettings && notificationsSettings>0){//if user is not the one who checked the box
            //and the box has already been checked
            return;
        }
        if(userID===notificationsSettings){//if the user is the one who checked the box first
            this.setState({//allow checkbox to be toggled
                isChecked: !this.state.isChecked
            })
            this.sendInfoToServer();
            return;
        }
        this.setState({
            isChecked: !this.state.isChecked,
        })
        this.sendInfoToServer();
    }

    sendInfoToServer = () => {
        //const { ID, name, listID, notificationsSettings } = request.body;
        let { ID, listID, itemName: name, userInfo : {ID: userID}, notificationsSettings} = this.props;
        if(userID===notificationsSettings){//if box is checked and user is the one who checked it
            notificationsSettings = 0;//removes their name and sets checkbox back to being unchecked
        } else{
            notificationsSettings = userID;
        }
        const checkboxObject = {ID, name, listID, notificationsSettings};
        this.props.sendUserNotification(checkboxObject);
    }

    render(){
        console.log('User Checkbox this.props :', this.props);
        const {isChecked} = this.state;
        const {name} = this.props;
        return(
            <div className="dashboard_toggle">
                <input type="checkbox" name={name} value={name} checked={isChecked ? 'checked' : false}  onChange={this.toggleCheck} />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        list: state.list.list,
        items: state.list.items,
        userInfo: state.user.userInfo
    }
}

export default connect(mapStateToProps,{
    sendUserNotification
})(userNotification); 