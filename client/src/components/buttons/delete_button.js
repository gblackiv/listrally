import React from 'react';

export default props => { 
    return (<div onClick={props.onClick}>
        <a className="delete-btn">
            <i className="fas fa-trash-alt delete-dashboard btn-red"></i>
        </a>
    </div>)
}

