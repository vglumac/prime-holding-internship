import React, { useState } from 'react';
import TaskForm from './TaskForm';
import DeleteModal from './DeleteModal';

export default function Tasks(props) {

    const isDeleting = (task) => props.confirmDeleteModal && props.confirmDeleteModal.type === 'delete' && props.confirmDeleteModal.id === task.id;
    const isUpdating = (task) => props.activeTask && props.activeTask.type === 'updating' && props.activeTask.id === task.id;
    const classIcon = (task) => task.isOpened ? 'icon-circle-up' : 'icon-circle-down';
    const classCompleted = (task) => task.isCompleted ? 'item--completed' : '';    
    const compareDates = (task) => {
        const dueDate = new Date(task.dueDate);
        const now = new Date();
        return dueDate.getTime() < now.getTime();
    };

    function toggleShowTask(e, task) {
        e.stopPropagation();
        props.openTask(task.id);
    }

    function handleDeleteClick(task) {
        props.setConfirmDeleteModal({ id: task.id, type: 'delete' });
    }

    function handleUpdateClick(task) {
        props.setActiveTask({ id: task.id, type: 'updating' });
    }

    function getAssignedToName(task) {
        let employeeName;
        props.employees.forEach(employee => {
            if (task.assignedTo === employee.id) {
                employeeName = employee.name;
            }
        })
        return employeeName;
    }   

    const displayTasks = props.tasks.map(task => (
        <div key={task.id} className={`item ${classCompleted(task)}`}>
            <div className='item__header' onClick={(event) => toggleShowTask(event, task)}>
                <h4 className='item__title'>{task.title}</h4>
                <div>
                    {!task.isCompleted && task.assignedTo === '' && <div className='error-message'><span className='icon-notification'></span>Employee not assigned</div>}
                    {!task.isCompleted && compareDates(task) && <div className='error-message'><span className='icon-notification'></span>Task is overdue</div>}
                </div>
                <span className={classIcon(task)}></span>
            </div>
            {!isUpdating(task) && task.isOpened &&
                <div className='item__content'>
                    <div>Description: {task.description ? task.description : '(no description)'}</div>
                    <div>Due date: {task.dueDate ? task.dueDate : '(no due date)'}</div>
                    <div>Assigned to: {getAssignedToName(task) ? getAssignedToName(task) : '(not assigned)'}</div>
                    <div>Completed: {task.isCompleted ? "Yes" : "No"}</div>
                    <div className='group-buttons'>
                        <button onClick={() => handleUpdateClick(task)}><span className='icon-icon-edit'></span>Edit</button>
                        <button onClick={() => handleDeleteClick(task)}><span className='icon-icon-delete'></span>Delete</button>
                    </div>
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
                    item='task'
                    closeModal={() => props.setConfirmDeleteModal(null)}
                    confirmDelete={props.deleteTask}
                />}
        </div>
    ))

    return (
        <>
            {props.tasks.length > 0 ? displayTasks : <p className='info-message'>You have no tasks. Click on "NEW TASK" to get started!</p>}
            {props.addTask &&
                <TaskForm
                    employees={props.employees}
                    setAddTask={props.setAddTask}
                    createNewTask={props.createNewTask}
                />}
        </>
    )
}