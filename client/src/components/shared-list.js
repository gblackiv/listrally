import React, { Component } from 'react';
import '../assets/css/list_shared.scss';
import '../assets/css/user_settings.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getListData } from '../actions';
import { Fragment } from 'react';
import Header from './header';
import Footer from './footer';
import SettingsButton from './buttons/settings_button';

import Checkbox from './checkbox';
import AddListItemButton from './buttons/add_list_item_button';

import filter from '../assets/images/filter-icon.png';

class SharedList extends Component{

    constructor(props){
        super(props);
        this.url = this.props.location.pathname.substring(13,this.props.location.pathname.length)
        this.link = window.location.href;
        this.state = {
            copied: false,
            text: 'Copy Link',
            class: 'btn-blue'
        }
    }

    componentDidMount() {
        this.props.getListData(this.url);

        //MODALS
        // Get the modal
        this.modal = document.getElementById('user-modal');
        // Get the button that opens the modal
        this.btn = document.getElementById("user-btn");
        // Get the <span> element that closes the modal
        this.span = document.getElementsByClassName("user-close")[0];
    }

    goBack = () => {
        console.log('go back');
        this.props.history.goBack();
    }

    copyToClipboard=()=>{
        this.setState({
            copied: true
        })
        var copyText = document.getElementById("select-this");
        copyText.select();
        document.execCommand("copy");
        this.setState({
            text: ' Copied ✓ ',
            class: 'btn-saved'
        })
    }


    //MODALS
    // When the user clicks the button, open the modal 
    openModal = () =>{
        console.log('event.target :', event.target);
        this.modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    closeWithX = ()=> {
        this.modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    closeWhenClickedOutside = (event) =>{
        if (event.target == this.modal) {
            this.modal.style.display = "none";
        }
    }

    render(){
        const {items,list, userInfo} = this.props;
        if(list[0]){
            var {ownerID} = list[0];
        }
        if(userInfo){
            var { avatar, ID: userID } = userInfo;
        }
        console.log('Shared list this.props :', this.props);
        console.log('this.url :', this.url);
        const checkboxList = items.map(item=>{
            return <Checkbox key={item.ID} {...item} url={this.url} />
        })
        
        return( 
            <div className="col-2">
                <header>
                    <Header buttons={['Back_button', 'List_link_button','Home_nav_button']} history={this.props.history} avatar={userInfo.avatar ? avatar : null}  login={this.props.userInfo.ID}  />
                </header> 
                <div className='content'>
                    <div className="layout-container">
                        <div className="shared-list-top">
                            <div className="list-options">
                                {ownerID === userID ? 
                                        <Link to={`/list/${this.url}`}>
                                            <div className="list-edit">
                                                {/* <i className="fas fa-pencil-alt btn-green settings-button"></i> */}
                                                <i className="fas fa-pen"></i>
                                            </div>
                                        </Link>
                                : null}
                                <button className="btn btn-blue" onClick={this.openModal} id="user-btn">Share List</button>
                            </div>
                            <div className="shared-list-info">
                                <h4 className="shared-list-title">{list.length>0 ? list[0].name : 'List Not Found'}</h4>
                                <div className="shared-date">{list.length>0 ? list[0].eventTime.slice(0, 19).replace('T', ' ') : '404 Error'}</div>
                                <div className="shared-details">{list.length>0 ? list[0].description : 'Please try your list link again or contact the list creator'}</div>
                            </div>
                        </div>
                        <div className="shared-label-container">
                            <label className="usage-instruction"> {list.length > 0 ? "Check off items you plan on bringing" : ""}</label>
                        </div>
                        <div className="shared-list-items">
                            <form className="list-shared-form-container" onSubmit={this.sendInfoToServer}>
                                {checkboxList}
                            </form>
                        </div>
                        </div>
                    </div>
                    <div id="user-modal" className="user-modal">
                        <div className="user-modal-content">
                            <span onClick={this.closeWithX} className="user-close">&times;</span>
                            <h4 className="share-instruction">Share With Others</h4>
                            <main>
                                <div className="wrapper">{ (list.length > 0)
                                    ?  <input className="copy-link-input-field" id="select-this" value={this.link}/>
                                    : <button className="btn btn-blue"><i className="fas fa-home"></i> Home</button> }

                                    { (list.length > 0)
                                        ? <button onClick={this.copyToClipboard} className={`btn ${this.state.class}`} id="clickMe">{this.state.text}</button>
                                        : "" }
                                </div>
                                <div className="share-instruction">{this.state.copied ? <div className="copied"><i class="fal fa-clipboard-check"></i>Link copied to clipboard</div> : null}</div> 
                            </main>
                        </div>
                    </div>
                <footer>
                    <Footer buttons={[]} />
                </footer>
            </div>
        )
    }
}

function mapStateToProps(state){
    
    return {
        list: state.list.list,
        items: state.list.items,
        userInfo: state.user.userInfo,
        url: state.list.url
    }
}


export default connect(mapStateToProps,{
    getListData
})(SharedList); 

