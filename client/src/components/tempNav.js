import React from 'react';
import {Link} from 'react-router-dom';

export default () => (    
    <div>
        <ul className="nav-menu">
            <li>
                <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
                <Link to="/create-list" className="nav-link">Create List Page</Link>
            </li>
            <li>
                <Link to={`/list/${'ourfirstdummylist'}`} className="nav-link">List Page</Link>
            </li>
            <li>
                <Link to="/list-shared/ourfirstdummylist" className="nav-link">Shared List</Link>
            </li>
            <li>
                <Link to="/dashboard" className="nav-link">User Dash</Link>
            </li>
            {/* <li>
                <Link to="/chatmodal" className="nav-link">Chat Modal</Link>
            </li> */}
            <li>
                <Link to="/about" className="nav-link">About</Link>
            </li>

            <li>
                <Link to="/layout" className="nav-link">Layout Template</Link>
            </li>
            
        </ul>
    </div>
)