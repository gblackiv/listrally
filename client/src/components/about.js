import React, { Component } from 'react';
import '../assets/css/about.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

import WhiteLogo from '../assets/images/aboutus/app-list-rally-logo-icon-ONLY-LIGHT.png'
import michael from '../assets/images/aboutus/michael.png';
import gerry from '../assets/images/aboutus/gerry.png';
import george from '../assets/images/aboutus/george.png';
import torie from '../assets/images/aboutus/torie.png';



// import '../../node_modules/flatpickr/dist/themes/airbnb.css'
// import Flatpickr from 'react-flatpickr'

class AboutUs extends Component{
    constructor() {
        super();
     
    this.state = {};
    }

    render(){

        return(
            <div className="col-2">
                <header>
                    <Header buttons={['Back_button', 'Home_nav_button']} history={this.props.history} />
                </header> 
                <div className='content'>
                    <div className="layout-container">
                        <div className="hero-container">
                            <div className="banner-container">
                            <img className="about-white-logo shadow" src={WhiteLogo} alt="list" />
                            <h1 className="about-header shadow">ListRally Team</h1>
                            </div>
                        </div>
                        <div className="text-container">
                        <h4 className="team-text">Meet the Team</h4>
                        </div>
                        <p className="about-p">A group of creative web developers</p>
                        <div className="team-wrapper">
                            <div className="team-container">
                                <div className="team-card">
                                    <div className="team-img-container">
                                        <img className="team-img shadow" src={michael} alt="michael_photo" />
                                    </div>
                                    <h6 className="team-title">Michael</h6>
                                    <p className="team-role">Front-End Developer</p>
                                    <div className="team-icons">
                                        <a href="https://github.com/3daddict" target="_blank"><i className="fab fa-github"></i></a> 
                                        <a href="https://www.linkedin.com/in/msalvati/" target="_blank"><i className="fab fa-linkedin"></i></a>
                                        <a href="http://mikedoescode.com" target="_blank"><i className="fal fa-home"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="team-container">
                                <div className="team-card">
                                    <div className="team-img-container">
                                        <img className="team-img shadow" src={george} alt="michael_photo" />
                                    </div>
                                    <h6 className="team-title">George</h6>
                                    <p className="team-role">Front-End Developer</p>
                                    <div className="team-icons">
                                        <a href="https://github.com/george-tr6" target="_blank"><i className="fab fa-github"></i></a> 
                                        <a href="https://www.linkedin.com/in/george-trendafilov-57327514/" target="_blank"><i className="fab fa-linkedin"></i></a>
                                        <a href="http://georgetrendafilov.com" target="_blank"><i className="fal fa-home"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="team-container">
                                <div className="team-card">
                                    <div className="team-img-container">
                                        <img className="team-img shadow" src={torie} alt="michael_photo" />
                                    </div>
                                    <h6 className="team-title">Torie</h6>
                                    <p className="team-role">Front-End Developer</p>
                                    <div className="team-icons">
                                        <a href="https://github.com/toriep" target="_blank"><i className="fab fa-github"></i></a> 
                                        <a href="https://www.linkedin.com/in/torie-pham-6476ab79/" target="_blank"><i className="fab fa-linkedin"></i></a>
                                        <a href="http://toriepham.com/main.html" target="_blank"><i className="fal fa-home"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="team-container">
                                <div className="team-card">
                                    <div className="team-img-container">
                                        <img className="team-img shadow" src={gerry} alt="michael_photo" />
                                    </div>
                                    <h6 className="team-title">Gerry</h6>
                                    <p className="team-role">Back-End Developer</p>
                                    <div className="team-icons">
                                        <a href="https://github.com/gblackiv" target="_blank"><i className="fab fa-github"></i></a> 
                                        <a href="https://www.linkedin.com/in/gerry-blackmon-b20b98165/" target="_blank"><i className="fab fa-linkedin"></i></a>
                                        <a href="http://gerryblackmon.com/" target="_blank"><i className="fal fa-home"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <Link to={`/list/${this.props.url}`}><Footer buttons={[]} /></Link>
                </footer>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        
    }
}

export default connect(mapStateToProps,{
    
})(AboutUs); 