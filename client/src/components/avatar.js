import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/images/user.png';


export default props => (    
    <div>
        <Link to="/dashboard"><img id="avatar" src={avatar} alt="avatar"/></Link>
    </div>
)