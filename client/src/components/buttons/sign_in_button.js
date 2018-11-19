import React from 'react';
import google from '../../assets/images/btn_google_signin_dark_normal_web@2x.png'

function loginButtonHandler(){
    localStorage.setItem('previousUrl', window.location.pathname);
    window.open("/auth/login", "_self");
}

export default props => (    
    <a onClick={ loginButtonHandler }><img src={google} alt="google-sign-in" className="sign-in"/></a>
)