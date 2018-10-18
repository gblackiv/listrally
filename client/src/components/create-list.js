import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { renderInput, renderTextArea, renderDate } from '../helpers';
import '../assets/css/create-list.scss';
import { createListData, authenticate } from '../actions';
import Header from './header';
import Footer from './footer';
import DatePicker from './date-picker';
import { userInfo } from 'os';

// import '../../node_modules/flatpickr/dist/themes/airbnb.css'
// import Flatpickr from 'react-flatpickr'

class CreateList extends Component{
    constructor() {
        super();
     
        this.state = {
            // date: new Date(),
            // enableTime: true,
            // dateFormat: "Y-m-d H:i"
            saved: false,
            description: '',
            name: '',
            eventTime: ''
        };
        this.getDate = this.getDate.bind(this);
      }
      
    componentDidMount() {
        this.props.authenticate()
      }
      
    getDate( dateString ){
        this.setState({
            date: dateString
        });
    }
    userCreateListData = (values) => {
        //const { name, description, securityStatus, eventTime} = request.body;
        console.log('Flatpickr Date: ', this.state.date);
        values.eventTime = this.state.date;
        let {eventDescription: description, eventName: name, eventTime} = values;
        this.setState({
            description, eventName, name
        })
        const securityStatus = "locked";
        eventTime = eventTime[0].toJSON().slice(0, 19).replace('T', ' ');
        const newEventObject = { name, description, securityStatus, eventTime };
        this.props.createListData(newEventObject);
    }

    saveInfo=()=>{
        if(!this.props.userInfo.ID){//if user is not logged in
            alert('YOU ARE NOT LOGGED IN! LOG IN!!!!!!!!');
            return;
        }
        if(!this.state.description || !this.state.name || !this.state.eventTime){
            debugger;
            alert('FILL OUT THE FORM!!!')
            return;
        }
        this.setState({
            saved: true
        })
    }

    render(){
        console.log('Create List this.props :', this.props);
        const { handleSubmit, userInfo } = this.props;
        const {ID, avatar} = userInfo;
        const { saved, description, name, eventTime } = this.state;

        return(
            <div className="col-2">
            <header>
                <Header buttons={['Back_button', 'Home_nav_button', 'List_link_button']} history={this.props.history} avatar={avatar} login={this.props.userInfo.ID} />
            </header> 
                <div className='content'>
                    <div className="layout-container">

            
            <h6 className="create-list-heading">Create a new list by filling out the form below</h6>
                <form onSubmit={handleSubmit(this.userCreateListData)}>
                    <Field name="eventName" label="Event Name" component={ renderInput } placeholder="eg. Birthday Party" />
                    <Field name="eventDescription" label="Event Description" component={ renderTextArea }
                    caption="Enter some details about your event like where to park or how to get there."
                    placeholder="eg. Park on the street" 
                    />

                    <div className="form-row">
                        <div className="form-col">
                            <fieldset className="date-fieldset">
                                <legend className="form-input-label date-input-label">Enter Date and Time</legend>
                                    <div>
                                        <DatePicker sendDate={this.getDate} />
                                    </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-col create-list-right">
                            <button onClick={this.saveInfo} className={saved ? "btn btn-saved" : "btn btn-green"}>{saved ? "✔️ Saved" : "Save"}</button>
                        </div>
                    </div>
                </form>
        
                    </div>
                </div>
                <footer>
                    {userInfo.ID && description && name && eventTime ? <Link to={`/list/${this.props.url}`}><Footer buttons={['next_page_button']} /></Link> : null}
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
    console.log('state :', state);
    return {
        url: state.list.url,
        userInfo: state.user.userInfo
    }
}

CreateList = reduxForm({
    form: 'create_list_data',
    validate: validate
})(CreateList);

export default connect(mapStateToProps,{
    createListData, authenticate
})(CreateList); 