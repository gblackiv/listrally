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


// const components = {
//     list_button,
//     list_link_button
// }


// export default ( props ) => {
//     //const DynamicButton = components[props.buttonType];
//     console.log(props.button)
//     console.log( components[ props.button])
//     const FirstButton = React.createElement( props.button );
//         return (
//         <div>
//             <div className="dashboard-nav">
//             <FirstButton />
//                 {/* <DynamicButton button={props.button[0]} />
//                 <DynamicButton button={props.button[1]} />  */}
                
//             </div> 
//         </div>
//     )
// }


                // <div className="dashboard-nav">
                //     <i className="far fa-chevron-circle-left"></i>
                //     <div className="dashboard-signout">Sign Out</div>
                //     <i className="far fa-sign-out-alt"></i>   
                // </div>