import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/css/home.scss';
import logo from '../assets/images/app-list-rally-logo-icon-BLUE.png';
import newList from '../assets/images/new-list-white.png';
import { Link, Redirect } from 'react-router-dom';
import ListButton from './buttons/list_button';
import SignInButton from './buttons/sign_in_button';
import { authenticate } from '../actions';
import Header from './header';
import Footer from './footer';
import { Fragment } from 'react'

class Home extends Component{
    constructor(props) {
		super(props);
		this.state = {
            show: false
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
                            <div className="logo-container">
                                <img className="shadow" onClick={this.login} id="logo" src={logo} alt="logo"/>

                            </div>
                            <div className="home-title">ListRally</div>
                                    <SignInButton className="login" onClick={this.login}  />
                                    <a href='/auth/logout'>Sign Out</a>
                                <div className="new-list">
                                    <p className="instruction home-text">Click the + icon to make a list</p>
                                    <Link to="/create-list"><img className="new-list-btn" src={newList} alt="new_list"/></Link>
                                </div>
                                <div className="home-templates">
                                    <p className="instruction home-text">or click the arrow to select a list template</p>
                                        <div  onClick={ this.toggleListVisibility }><ListButton /></div>
                                    <div className="home-text">
                                        {this.state.show && <Box />}
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            <footer>
                <Footer buttons={[]} />
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


export default connect(null,{
    authenticate
})(Home);