import React, { Component } from 'react';
import '../assets/css/user_settings.css';

export default class UserSettings extends Component {
    componentDidMount(){
            // Get the modal
        this.modal = document.getElementById('user-modal');

        // Get the button that opens the modal
        this.btn = document.getElementById("user-btn");

        // Get the <span> element that closes the modal
        this.span = document.getElementsByClassName("user-close")[0];
    }


    // When the user clicks the button, open the modal 
    openModal = (event) =>{
        debugger;
        console.log('event.target :', event.target);
        this.modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    closeWithX = ()=> {
        this.modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    closeWhenClickedOutside = (event) =>{
        if (event.target == this.modal) {
            this.modal.style.display = "none";
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal} id="user-btn">Open Modal</button>

                <div id="user-modal" class="user-modal">

                <div class="user-modal-content">
                    <span onClick={this.closeWithX} class="user-close">&times;</span>
                    <p>Some text in the Modal..</p>
                </div>

                </div>
            </div>
        )
    }
}
