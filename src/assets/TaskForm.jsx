import React from 'react'
import { useState } from 'react'

export default function TaskForm(props) {
    const [task, setTask] = useState({
        id: props.taskData ? props.taskData.id : '',
        title: props.taskData ? props.taskData.title : '',
        description: props.taskData ? props.taskData.description : '',
        assignedTo: props.taskData ? props.taskData.assignedTo : '',
        dueDate: props.taskData ? props.taskData.dueDate : '',
        isCompleted: props.taskData ? props.taskData.isCompleted : false
    })

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setTask(prev => {
            return {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }
        })
    }

    function handleConfirm(e) {
        let isFormValid = e.target.form.checkValidity();
        if (!isFormValid) {
            return e.target.form.reportValidity();
        }
        e.preventDefault();
        if (!props.taskData) {
            props.createNewTask(task);
            props.setAddTask(false);
        } else {
            props.updateTask(task);
        }
    }

    function handleCancel() {
        if (!props.taskData) {
            props.setAddTask(false);
        } else {
            props.setActiveTask(null);
        }
    }

    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='modal__title'>Task details:</div>
                <form>
                    <label>Title:
                        <input
                            name='title'
                            value={task.title}
                            onChange={handleChange}
                            maxLength={30}
                            required
                        />
                    </label>
                    <label>Description:
                        <textarea
                            name='description'
                            value={task.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Assign to:
                        <select
                            name='assignedTo'
                            value={task.assignedTo}
                            onChange={handleChange}
                        >
                            <option value=''>None</option>
                            {props.employees.map(employee => <option key={employee.id} value={employee.id}>{employee.name}</option>)}
                        </select>
                    </label>
                    <label>Due date:
                        <input
                            name='dueDate'
                            type='date'
                            value={task.dueDate}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <div>Completed</div>
                        <input
                            name='isCompleted'
                            type='checkbox'
                            checked={task.isCompleted}
                            onChange={handleChange}
                        />
                    </label>
                    <div className='group-buttons'>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                        <button onClick={handleConfirm}>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    )
}