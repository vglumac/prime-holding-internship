import React, {useEffect} from 'react'

export default function DeleteModal(props) {

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    })

    function handleConfirmDelete() {
        props.closeModal();
        props.confirmDelete(props.id)
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            props.closeModal();
        }  
    };

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