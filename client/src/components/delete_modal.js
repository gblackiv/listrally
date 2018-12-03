import React from 'react';
import '../assets/css/sign-in-modal.scss';

class DeleteModal extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		if(this.props.isOpen){
			return(
				<div className="sign-in-modal" onClick={this.props.close}>
					<div onClick={e => e.stopPropagation()} className="delete-modal sign-in-modal-content">
						<div onClick={this.props.close} className="sign-in-modal-close">X</div>
						<h4 className="sign-in-modal-h">Delete Confirmation</h4>
						<h6 className="sign-in-modal-span">Are you sure you want to delete that item?</h6>
						<div>
							<div className='btn btn-grey deleteDeny' onClick={this.props.close}>
								Cancel
							</div>
							<div className="btn btn-red deleteConfirm" onClick={this.props.confirmDelete}>
								DELETE
							</div>
						</div>
					</div>
				</div>
			)
		}
		return null;
	}
}
export default DeleteModal;