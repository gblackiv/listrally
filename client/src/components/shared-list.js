import React, { Component } from 'react';
import '../assets/css/list_shared.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import michael from '../assets/images/michael.jpeg';
import gerry from '../assets/images/gerry.jpeg';
import george from '../assets/images/george.jpeg';
import filter from '../assets/images/filter-icon.png'


export default class ListShared extends Component{ 

    goBack = () => {
        console.log('go back');
        this.props.history.goBack();
    }

    render(){
        console.log('this.props :', this.props);
        return( 
            <div>
                <div className="list-container">
                    {/*Top Nav*/}
                    <div className="list-nav">
                        <div onClick={this.goBack}>
                            <i  className="outer fas fa-chevron-left"></i>
                        </div>
                        <Link to="/"><i className="outer fas fa-home"></i></Link>
                    </div>
                    
                    {/* User Avatar */}
                    <br/>
                    {/* <i id="avatar" className="fas fa-user"></i> */}
                    {/* <img id="avatar" src={avatar} alt="avatar"/> */}
        
                    {/* <!-- Main Content --> */}
                    <div className="list-content">
                        <div className="filter">
                            {/* <i class="fas fa-filter"></i>All */}
                            <img src={filter} alt="filter"/>
                        </div>
                        {/* <!-- List name, details, and filter button --> */}
                        <div className="list-top">
                            <h4 className="list-name">Sue's Party</h4>
                            <h6 className="details">Saturday April 1st</h6>
                        </div>
                        {/* <!-- Items --> */}
                        <div className="list-items">
                            <div className="list_item checked">
                                <div className="shared-left">
                                    <input type="checkbox" name="chips" value="chips" checked/>Chips
                                </div>
                                <div className="shared-right">
                                    <img className="person" src={michael} alt="user"/>
                                </div>
                            </div>
                            <div className="list_item">
                                <div className="shared-left">
                                    <input type="checkbox" name="beer" value="beer"/>Beer
                                </div>
                                <div className="shared-right">
                                    {/* <img className="person" src={user} alt="user"/> */}
                                </div>
                            </div>
                            <div className="list_item checked">
                                <div className="shared-left">
                                    <input type="checkbox" name="forks" value="forks" checked/>Plastic Forks
                                </div>
                                <div className="shared-right">
                                    <img className="person" src={gerry} alt="user"/>
                                </div>
                            </div>
                            <div className="list_item checked">
                                <div className="shared-left">
                                    <input type="checkbox" name="chips" value="chips" checked/>Chips
                                </div>
                                <div className="shared-right">
                                    <img className="person" src={george} alt="user"/>
                                </div>
                            </div>
                            <div className="list_item">
                                <div className="shared-left">
                                    <input type="checkbox" name="soda" value="soda"/>Soda
                                </div>
                                <div className="shared-right">
                                    {/* <img className="person" src={user} alt="user"/> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- Add List Button --> */}
                        <div className="shared-add modal-trigger">
                            <i id="shared-add-button" className="btn-green fas fa-plus-circle"></i>
                            <label className="add">Add Item</label>
                        </div>
                    </div>
                    {/* <!-- Footer --> */}
                    <div className="list-footer">
                        <Link to="/chatmodal"><i className="outer fas fa-comments"></i></Link>
                    </div>
                    {/* <!--MODAL--> */}
                    {/* <div className="flex align-center align-vert modal modal-align container">
                        <div className="modal-container">
                            <header className="modal-header">
                                <h1>Add Item</h1>
                                <a className="modalClose modalCloseX" aria-hidden="true">&#x2715;</a>
                            </header>
                            <div className="main">
                                <input className="add-input" type="text" name="sauce"/>
                            </div>
                            <footer className="modal-footer">
                                <div className="modal-buttons">
                                    <button className="modalClose modalCloseBtn">Cancel</button>
                                    <button className="modalClose modalCloseBtn">OK</button>
                                </div>
                            </footer>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}