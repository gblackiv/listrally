import React, { Component } from 'react';
import '../assets/css/list_shared.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getListData } from '../actions';
import { Fragment } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import Checkbox from './checkbox';
import AddListItemButton from './buttons/add_list_item_button'

import filter from '../assets/images/filter-icon.png'


class SharedList extends Component{

    componentDidMount() {
        // console.log('componentdidmount this.props :', this.props);
        this.props.getListData();//getListData becomes part of props from the connect function down below
    }

    goBack = () => {
        console.log('go back');
        this.props.history.goBack();
    }

    checkItem = (values) => {
        console.log('Check Item values :', values);
        // const { name } = values;
        // const testObject = {name, listID: 1}
        // this.props.addSingleItem(testObject);
        // this.props.history.push('/list');
    }

    renderItems = ({fields}) => {
        const { list } = this.props;


        const items = fields.map((id, index) => {
            // console.log('LIST:', list, 'index:', index);
            const item = list[index];

            return <Field key={item.ID} name={id} label={item.name} component={Checkbox}/>
        });

        return items;
    }

    render(){
        // console.log('Shared List this.props :', this.props);
        const {handleSubmit} = this.props;
        const {list} = this.props;
        // const checkboxList = list.map(item=>{
        //     return <Field key={item.ID} name={`${item.ID}`} label={item.name} component={Checkbox} />
        // })
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
                            <form onSubmit={handleSubmit(this.checkItem)}>
                                <FieldArray name="items" component={this.renderItems}/>
                                <div className="add-item-btn">
                                    <AddListItemButton className="add-item-button btn-blue" name="Save" />
                                </div> 
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
    const { list } = state.list;
    const items = [];
    const listById = {};
    
    if(list.length){
        list.map((item, index) => {
            items.push(!!item.assignedUserID);
            
        });
        // console.log('MSTP List Items:', items);
    }

    return {
        list,
        initialValues: {items}
    };
}

SharedList = reduxForm({
    form: 'shared-list',
    enableReinitialize: true
})(SharedList);

export default connect(mapStateToProps,{
    getListData
})(SharedList); 

