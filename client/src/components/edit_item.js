import React from 'react';

class EditItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value: this.props.defaultValue
		};
	}
	changeItemName(e){
		this.setState({
			value: e.target.value
		})
		this.props.parent.setState({
			value: e.target.value
		})
	}
	render(){
		const { input } = this.props;
		return (
			<div className="edit-row">
				<input className="edit-item-field" {...input} onChange={(e) => this.changeItemName(e)} value={this.state.value} type="text" autoComplete="off" />
				<button type="submit" className="edit-btn">OK</button>
			</div>
        )
	}
}

export default EditItem;