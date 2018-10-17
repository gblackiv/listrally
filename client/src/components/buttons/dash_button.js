import React from 'react';
import { Link } from 'react-router-dom';

export default props => (    
    <div>
        <Link to="/dashboard">
            <button className="dash-button btn btn-blue"><i className="fas fa-tachometer-alt"></i> Dashboard</button>
        </Link>
    </div>
)