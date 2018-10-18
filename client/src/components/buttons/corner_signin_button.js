import React from 'react';

function loginButtonHandler(){
    localStorage.setItem('previousUrl', window.location.pathname);
    window.open("/auth/login", "_self");
}

export default props => (    
    <div className="btn btn-red corner-signin-container">
        <a className="corner-signin" onClick={ loginButtonHandler }>Sign In</a>
    </div>
)