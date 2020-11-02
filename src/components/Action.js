import React from 'react';

const Action = (props) => {
	return (
		<div>
			<button className="randomize-button" onClick={props.randomselect} disabled={!props.hasItems}>which one will it be ?</button>
		</div>
	);
}

export default Action;