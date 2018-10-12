import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { sendCheckboxInfo, deleteItem, getListData } from '../actions';
import blankImage from '../assets/images/nothing.png';

const crossedOutTextStyle = {
    'text-decoration': 'line-through'
}

class Checkbox extends Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked: !!props.assignedUserID
        }
        this.toggleCheck = this.toggleCheck.bind(this);
    }

    toggleCheck(){
        const { ID, assignedUserID, userID } = this.props;
        if(userID!==assignedUserID && assignedUserID>0){//if user is not the one who checked the box
            //and the box has already been checked
            return;
        }
        const {isChecked} =this.state;
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
            isChecked: !this.state.isChecked
        })
        this.sendInfoToServer();
    }

    sendInfoToServer = () => {
        //const { ID, name, listID, assignedUserID } = request.body;
        var { ID, itemName: name, userID, assignedUserID} = this.props;
        if(userID===assignedUserID){
            assignedUserID = 0;
        } else{
            assignedUserID = Math.floor(Math.random()*5)+1;
        }
        const listID = 1;
        const testCheckboxObject = {ID, name, listID, assignedUserID};
        console.log('testCheckboxObject :', testCheckboxObject);
        this.props.sendCheckboxInfo(testCheckboxObject);
        this.props.getListData();
    }


    render(){
        // console.log('Single Checkbox this.props :', this.props);
        // const { ID, name, listID, assignedUserID } = request.body;
        // console.log('Checkbox Props:', this.props);
        const {name, avatar} = this.props;
        return (
            <Fragment>
                <div className="list_item">
                    <div className="shared-left">
                        {/* <input type="checkbox" name={name} value={name} checked={assignedUserID ? 'checked' : false} onChange={()=>this.props.checkItem()} /> */}
                        <input type="checkbox" name={name} {...this.props} value={name} checked={this.state.isChecked ? 'checked' : false}  onChange={this.toggleCheck} />
                        <label>{this.props.itemName}</label>
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
    // console.log('Redux state.list.list inside mapStateToProp :', state.list.list);
    return {
        list: state.list.list,
        items: state.list.items,
        userID: state.user.userID
    }
}


export default connect(mapStateToProps,{
    sendCheckboxInfo, deleteItem, getListData
})(Checkbox); 
