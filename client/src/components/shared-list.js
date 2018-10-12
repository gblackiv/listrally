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
        const {items,list} = this.props;
        console.log('list :', list);
        const checkboxList = items.map(item=>{
            return <Checkbox key={item.ID} {...item} />
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
                            <h4 className="list-title">{list.length>0 ? list[0].name : 'Sue\'s Party'}</h4>
                            <h6 className="list-details">{list.length>0 ? list[0].description : 'Get spooky'}</h6>
                            <div className="list-date">{list.length>0 ? list[0].eventTime.substr(0, 10) : 'Saturday April 1st'}</div>
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
    console.log('Redux state list inside mapStateToProp :', state.list.list);
    console.log('Redux state items inside mapStateToProp :', state.list.items);
    return {
        list: state.list.list,
        items: state.list.items
    }
}


export default connect(mapStateToProps,{
    getListData
})(SharedList); 

