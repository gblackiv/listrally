
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/dashboard.css';
import List_button from './buttons/list_button';
import List_link_button from './buttons/list_link_button';
import Chat_button from './buttons/chat_button';
import Sign_in_button from './buttons/sign_in_button';
import Back_button from './buttons/back_button';
import Sign_out_button from './buttons/sign_out_button';
import Home_nav_button from './buttons/home_nav_button';


export default class Header extends React.Component {
    constructor (props) {
      super(props)

      this.getButtonComponent = this.getButtonComponent.bind(this);
      this.backOnePage = this.backOnePage.bind(this);
    }

    backOnePage=()=>{
        console.log('Header this.props :', this.props);
        debugger;
        this.props.history.goBack();
    }


    getButtonComponent( button ){
        switch ( button ){
            case 'list_button': 
                return <List_button />;
            case 'List_link_button':
                return ( <Link to={`/list-shared/${this.props.url}`}> <List_link_button /> </Link> );
            case 'chat_button':
                return <Chat_button />;
            case 'Sign_in_button':
                return ( <Link to='FIXME TO AXIOS'> <Sign_in_button /> </Link> );
            case 'Back_button':
                return <Back_button onClick={ this.backOnePage } />;
            case 'Sign_out_button':
                return ( <Sign_out_button/>);
            case 'Home_nav_button':
                return ( < Home_nav_button avatar={this.props.avatar} />);
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

