import React from 'react';

const Item = (props) => {
	return (
		<div className="item">
			<div>
				<p className="item__text">{props.index + 1}. {props.itemText}</p>
			</div>
			
			<div>
				<button className="button--link" onClick={(event) => {
					props.editSingleItem({value:props.itemText, index: props.index})
				}}>Edit</button> 
				/
				<button className="button--link" onClick={(event) => {
					props.removeSingleItem({value:props.itemText, index: props.index})
				}}>Delete</button>
			</div>
		</div>
	);
}

export default Item