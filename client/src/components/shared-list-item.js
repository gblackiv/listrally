import React, { Component } from 'react';
import { Fragment } from 'react';

export default class SharedListItem extends Component {
    render() {
        // console.log('shared-item this.props :', this.props);
        const {name} = this.props
        return (
            <Fragment>
                <div className="list_item">
                    <div className="shared-left">
                        <input type="checkbox" name={name} value={name}/>{name}
                    </div>
                    {/* <div className="shared-right">
                        <img className="person" src={michael} alt="user"/>
                    </div> */}
                </div>
            </Fragment>
        )
    }
}
