import React from 'react';
import '../assets/css/about.css';
import michael from '../assets/images/michael.jpeg';
import gerry from '../assets/images/gerry-bw.jpg';
import george from '../assets/images/george-bw.jpg';
import torie from '../assets/images/torie-bw.jpg';

export default props =>(
    <div class="about-container">
        <h1>About</h1>
        <div className="about-team">
            <div class="about-person michael">
                <img className="member" src={michael}/>
                <div className="member-name">Michael</div>
                <div class="about-role">Front-End</div>
                <div class="about-media">
                    <i class="fab fa-github"></i>
                    <i class="fab fa-linkedin"></i>
                </div>
            </div>
            <div class="about-person george">
                <img className="member" src={george} alt="george"/>
                <div className="member-name">George</div>
                <div class="about-role">Front-End</div>
                <div class="about-media">
                    <i class="fab fa-github"></i>
                    <i class="fab fa-linkedin"></i>
                </div>
            </div>
            <div class="about-person torie">
                <img className="member" src={torie} alt="torie"/>
                <div className="member-name">Torie</div>
                <div class="about-role">Front-End</div>
                <div class="about-media">
                    <i class="fab fa-github"></i>
                    <i class="fab fa-linkedin"></i>
                </div>
            </div>
            <div class="about-person gerry">
                <img className="member" src={gerry} alt="gerry"/>
                <div className="member-name">Gerry</div>
                <div class="about-role">Back-End</div>
                <div class="about-media">
                    <i class="fab fa-github"></i>
                    <i class="fab fa-linkedin"></i>
                </div>
            </div>
        </div>
        </div>
)