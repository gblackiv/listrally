import React, { Component } from 'react';
import '../assets/css/list_shared.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getListData } from '../actions';
import { Fragment } from 'react';

import SharedListItem from './shared-list-item';

import michael from '../assets/images/michael.jpeg';
import gerry from '../assets/images/gerry.jpeg';
import george from '../assets/images/george.jpeg';
import filter from '../assets/images/filter-icon.png'


class ListShared extends Component{

    componentDidMount() {
        console.log('componentdidmount this.props :', this.props);
        this.props.getListData();//getListData becomes part of props from the connect function down below
    }

    addItem = (event) =>{
        console.log('add Item button works', event.currentTarget);
    }

    goBack = () => {
        console.log('go back');
        this.props.history.goBack();
    }

    render(){
        console.log('Shared List this.props :', this.props);

        const {list} = this.props;
        console.log('list :',list);
        const listItems = list.map(item=>{
            return <SharedListItem key={item.ID} {...item} />
        })
        return( 
            <Fragment>
                <div className="list-container">
                    {/*Top Nav*/}
                    <div className="list-nav">
                        <div onClick={this.goBack}>
                            <i  className="back fas fa-chevron-left"></i>
                        </div>
                        <Link to="/"><i className="outer fas fa-home"></i></Link>
                    </div>
                    {/* <!-- Main Content --> */}
                    <div className="list-content">
                        <div className="filter">
                            <img src={filter} alt="filter"/>   All
                        </div>
                        {/* <!-- List name, details, and filter button --> */}
                        <div className="list-top">
                            <h4 className="list-name">Sue's Party</h4>
                            <h6 className="details">Saturday April 1st</h6>
                        </div>
                        {/* <!-- Items --> */}
                        <div className="list-items">
                            {listItems}
                        </div>
                        {/* <!-- Add List Button --> */}
                        <div className="shared-add modal-trigger">
                        <div onClick={()=>this.addItem(event)} className="add-item">
                            <i id="shared-add-button" className="btn-green fas fa-plus-circle"></i>
                        </div>
                    </div>
                    </div>
                    {/* <!-- Footer --> */}
                    <div className="list-footer">
                        <Link to="/chatmodal"><i className="outer fas fa-comments"></i></Link>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state){//the redux will be given to us in its entirety when this function is called
    //the redux state is the same no matter where you try to access it
    console.log('Redux state.list.list inside mapStateToProp :', state.list.list);
    return {
        list: state.list.list//this came from the rootReducer and lists reducer
    }//   ^ list now becomes a property of Clock once mapStateToProps gets passed into connect
}


export default connect(mapStateToProps,{ getListData })(ListShared);//connect returns a function, you pass List into that function