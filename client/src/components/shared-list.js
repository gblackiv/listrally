import React, { Component } from 'react';
import '../assets/css/list_shared.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getListData } from '../actions';
import { Fragment } from 'react';

import Checkbox from './checkbox';
import AddListItemButton from './buttons/add_list_item_button'

import filter from '../assets/images/filter-icon.png'


class SharedList extends Component{

    componentDidMount() {
        this.props.getListData();
    }

    goBack = () => {
        console.log('go back');
        this.props.history.goBack();
    }

    sendInfoToServer = (values) => {
        event.preventDefault();
        console.log('Check Item values :', values);
        // const { name } = values;
        // const testObject = {name, listID: 1}
        // this.props.addSingleItem(testObject);
        // this.props.history.push('/list');
    }

    handleCheckboxChange = event => {
        console.log("checkbox changed!", event.target);
        // this.setState({isChecked: event.target.checked});
    }

    // toggleIsChecked = () => {
    //     console.log("toggling isChecked value!");
    //     this.setState({isChecked: !this.state.isChecked});
    // }

    render(){
        // console.log('Shared List this.props :', this.props);
        const {list} = this.props;
        const checkboxList = list.map(item=>{
            return <Checkbox key={item.ID} {...item} handleCheckboxChange={this.handleCheckboxChange} />
        })
        return( 
                <div className="list-container">
                    <div className="list-nav">
                        <div onClick={this.goBack}>
                            <i  className="back fas fa-chevron-left"></i>
                        </div>
                        <Link to="/"><i className="outer fas fa-home"></i></Link>
                    </div>
                    <div className="list-content">
                        <div className="filter">
                            <img src={filter} alt="filter"/>   All
                        </div>
                        <div className="list-top">
                            <h4 className="list-name">Sue's Party</h4>
                            <h6 className="details">Saturday April 1st</h6>
                        </div>
                        <div className="list-items">
                            <form onSubmit={this.sendInfoToServer}>
                                {checkboxList}
                                {/* <div className="add-item-btn">
                                    <AddListItemButton className="add-item-button btn-blue" name="Save" />
                                </div>  */}
                            </form>
                        </div>
                    </div>
                    <div className="list-footer">
                        <Link to="/chatmodal"><i className="outer fas fa-comments"></i></Link>
                    </div>
                </div>
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
    getListData
})(SharedList); 

