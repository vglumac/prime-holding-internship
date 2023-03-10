import React from 'react'
// import DeleteModalCSS from "./delete_modal.module.css"

export default function DeleteModal(props) {

    function handleConfirmDelete() {
        props.closeModal();
        props.confirmDelete(props.id)
    }
    return (
        <div className="modal-container">
            <div className="modal">
                <h3 className="modal__title">Delete</h3>
                <p className="modal__message">Are you sure you want to delete this {props.item}? This will remove the {props.item} and can't be undone.</p>
                <div className="group-buttons">
                    <button onClick={props.closeModal}>No, cancel</button>
                    <button className="button--red" onClick={handleConfirmDelete}>Yes, delete</button>
                </div>
            </div>
        </div>
    )
}