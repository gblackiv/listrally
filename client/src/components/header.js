import React from 'react';
import '../assets/css/dashboard.css';
import List_button from './buttons/list_button';
import List_link_button from './buttons/list_link_button';
import Chat_button from './buttons/chat_button';

export default class Header extends React.Component {
    constructor (props) {
      super(props)
      this.getButtonComponent = this.getButtonComponent.bind(this)
    }
    getButtonComponent( button ){
        switch ( button ){
            case 'list_button': 
                return <List_button />;
            case 'list_link_button':
                return <List_link_button />;
            case 'chat_button':
                return <Chat_button />;
        }
    }
    render(){
        return (
            <div className="dashboard-nav">
                { this.props.buttons.map( button => this.getButtonComponent(button))}
            </div>
        )
    }
}

