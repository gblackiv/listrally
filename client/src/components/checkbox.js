import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { sendCheckboxInfo } from '../actions';


class Checkbox extends Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked: !!props.assignedUserID
        }
        this.toggleCheck = this.toggleCheck.bind(this);
    }

    toggleCheck(values){
        // console.log('toggleCheck values :', values);
        const {isChecked} = this.state;
        // if(!isChecked){//if checkbox is unchecked
        //     this.setState({//allow checkbox to be toggled
        //         isChecked: !this.state.isChecked
        //     })
        //     this.sendInfoToServer();
        // }
        this.setState({
            isChecked: !this.state.isChecked
        })
        this.sendInfoToServer();
    }

    sendInfoToServer = (values) => {
        //const { ID, name, listID, assignedUserID } = request.body;
        const { ID, itemName: name} = this.props;
        let assignedUserID = 0;
        const listID = 1;
        if(!this.state.isChecked === true){
            assignedUserID = 1;
        }
        debugger;
        console.log('Check Item values :', values);
        console.log('sendInfo values :', values);
        const testCheckboxObject = {ID, name, listID, assignedUserID}
        console.log('testCheckboxObject :', testCheckboxObject);
        this.props.sendCheckboxInfo(testCheckboxObject);
        this.props.history.push('/shared-list');
    }

    render(){
        // console.log('Single Checkbox this.props :', this.props);
        // const { ID, name, listID, assignedUserID } = request.body;
        console.log('Checkbox Props:', this.props);
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
                        <img className="person" src={avatar} alt="user"/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    // console.log('Redux state.list.list inside mapStateToProp :', state.list.list);
    return {
        list: state.list.list
    }
}


export default connect(mapStateToProps,{
    sendCheckboxInfo
})(Checkbox); 
