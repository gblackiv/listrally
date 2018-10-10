import React, { Component } from 'react';
import { Fragment } from 'react';

export default props => {
    
    // console.log('Single Checkbox this.props :', this.props);
    // const { ID, name, listID, assignedUserID } = request.body;
    console.log('Checkbox Props:', props);
    const { input, label } = props;
    return (
        <div className="list_item">
            <div className="shared-left">
                <input id={input.name} {...input} type="checkbox" checked={input.value} disabled={input.value} />
                <label htmlFor={input.name}>{label}</label>
                {/* <button className="btn-blue">Save</button>                     */}
            </div>
        </div>
    )
}
