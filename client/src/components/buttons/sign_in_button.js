import React from 'react';
import google from '../../assets/images/btn_google_signin_dark_normal_web.png'


export default props => (    
    <div>
        <a href="/auth/login"><img src={google} alt="" className="sign-in"/></a>
    </div>
)