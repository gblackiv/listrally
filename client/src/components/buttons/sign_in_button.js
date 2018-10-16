import React from 'react';
import google from '../../assets/images/btn_google_signin_dark_normal_web.png'


export default props => (    
    <div>
        <a onClick={() => {window.open("/auth/login", "_blank")}}><img src={google} alt="google-sign-in" className="sign-in"/></a>
    </div>
)