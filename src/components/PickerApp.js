import React from 'react';

import AddItem from './AddItem'
import Items from './Items';
import Action from './Action';
import Header from './Header';
import ItemModal from './ItemModal';
import EditItemModal from './editItemModal';

export default class PickerApp extends React.Component {
	state = {
		subtitle: 'I will almost never let you down ;)',
		items: [],
		selectedItem: null,
		randomize_countdown: 4,
		itemToEdit: null
	}

	addItem = (opt) => {
		const approved = ['kiril', 'kire'];

		if (!approved.includes(opt.toLowerCase())) {
			if (this.state.items.findIndex(item => item.toLowerCase() === opt.toLowerCase()) !== -1) {
				return 'Item already exists'
			}
		}

		this.setState((prevState) => ({items: prevState.items.concat(opt)}))
	}
	openEditModal = (item) => {
		this.setState(() => {
			return {
				itemToEdit: item
			}
		})
	}
	editItem = (itemToEdit, newItemValue) => {
		const approved = ['kiril', 'kire']
		if (this.state.items.indexOf(newItemValue) == -1 || approved.includes(newItemValue)) {
			this.state.items[itemToEdit.index] = newItemValue;

			this.setState((prevState) => ({items: this.state.items, itemToEdit: null}))

			localStorage.setItem('pickerItems', JSON.stringify(this.state.items))
			return;
		}

		return 'Item already exists'
	}
	removeAllItems = () => {
		this.setState(() => ({items: []}))
	}
	removeSingleItem = (item) => {
		this.setState((prevState) => ({
			items: prevState.items.filter((el, index) => el === item.value && index === item.index ? false : true)
		}))
	}

	countdown_reveal_interval = null
	randomlySelectItem = () => {
		const random_index = Math.floor(Math.random() * this.state.items.length);
		// alert(this.state.items[random_index])
		const selectedItem = this.state.items[random_index];

		this.setState(() => {
			return {selectedItem}
		})

		this.countdown_reveal_interval = setInterval(() => {
			let randomize_countdown = this.state.randomize_countdown;

			if (!randomize_countdown) {
				this.setState(() => {
					return {
						randomize_countdown
					}
				})

				clearInterval(this.countdown_reveal_interval)
				return;
			}

			randomize_countdown--;

			this.setState(() => {
				return {
					randomize_countdown
				}
			}) 
		}, 1000)
	}
	closeModal = () => {
		if (this.countdown_reveal_interval) {
			clearInterval(this.countdown_reveal_interval)
		}

		this.setState(() => {
			return {
				selectedItem: null,
				randomize_countdown: 4
			}
		}) 
	}
	closeEditModal = () => {
		this.setState(() => {
			return {
				itemToEdit: null
			}
		}) 
	}

	componentDidMount() {
        let items;

		try {
			items = JSON.parse(localStorage.getItem('pickerItems'))

			if (items) {
				this.setState(() => ({items}))
			}
		} catch (e) {
			return
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.state.items.length !== prevState.items.length) {
			localStorage.setItem('pickerItems', JSON.stringify(this.state.items))
		}
	}

	render() {
		return (
			<div>
				<Header 
					subtitle={this.state.subtitle} />

				<div className="container">
					<Action 
						randomselect={this.randomlySelectItem} 
						hasItems={this.state.items.length > 1} />

					<div className="control">	
						<Items
							editSingleItem={this.openEditModal}
							removeSingleItem={this.removeSingleItem} 
							removeAll={this.removeAllItems} 
							items={this.state.items} />

						<AddItem 
							addItem={this.addItem} />
					</div>

					<ItemModal
						reveal_countdown={this.state.randomize_countdown} 
						selectedItem={this.state.selectedItem} 
						closeModal={this.closeModal} />

					<EditItemModal
						itemToEdit={this.state.itemToEdit}
						closeEditModal={this.closeEditModal} 
						editItem={this.editItem} />
				</div>
			</div>
		);
	}
}