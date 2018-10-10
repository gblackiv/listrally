
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/dashboard.css';
import List_button from './buttons/list_button';
import List_link_button from './buttons/list_link_button';
import Chat_button from './buttons/chat_button';
import Sign_in_button from './buttons/sign_in_button';
import Back_button from './buttons/back_button';


export default class Header extends React.Component {
    constructor (props) {
      super(props)

      this.getButtonComponent = this.getButtonComponent.bind(this);
    }
    getButtonComponent( button ){
        switch ( button ){
            case 'list_button': 
                return <List_button />;
            case 'List_link_button':
                return ( <Link to="/list-shared"> <List_link_button /> </Link> );
            case 'chat_button':
                return <Chat_button />;
            case 'Sign_in_button':
                return ( <Link to='FIXME TO AXIOS'> <Sign_in_button /> </Link> );
            case 'Back_button':
                return ( <Link to='/'> <Back_button /> </Link> );
        }
    }

    
    render(){

        return (
            
            <div className="list-nav">
                { this.props.buttons.map( button => this.getButtonComponent(button))}
            </div>
        )
    }
}

