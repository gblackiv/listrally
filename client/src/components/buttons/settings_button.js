import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SettingsButton extends Component {
    render() {
        return (    
            <Link to={this.props.to}>
                <div>
                    <i className="fas fa-pencil-alt btn-green settings-button"></i>
                    {/* <i className="fas fa-pen"></i> */}
                </div>
            </Link>
        )
    }
}
