import React from 'react';
import '../assets/css/list-owner.css';


export default props => ( 
    <div>
 <div className="list-container">
        {/*Top Nav*/}
        <div className="list-nav">
            {/* <FontAwesomeIcon icon="chevron-left" />
            <FontAwesomeIcon icon="link" /> */}
        </div>
        
        {/* User Avatar */}
        {/* <FontAwesomeIcon icon="user" /> */}

        {/* <!-- Main Content --> */}
        <div className="listContent">
            {/* <!-- List name, details, and filter button --> */}
            <div className="list-top">
                <br/>
                <h3 className="list-name">Aunt Sue's Party</h3>
                <h5 className="details">Saturday April 1st</h5>
            </div>
            {/* <!-- Items --> */}
            <div className="list-items">
                <div className="list-item">
                    <div className="list-left">
                        {/* <FontAwesomeIcon icon="sort" /> */}
                        <label>Chips</label>
                    </div>
                    <div className="list-right">
                        {/* <FontAwesomeIcon icon="pen" />
                        <FontAwesomeIcon icon="trash-alt" /> */}
                    </div>
                </div>
                <div className="list-item">
                    <div className="left">
                        {/* <FontAwesomeIcon icon="sort" /> */}
                        <label>Beer</label>
                    </div>
                    <div className="list-right">
                        {/* <FontAwesomeIcon icon="pen" />
                        <FontAwesomeIcon icon="trash-alt" /> */}
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-left">
                        {/* <i className="fas fa-sort"></i> */}
                        {/* <FontAwesomeIcon icon="sort" /> */}
                        <label>Plastic forks</label>
                    </div>
                    <div className="list-right">
                        {/* <FontAwesomeIcon icon="pen" />
                        <FontAwesomeIcon icon="trash-alt" /> */}
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-left">
                        {/* <FontAwesomeIcon icon="sort" /> */}
                        <label>Cups</label>
                    </div>
                    <div className="list-right">
                        {/* <FontAwesomeIcon icon="pen" />
                        <FontAwesomeIcon icon="trash-alt" /> */}
                    </div>
                </div>
                <div className="list-item">
                    <div className="list-left">
                        {/* <FontAwesomeIcon icon="sort" /> */}
                        <label>Soda</label>
                    </div>
                    <div className="list-right">
                        {/* <FontAwesomeIcon icon="pen" />
                        <FontAwesomeIcon icon="trash-alt" /> */}
                    </div>
                </div>
                <br/>
                {/* <!-- Add List Button --> */}
                <div className="list-item add modal-trigger">
                    {/* <FontAwesomeIcon className="list-plus-circle" icon="plus-circle" /> */}
                    <label className="add">Add Item</label>
                </div>
            </div>
        </div>
        {/* <!-- Footer --> */}
        <div className="list-footer">
            {/* <FontAwesomeIcon icon="comments" /> */}
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