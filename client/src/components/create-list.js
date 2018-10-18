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
import SignInModal from './sign-in-modal';

// import '../../node_modules/flatpickr/dist/themes/airbnb.css'
// import Flatpickr from 'react-flatpickr'

class CreateList extends Component{
    constructor() {
        super();
        this.createListState = {};
        this.state = {
            // date: new Date(),
            // enableTime: true,
            // dateFormat: "Y-m-d H:i"
            saved: false,
            description: '',
            name: '',
            eventTime: '',
            modalStatus: false
        };
        this.getDate = this.getDate.bind(this);
    }
    open = () => this.setState({isOpen: true});
    close = () => this.setState({isOpen: false});

    getDate( dateString ){
        this.setState({
            date: dateString
        });
    }
    userCreateListData = (values) => {
        values.eventTime = this.state.date;
        console.log('values',values)
        if(!this.props.userInfo.ID){//if user is not logged in
            localStorage.setItem('eventName', values.eventName);
            localStorage.setItem('eventDescription', values.eventDescription);
            localStorage.setItem('eventTime', values.eventTime[0]);

            this.setState({
                modalStatus: true
            });
            return;
        }
        this.setState({
            saved: true
        })
        //const { name, description, securityStatus, eventTime} = request.body;
        console.log('Flatpickr Date: ', this.state.date);
        let {eventDescription: description, eventName: name, eventTime} = values;
        this.setState({
            description, eventName, name
        })
        const securityStatus = "locked";
        eventTime = eventTime[0].toJSON().slice(0, 19).replace('T', ' ');
        const newEventObject = { name, description, securityStatus, eventTime };
        this.props.createListData(newEventObject);
    }
    componentDidMount(){
        this.props.authenticate();
        if( this.createListState){
            this.getDate( this.createListState.eventTime );
        }
    }



    render(){
        this.createListState.eventName = localStorage.getItem('eventName');
        this.createListState.eventDescription = localStorage.getItem('eventDescription');
        this.createListState.eventTime = localStorage.getItem('eventTime');
        console.log('this.createListState', this.createListState)
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
                    <Field name="eventName" label="Event Name" component={ renderInput } nameValue={this.createListState.eventName || null} placeholder={"eg. Birthday Party"} />
                    <Field name="eventDescription" label="Event Description" component={ renderTextArea }
                    caption="Enter some details about your event like where to park or how to get there."
                    placeholder={"eg. Park on the street"} descriptionValue={this.createListState.eventDescription || null}
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
                            <SignInModal isOpen={this.state.modalStatus} close={this.close} />
                            <button className={saved ? "btn btn-saved" : "btn btn-green"}>{saved ? "✔️ Saved" : "Save"}</button>
                        </div>
                    </div>
                </form>
        
                    </div>
                </div>
                <footer>
                    {userInfo.ID ? <Link to={`/list/${this.props.url}`}><Footer buttons={['next_page_button']} /></Link> : null}
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