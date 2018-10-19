import React, { Component } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import LockIcons from './buttons/lock_buttons';
import SettingsButton from './buttons/settings_button';
import List_link_button from './buttons/list_link_button';
import { connect } from 'react-redux';
import { getListTitle} from '../actions/index';


 class DashboardCard extends Component {

    render() {
        const {name, userID, ownerID, url} = this.props;
        if(this.props.eventTime){
            var {eventTime} = this.props
        }
        return (
            <Fragment>
                <div className="dashboard-items">
                    <div className="dashboard-item1">
                        <div className="dashboard-left">
                            {/* <i className="dashboard_link far fa-link btn-blue"></i> */}                           
                            <div className="event-link">
                                <List_link_button link={`${window.location.host}/list-shared/${url}`}/>
                            </div>
                            <div className="event-details">
                                <Link to={`/list-shared/${url}`}>
                                    <div className="dashboard_text">{this.props.title}</div>
                                </Link>
                                <div className="eventDate">When: {eventTime.substr(0,10)}</div>
                            </div>
                        </div>
                        <div className="dashboard-right">
                            {/* {ownerID === userID ? <LockIcons /> : null} */}
                            {ownerID === userID ? <SettingsButton to={`/list/${url}`} /> : null}
                            {/* <i className="fas fa-lock-alt btn-red"></i> */}
                            {/* <i className="fas fa-cog btn-grey"></i> */}
                            {/* <br/>
                            <i className="dashboard_plus fal fa-plus-circle btn-green"></i> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


function mapStateToProps(state){
    return{
        list: state.list.list
    }
}

export default connect(mapStateToProps,{
    getListTitle
})(DashboardCard); 
