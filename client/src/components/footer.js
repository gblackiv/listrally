
import React from 'react';
import { Link } from 'react-router-dom';
import NextButton from './buttons/next_page_button';
import ChatButton from './buttons/chat_button';
import NewListButton from './buttons/new_list_button';

export default class Footer extends React.Component {
    constructor (props) {
      super(props)

      this.getButtonComponent = this.getButtonComponent.bind(this);
    }
    getButtonComponent( button ){
        switch ( button ){
            case 'next_page_button':
                return <NextButton key={null} />;
             case 'chat_button':
                return <ChatButton key={null} />;
            case 'new_list_button':
                return <NewListButton key={null} />;
        }
    }
    
    render(){
        return (
            
            <div className="footer-container">
                { this.props.buttons.map( button => this.getButtonComponent(button))}
            </div>
        )
    }
}

