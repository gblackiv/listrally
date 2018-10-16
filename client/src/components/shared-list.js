import React, { Component } from 'react';
import '../assets/css/list_shared.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getListData } from '../actions';
import { Fragment } from 'react';
import Header from './header';
import Footer from './footer';

import Checkbox from './checkbox';
import AddListItemButton from './buttons/add_list_item_button'

import filter from '../assets/images/filter-icon.png'
import { userInfo } from 'os';


class SharedList extends Component{

    constructor(props){
        super(props);
        this.url = this.props.location.pathname.substring(13,this.props.location.pathname.length)
    }

    componentDidMount() {
        this.props.getListData(this.url);
    }

    goBack = () => {
        console.log('go back');
        this.props.history.goBack();
    }

    render(){
        const {items,list} = this.props;
        console.log('Shared list this.props :', this.props);
        console.log('this.url :', this.url);
        const checkboxList = items.map(item=>{
            return <Checkbox key={item.ID} {...item} url={this.url} />
        })
        return( 
            <div className="col-2">
            <header>
                <Header buttons={['Back_button', 'List_link_button']} history={this.props.history} />
            </header> 
                <div className='content'>
                    <div className="layout-container">
                            <div className="filter">
                                <img src={filter} alt="filter"/>   All
                            </div>
                            <div className="list-top">
                                <h4 className="shared-list-title">{list.length>0 ? list[0].name : 'Sue\'s Party'}</h4>
                                <div className="list-date">{list.length>0 ? list[0].eventTime.slice(0, 19).replace('T', ' ') : 'Saturday April 1st'}</div>
                                <h6 className="list-details">{list.length>0 ? list[0].description : 'Get spooky'}</h6>
                            </div>
                            <div className="list-items">
                                <form onSubmit={this.sendInfoToServer}>
                                    {checkboxList}
                                </form>
                            </div>
                        </div>
                    </div>
                <footer>
                    <Link to="/chatmodal"><Footer buttons={['chat_button']} /></Link>
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

