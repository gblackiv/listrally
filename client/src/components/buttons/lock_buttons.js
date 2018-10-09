import React, { Component } from 'react';

class LockIcons extends Component { 
    constructor(props) {
      super(props);
      this.state = {
        isIconLocked: false,
      }
    } 
  
    render() {
      return (
        <a className="lock-icons" onClick={()=>this.setState({ isIconLocked: !this.state.isIconLocked })}>
          { this.state.isIconLocked
            ? <i className="fas fa-lock-alt btn-red"></i>
            : <i className="fas fa-unlock-alt btn-green"></i>
          }
        </a>
      );
    }
  }
export default LockIcons;