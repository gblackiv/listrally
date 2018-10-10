import React from 'react';
import '../assets/css/dashboard.css';
import {list_button} from './buttons/list_button';
import {list_link_button} from './buttons/list_link_button';

const buttonComponents = {
    list_button,
    list_link_button
}

export default function Header( props ){
    const DynamicButton = buttonComponents[props.buttonType];
        return (    
        <div>
            <div className="dashboard-nav">
                <DynamicButton button={props.buttons[0]} />
                <DynamicButton button={props.buttons[1]} /> 
            </div> 
        </div>
    )
}


                // <div className="dashboard-nav">
                //     <i className="far fa-chevron-circle-left"></i>
                //     <div className="dashboard-signout">Sign Out</div>
                //     <i className="far fa-sign-out-alt"></i>   
                // </div>