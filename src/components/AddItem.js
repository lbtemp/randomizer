import React from 'react';

export default class AddItem extends React.Component {
	// constructor(props) {
	// 	super(props)
	// 	this.addNewItem = this.addNewItem.bind(this)
	// 	this.handleInput = this.handleInput.bind(this)

	// 	this.state = {
	// 		error: null,
	// 		disableAdd: true
	// 	}
	// }

	state = {
		error: null,
		disableAdd: true
	}

	addNewItem = (e) => {
		e.preventDefault();
		const item = e.target.elements.option.value.trim()
		const error = this.props.addItem(item)
		const state = {error}

		if (!error) {
			e.target.elements.option.value = ''
			state.disableAdd = true;
		}

		this.setState(() => state)
	}

	handleInput = (e) => {
		const disableAdd = !!e.target.value.trim()

		this.setState(() => ({disableAdd: !disableAdd, error: null}))
	}

	render() {
		return (
			<div>
				{
					this.state.error && 
					<p className="add-item-error">{this.state.error}</p>
				}
				<form className="add-item" onSubmit={this.addNewItem}>
					<input placeholder="Hint: Adding kire multiple times decreases your chance of going.." className="add-item-input" onChange={this.handleInput} autoComplete="off" type="text" name="option" />
					<button className="add-item-button" disabled={this.state.disableAdd}>Add</button>
				</form>
			</div>
		);
	}
}