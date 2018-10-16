import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SettingsButton extends Component {
    render() {
        console.log('Settingbutton this.props :', this.props);
        return (    
            <Link to={this.props.to}>
                <div>
                    <i className="fas fa-pencil-alt btn-grey settings-button"></i>
                </div>
            </Link>
        )
    }
}
