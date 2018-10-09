import avatar from '../assets/images/user.png';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/css/list_owner.scss';
import ListLinkButton from './buttons/list_link_button';
import ChatButton from './buttons/chat_button';
import AddListItemButton from './buttons/add_list_item_button'



export default class ListOwner extends Component{

    goBack = () => {
        console.log('go back');
        this.props.history.goBack();
    }

    render(){
        return     ( 
            <div>
            <div className="list-container">
                {/*Top Nav*/}
                <div className="list-nav">
                    <div onClick={this.goBack}>
                        <i  className="back fas fa-chevron-left"></i>
                    </div>
                    <Link to="/list-shared">
                        <ListLinkButton />
                    </Link>
                </div>
                
                {/* User Avatar */}
                <br/>>
                {/* <i id="avatar" class="fas fa-user"></i> */}
                <Link to="/dashboard"><img id="avatar" src={avatar} alt="avatar"/></Link>
        
                {/* <!-- Main Content --> */}
                <div className="list-content">
                    {/* <!-- List name, details, and filter button --> */}
                    <div className="list-top">
                        <h4 className="list-title">Sue's Party</h4>
                        <h6 className="list-details">Saturday April 1st</h6>
                    </div>
                    {/* <!-- Items --> */}
                    <div className="list-items">
                        <div className="list-item">
                            <div className="list-left">
                                <i class="sort fas fa-sort"></i>
                                <label>Chips</label>
                            </div>
                            <div className="list-right">
                                <i class="fas fa-pen"></i>
                                <i class="delete fas fa-trash-alt"></i>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="left">
                                <i class="sort fas fa-sort"></i>
                                <label>Beer</label>
                            </div>
                            <div className="list-right">
                                <i class="fas fa-pen"></i>
                                <i class="delete fas fa-trash-alt"></i>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="list-left">
                                <i class="sort fas fa-sort"></i>
                                <label>Plastic forks</label>
                            </div>
                            <div className="list-right">
                                <i class="fas fa-pen"></i>
                                <i class="delete fas fa-trash-alt"></i>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="list-left">
                                <i class="sort fas fa-sort"></i>
                                <label>Cups</label>
                            </div>
                            <div className="list-right">
                                <i class="fas fa-pen"></i>
                                <i class="delete fas fa-trash-alt"></i>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="list-left">
                                <i class="sort fas fa-sort"></i>
                                <label>Soda</label>
                            </div>
                            <div className="list-right">
                                <i class="fas fa-pen"></i>
                                <i class="delete fas fa-trash-alt"></i>
                            </div>
                        </div>
                        <br/>
                    </div>
                    {/* <!-- Add List Button --> */}
                    <div className="add modal-trigger">
                            <AddListItemButton />
                            {/* <label className="add">Add Item</label> */}
                    </div>
                </div>
                {/* <!-- Footer --> */}
                <div className="list-footer">
                    <Link to="/chatmodal">
                        <ChatButton />
                    </Link>
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
