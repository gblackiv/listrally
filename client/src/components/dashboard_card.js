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
        // const {name} = this.props;
        console.log('Dashboard card props :', this.props);
        return (
            <Fragment>
                <div className="dashboard-items">
                    <div className="dashboard-item1">
                        <div className="dashboard-left">
                            {/* <i className="dashboard_link far fa-link btn-blue"></i> */}
                            <Link to="/list-shared">
                                <List_link_button/>
                            </Link>
                            <div className="dashboard_text">{this.props.title}</div>
                        </div>
                        <div className="dashboard-right">
                            <LockIcons />
                            <Link to="/list">
                                <SettingsButton />
                            </Link>
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
    console.log('Redux state.list inside mapStateToProp :', state.list.list);
    return{
        list: state.list.list
    }
}

export default connect(mapStateToProps,{
    getListTitle
})(DashboardCard); 
