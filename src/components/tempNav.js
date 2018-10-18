import React from 'react';
import {Link} from 'react-router-dom';

export default props => (    
    <div>
        <ul className="nav-menu">
            <li>
                <Link exact to="/" className="nav-link">Home</Link>
            </li>
            <li>
                <Link to="/list" className="nav-link">List Page</Link>
            </li>
            <li>
                <Link to="/dashboard" className="nav-link">User Dash</Link>
            </li>
        </ul>
    </div>
)