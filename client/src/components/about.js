import React from 'react';
import '../assets/css/about.css';
import michael from '../assets/images/michael.jpeg';
import gerry from '../assets/images/gerry-bw.jpg';
import george from '../assets/images/george-bw.jpg';
import torie from '../assets/images/torie-bw.jpg';

export default props =>(
    <div className="about-container">
        <h3>About</h3>
        <div className="about-team">
            <div className="about-person michael">
                <img className="member" src={michael}/>
                <div className="member-name">Michael</div>
                <div className="about-role">Front-End</div>
                <div className="about-media">
                    <i className="fab fa-github"></i>
                    <i className="fab fa-linkedin"></i>
                </div>
            </div>
            <div className="about-person george">
                <img className="member" src={george} alt="george"/>
                <div className="member-name">George</div>
                <div className="about-role">Front-End</div>
                <div className="about-media">
                    <i className="fab fa-github"></i>
                    <i className="fab fa-linkedin"></i>
                </div>
            </div>
            <div className="about-person torie">
                <img className="member" src={torie} alt="torie"/>
                <div className="member-name">Torie</div>
                <div className="about-role">Front-End</div>
                <div className="about-media">
                    <i className="fab fa-github"></i>
                    <i className="fab fa-linkedin"></i>
                </div>
            </div>
            <div className="about-person gerry">
                <img className="member" src={gerry} alt="gerry"/>
                <div className="member-name">Gerry</div>
                <div className="about-role">Back-End</div>
                <div className="about-media">
                    <i className="fab fa-github"></i>
                    <i className="fab fa-linkedin"></i>
                </div>
            </div>
        </div>
        </div>
)