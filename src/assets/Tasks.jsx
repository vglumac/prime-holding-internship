import React, { useState } from 'react';
import TaskForm from './TaskForm';
import DeleteModal from './DeleteModal';

export default function Tasks(props) {

    const isDeleting = (task) => props.confirmDeleteModal && props.confirmDeleteModal.type === 'delete' && props.confirmDeleteModal.id === task.id;
    const isUpdating = (task) => props.activeTask && props.activeTask.type === 'updating' && props.activeTask.id === task.id;
    const classIcon = (task) => task.isOpened ? "icon-circle-up" : "icon-circle-down";

    function toggleShowTask(task) {
        props.openTask(task.id);
    }

    function handleDeleteClick(task) {
        props.setConfirmDeleteModal({ id: task.id, type: 'delete' })
    }

    function handleUpdateClick(task) {
        props.setActiveTask({ id: task.id, type: 'updating' })
    }

    const displayTasks = props.tasks.map(task => (
        <div key={task.id}>
            <div className="item-header">
                <h4>{task.title}</h4>
                <span onClick={() => toggleShowTask(task)} className={classIcon(task)}></span>
            </div>
            {!isUpdating(task) && task.isOpened &&
                <div>
                    <div>Description: {task.description}</div>
                    <div>Due date: {task.dueDate}</div>
                    <div>Assigned to: {task.assignedTo.assigneeName}</div>
                    <div>Completed: {task.completed ? "Yes" : "No"}</div>
                    <button onClick={() => handleUpdateClick(task)}><span className="icon-icon-edit"></span> Edit</button>
                    <button onClick={() => handleDeleteClick(task)}><span className="icon-icon-delete"></span> Delete</button>
                </div>}
            {isUpdating(task) &&
                <div>
                    <TaskForm
                        taskData={task}
                        employees={props.employees}
                        updateTask={props.updateTask}
                        setActiveTask={props.setActiveTask}
                    />
                </div>}
            {isDeleting(task) &&
                <DeleteModal
                    id={task.id}
                    closeModal={() => props.setConfirmDeleteModal(null)}
                    confirmDelete={props.deleteTask}
                />}
        </div>
    ))

    return (
        <>
            {props.tasks.length > 0 ? displayTasks : <p>You have no tasks. Click on "NEW TASK" to get started!</p>}
            {props.addTask &&
                <TaskForm                    
                    employees={props.employees}
                    setAddTask={props.setAddTask}
                    createNewTask={props.createNewTask}
                />}
        </>
    )
}