
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/dashboard.css';
import List_button from './buttons/list_button';
import List_link_button from './buttons/list_link_button';
import Chat_button from './buttons/chat_button';
import Sign_in_button from './buttons/corner_signin_button';
import Back_button from './buttons/back_button';
import Sign_out_button from './buttons/sign_out_button';
import Home_nav_button from './buttons/home_nav_button';


export default class Header extends React.Component {
    constructor (props) {
      super(props)

      this.getButtonComponent = this.getButtonComponent.bind(this);
      this.backOnePage = this.backOnePage.bind(this);
    }

    backOnePage =()=>{
        this.props.history.goBack();
    }


    getButtonComponent( button, i ){
        switch ( button ){
            case 'list_button': 
                return <List_button key={i}/>;
            case 'List_link_button':
                if(this.props.login){//if user is logged in
                    return ( <Link to={`/dashboard`} key={i}><img className="user-avatar" src={this.props.avatar} alt="avatar"/> </Link> );
                } else if(!this.props.login){
                    return (<Sign_in_button/>)
                }
            case 'chat_button':
                return <Chat_button />;
            case 'Sign_in_button':
                return ( <Link to='FIXME TO AXIOS' key={i}> <Sign_in_button /> </Link> );
            case 'Back_button':
                return <Back_button onClick={ this.backOnePage } key={i}/>;
            case 'Sign_out_button':
                return ( <Sign_out_button key={i}/>);
            case 'Home_nav_button':
                return ( < Home_nav_button avatar={this.props.avatar} key={i}/>);
        }
    }

    
    render(){
        return (
            
            <div className="list-nav">
                { this.props.buttons.map( (button, i) => this.getButtonComponent(button, i))}
            </div>
        )
    }
}

