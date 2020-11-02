import React from 'react';
import Modal from 'react-modal';

const itemModal = (props) => {
    return (
        <Modal
            closeTimeoutMS={350}
            isOpen={!!props.selectedItem}
            contentLabel="Item select modal"
            onRequestClose={props.closeModal}
            className="randomize-modal"
        >
            <h3 className="randomize-modal__title">And the store goer is.. </h3>

            {
                (props.reveal_countdown > 0 && props.reveal_countdown < 4) && 
                <p className="randomize-modal__body">{props.reveal_countdown}</p>
            }

            {
                !props.reveal_countdown &&
                <p className="randomize-modal__body">{props.selectedItem}</p>
            }

            {
                !props.reveal_countdown &&
                <button className="close-modal-button" onClick={props.closeModal}> congratulations! </button>
            }

        </Modal>
    )
}

export default itemModal;