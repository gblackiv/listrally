
import React from 'react';
import { Link } from 'react-router-dom';
import NextButton from './buttons/next_page_button';

export default class Footer extends React.Component {
    constructor (props) {
      super(props)

      this.getButtonComponent = this.getButtonComponent.bind(this);
    }
    getButtonComponent( button ){
        switch ( button ){
            case 'next_page_button': 
                return <NextButton key={null} />;
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

