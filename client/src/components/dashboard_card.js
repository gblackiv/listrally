import React, { Component } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import SettingsButton from './buttons/settings_button';
import List_link_button from './buttons/list_link_button';
import { connect } from 'react-redux';
import { getListTitle, deleteList} from '../actions/index';
import DeleteButton from './buttons/delete_button.js';


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
                                <div className="eventDate">When: {`${eventTime.getMonth() + 1}-${eventTime.getDate()}-${eventTime.getFullYear()}`}</div>
                            </div>
                        </div>
                        <div className="dashboard-right">
                            {ownerID === userID ? <SettingsButton to={`/list/${url}`} /> : null}
                            {ownerID === userID ? <DeleteButton onClick={() => {this.props.deleteList(this.props.ID, this.props.getListTitle)}} /> : null}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


function mapStateToProps(state){
    return{
        list: state.list.list,
        allLists: state.list.allLists
    }
}

export default connect(mapStateToProps,{
    getListTitle, deleteList
})(DashboardCard); 
