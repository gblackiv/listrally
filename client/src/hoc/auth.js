import React, { Component } from 'react';
import { connect } from 'react-redux';


export default (WrappedComponent)=>{//this is just a function with a class in it that returns a class component. That's all HOC is
    class Auth extends Component {
        componentDidMount(){
            this.checkAuth();
        }

        componentDidUpdate(){//when something updates, it checks for auth
            this.checkAuth();
        }

        checkAuth(){//this function checks whether user is signed in
            if(!this.props.userID){//if user is not logged in, ie. if their ID is undefined, 0, or null
                this.props.callbackFunction;//locate them to somewhere else, in this case sig-in
            }
        }

        render(){
            return <WrappedComponent log={this.log} />;
        }
    }

    function mapStateToProps(state){
        return {
            userID: state.user.userInfo.ID
        }
    }

    return connect(mapStateToProps)(Auth);
};