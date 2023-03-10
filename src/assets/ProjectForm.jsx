import React from 'react';
import { useState } from 'react';
import Select from 'react-select';

export default function ProjectForm(props) {
    const [project, setProject] = useState({
        id: props.projectData ? props.projectData.id : '',
        title: props.projectData ? props.projectData.title : '',
        description: props.projectData ? props.projectData.description : '',
        tasks: props.projectData ? props.projectData.tasks : '',
        numOfAssignedTasks: props.projectData ? props.projectData.numOfAssignedTasks : '',
        numOfCompletedTasks: props.projectData ? props.projectData.numOfCompletedTasks : ''
    })

    function handleChange(e) {
        setProject(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleChangeSelect(data) {
        setProject(prev => {
            return {
                ...prev,
                tasks: data
            }
        })
    }

    function handleConfirm(e) {
        e.preventDefault();
        if (!props.projectData) {
            props.createNewProject(project);
            props.setAddProject(false);
        } else {
            props.updateProject(project);
        }

    }

    function handleCancel() {
        if (!props.projectData) {
            props.setAddProject(false);
        } else {
            props.setActiveProject(null);
        }

    }

    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='modal__title'>Project details:</div>
                <form>
                    <label>Title:
                        <input
                            name='title'
                            type='text'
                            value={project.title}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Description:
                        <textarea
                            name='description'
                            value={project.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Tasks:
                        <Select
                            options={props.tasks.map(task => ({ value: task.id, label: task.title, isCompleted: task.isCompleted }))}
                            placeholder='Select tasks'
                            value={project.tasks}
                            onChange={handleChangeSelect}
                            isSearchable
                            isMulti
                        />
                    </label>
                    <div className='group-buttons'>
                        <button onClick={handleConfirm}>Confirm</button>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}