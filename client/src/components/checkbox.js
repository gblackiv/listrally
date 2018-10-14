import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { sendCheckboxInfo, deleteItem, getListData } from '../actions';
import blankImage from '../assets/images/nothing.png';

const crossedOutTextStyle = {
    textDecoration: 'line-through'
}

class Checkbox extends Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked: !!props.assignedUserID,
            style: {}
        }
        this.toggleCheck = this.toggleCheck.bind(this);
    }

    toggleCheck(){
        const { assignedUserID, userInfo } = this.props;
        const {ID: userID} = userInfo;
        if(userID!==assignedUserID && assignedUserID>0){//if user is not the one who checked the box
            //and the box has already been checked
            return;
        }
        // if(!isChecked){//if checkbox is unchecked
        //     console.log('this.state :', this.state);
        //     debugger;
        //     this.setState({//allow checkbox to be toggled
        //         isChecked: !!this.state.isChecked
        //     })
        //     this.sendInfoToServer();
        // }
        if(userID===assignedUserID){//if the user is the one who checked the box first
            console.log('this.state :', this.state);
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
        //const { ID, name, listID, assignedUserID } = request.body;
        let { ID, listID, itemName: name, userInfo : {ID: userID}, assignedUserID} = this.props;
        if(userID===assignedUserID){
            assignedUserID = 0;
        } else{
            assignedUserID = userID;
        }
        const testCheckboxObject = {ID, name, listID, assignedUserID};
        console.log('testCheckboxObject :', testCheckboxObject);
        this.props.sendCheckboxInfo(testCheckboxObject);
        this.props.getListData(this.props.url);
    }


    render(){
        // const { ID, name, listID, assignedUserID } = request.body;
        console.log('Checkbox this.props :', this.props);
        const {name, avatar} = this.props;
        const {isChecked} = this.state;
        return (
            <Fragment>
                <div className="list_item">
                    <div className="shared-left">
                        {/* <input type="checkbox" name={name} value={name} checked={assignedUserID ? 'checked' : false} onChange={()=>this.props.checkItem()} /> */}
                        <input type="checkbox" name={name} {...this.props} value={name} checked={this.state.isChecked ? 'checked' : false}  onChange={this.toggleCheck} />
                        <label style={this.state.isChecked ? crossedOutTextStyle : this.state.style } >{this.props.itemName}</label>
                    </div>
                    <div className="shared-right">
                        <img className="person" src={this.state.isChecked ? avatar : blankImage} alt="user"/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    // console.log('shared list MSTP state :', state);
    return {
        list: state.list.list,
        items: state.list.items,
        userInfo: state.user.userInfo
    }
}


export default connect(mapStateToProps,{
    sendCheckboxInfo, deleteItem, getListData
})(Checkbox); 
