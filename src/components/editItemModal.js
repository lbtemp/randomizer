import React from 'react';
import Modal from 'react-modal';

export default class EditModalItem extends React.Component {
    state = {
        inputValue: '',
        disableChange: true,
        error: null,
    }

    handleInput = (e) => {
		const disableChange = !!e.target.value.trim()

		this.setState(() => ({disableChange: !disableChange, error: null}))
    }
    
    changeItem = (e) => {
		e.preventDefault();
		const newItemValue = e.target.elements.option.value.trim()
        const error = this.props.editItem(this.props.itemToEdit, newItemValue)
		const state = {error}

		if (error) {
            this.setState(() => state)
		}
	}


    render() {
        return (
            <Modal
                closeTimeoutMS={350}
                isOpen={!!this.props.itemToEdit}
                contentLabel="Item select modal"
                onRequestClose={this.props.closeEditModal}
                className="randomize-modal"
            >
                {
                    this.props.itemToEdit && <h3 className="randomize-modal__title">Sure.. who'll take {this.props.itemToEdit.value}'s place? </h3>
                }
    
                {
					this.state.error && 
					<p className="add-item-error">{this.state.error}</p>
				}

                <form className="add-item" onSubmit={this.changeItem}>
                    <input onChange={this.handleInput} placeholder="kire maybe ?" className="add-item-input" autoComplete="off" type="text" name="option" />
                    <button disabled={this.state.disableChange} className="add-item-button">Change</button>
                </form>
            </Modal>
        )
    }
}