import React from 'react';
import '../assets/css/list-owner.scss';
import avatar from '../assets/images/user.png'

export default props => ( 
    <div>
 <div className="list-container">
        {/*Top Nav*/}
        <div className="list-nav">
            <i class="outer fas fa-chevron-left"></i>
            <i class="fas fa-link"></i>
        </div>
        
        {/* User Avatar */}
        <br/>>
        {/* <i id="avatar" class="fas fa-user"></i> */}
        <img id="avatar" src={avatar} alt="avatar"/>

        {/* <!-- Main Content --> */}
        <div className="list-content">
            {/* <!-- List name, details, and filter button --> */}
            <div className="list-top">
                <h4 className="list-name">Sue's Party</h4>
                <h6 className="details">Saturday April 1st</h6>
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
                {/* <!-- Add List Button --> */}
                <div className="list-item add modal-trigger">
                    <i id="add-button" class="btn-green fas fa-plus-circle"></i>
                    <label className="add">Add Item</label>
                </div>
            </div>
        </div>
        {/* <!-- Footer --> */}
        <div className="list-footer">
            <i class="outer fas fa-comments"></i>
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