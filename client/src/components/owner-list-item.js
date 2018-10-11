import React, { Component } from 'react';
import { Fragment } from 'react';

export default class SharedListItem extends Component {
    render() {
        const {name} = this.props;
        console.log('this.props :', this.props);
        return (
            <Fragment>
                <div className="list-item">
                    <div className="list-left">
                        <i class="sort fas fa-sort"></i>
                        <label>{this.props.itemName}</label>
                    </div>
                    <div className="list-right">
                        <i class="fas fa-pen"></i>
                        <i class="delete fas fa-trash-alt"></i>
                    </div>
                </div>
            </Fragment>
        )
    }
}
