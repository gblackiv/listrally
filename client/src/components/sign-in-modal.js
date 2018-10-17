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
                <div className="basic-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.props.close} className="basic-modal-close">X</div>
                        <h6>Oops, you're not logged in. Please log in through Google, and we will let you get back to your party planning</h6>
                        <div>
                            <Sign_in_button />
                        </div>
                    </div>
                </div>
            )
        }

        return null;
    }
}


export default SignInModal; 
