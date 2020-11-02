import React from 'react';
import Item from './Item';

const Items = (props) => {
	return (
		<div>
			<div className="control-header">
				<h3 className="control-header__title">List of names</h3>
				<button className="button--link" disabled={!props.items.length} onClick={props.removeAll}>Remove All</button>
			</div>
			
			{
				!props.items.length && <p className="control__message"> Start adding names below to start <b>¯\_(ツ)_/¯</b> </p>
			}

			{
				props.items.map((item, index) => <Item key={index} itemText={item} index={index} removeSingleItem={props.removeSingleItem}  editSingleItem={props.editSingleItem}/>)
			}
		</div>
	);
}

export default Items;