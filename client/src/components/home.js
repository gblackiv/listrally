import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/css/home.scss';
import logo from '../assets/images/app-list-rally-logo-icon-BLUE.png';
import add from '../assets/images/add.png';
import newList from '../assets/images/new-list-white.png';
import { Link, Redirect } from 'react-router-dom';
import ListButton from './buttons/list_button';
import SignInButton from './buttons/sign_in_button';
import { authenticate } from '../actions';
import Header from './header';
import Footer from './footer';
import { Fragment } from 'react'
import DashBoardButton from './buttons/dash_button';
import SignInModal from './sign-in-modal';

class Home extends Component{
    constructor(props) {
		super(props);
		this.state = {
            show: false,
            loggedIn: false
        };
        this.toggleListVisibility = this.toggleListVisibility.bind(this);
    }

    toggleListVisibility = () => {
        const { show } = this.state;
        this.setState( { show: !show } );
    }

    accessLocalStorage(){
        return localStorage.getItem('previousUrl');
    }
    componentDidMount(){
        this.props.authenticate();
        
    }

    render(){

        const previousUrl = this.accessLocalStorage();
        if( previousUrl && previousUrl !== window.location.pathname ){
            localStorage.removeItem('previousUrl');
            return <Redirect to={previousUrl} />
        }
        return(
            
            <div className="col-2">
            <header>
                <Header buttons={[]}/>
            </header> 
                <div className='content'>
                    <div className="home-container">
                        <div className="home-content">
                            <div className="logo-container zoomIn">
                                <img className="shadow zoomInDown" onClick={this.login} id="logo" src={logo} alt="logo"/>
                            </div>
                            <div className="home-title">ListRally</div>
                            {this.props.userInfo.ID ? <DashBoardButton /> : <SignInButton className="login" onClick={this.login} /> }
                            <div className="make-new-list">
                                <p className="instruction home-text">Or click the  {<img className="add-icon" src={add} />} icon to make a list</p>
                                <div className="list-icon-wrapper">
                                    <Link to="/create-list"><img className="new-list-btn bounce shadow" src={newList} alt="new_list"/></Link>
                                </div>
                            </div>
                                {/* <div className="home-templates">
                                    <p className="instruction home-text">or click the arrow to select a list template</p>
                                        <div  onClick={ this.toggleListVisibility }><ListButton /></div>
                                    <div className="home-text">
                                        {this.state.show && <Box />}
                                    </div> 
                                    </div> */}
                        </div>
                    </div>
                </div>
            <footer>
                {/* <Footer buttons={[]} /> */}
                <div className="meet-team-btn-container">
                <Link to="/about"><button className="btn btn-green meet-team-btn">Meet the Team <i className="fas fa-users"></i></button></Link>
                </div>
            </footer>
            </div>
        )
    }
}

class Box extends Component {
    render(){
        return(
            <Fragment>
                <div className="template">Office potluck list</div>
                <div className="template">BBQ at the park list</div>
                <div className="template">A day at the beach list</div>
                <div className="template">Vegan dinner party list</div>
            </Fragment>
        )
    }
}
function mapStateToProps(state){
    return {
        userInfo: state.user.userInfo
    }
}

export default connect(mapStateToProps,{
    authenticate
})(Home);