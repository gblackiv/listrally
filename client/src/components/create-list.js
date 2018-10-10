import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { renderInput, renderTextArea, renderDate } from '../helpers';
import '../assets/css/create-list.scss';
import { createListData } from '../actions';
import Header from './header';

class CreateList extends Component{
    userCreateListData = (values) => {
        console.log('Create List Info: ', values);
        this.props.createListData(values);
    }

    render(){

        const { handleSubmit } = this.props;

        return(
            <div className="col-2">
            <header>
                <Header buttons={[]}/>
            </header> 
                <div className='content'>
                    <div className="layout-container">

            
            <h6 className="create-list-heading">Create a new list by filling out the form below</h6>
                <form onSubmit={handleSubmit(this.userCreateListData)}>
                    <Field name="eventName" label="Event Name" component={ renderInput } />
                    <Field name="eventDescription" label="Event Description" component={ renderTextArea } />
                    <Field name="eventDate" label="Select the Date and Time of your Event" component={ renderDate } />
                    
                    <div className="form-row">
                        <div className="form-col create-list-right">
                            <button className="btn btn-blue">Temp Save Button</button>
                        </div>
                    </div>
                </form>
        
                    </div>
                </div>
                <footer>
                    <p>Footer Component Here</p>
                </footer>
            </div>
        )
    }
}

function validate(values){
    const { eventName, eventDateInput } = values;
    const errors = {};

    if(!eventName){
        errors.eventName = "Please enter a name for your event";
    }
    if(!eventDateInput){
        errors.eventDateInput = 'Please select the date of your event';
    }

    return errors;
}

function mapStateToProps(state){

    return {
        
    }
}

CreateList = reduxForm({
    form: 'create_list_data',
    validate: validate
})(CreateList);

export default connect(mapStateToProps,{
    createListData: createListData
})(CreateList); 