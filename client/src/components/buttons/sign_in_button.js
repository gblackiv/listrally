import React from 'react';
import google from '../../assets/images/btn_google_signin_dark_normal_web.png'

function loginButtonHandler(){
    localStorage.setItem('previousUrl', window.location.pathname);
    window.open("/auth/login", "_self");
}

export default props => (    
    <div>
        <a onClick={ loginButtonHandler }><img src={google} alt="google-sign-in" className="sign-in"/></a>
    </div>
)