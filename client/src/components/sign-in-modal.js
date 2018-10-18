import React, { Component } from 'react';
import '../assets/css/sign-in-modal.scss';
import Sign_in_button from './buttons/sign_in_button';

class SignInModal extends Component {
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.isOpen){
            return (
                <div className="sign-in-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="sign-in-modal-content">
                        <div onClick={this.props.close} className="sign-in-modal-close">X</div>
                        <h4 className="sign-in-modal-h">Oops, you're not logged in.</h4>
                        <h6 className="sign-in-modal-span">Please log in through Google, and we will let you get back to your event planning</h6>
                        <div>
                            <Sign_in_button className="shadow" />
                        </div>
                    </div>
                </div>
            )
        }

        return null;
    }
}


export default SignInModal; 
