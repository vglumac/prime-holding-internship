import React from 'react'
import { useState } from 'react'

export default function ProjectForm(props) {
    const [project, setProject] = useState({
        title: props.projectData ? props.projectData.title : '',
        description: props.projectData ? props.projectData.description : '',
        tasks: props.projectData ? {...props.projectData.tasks} : '',        
        isCompleted: ''
    })

    function handleChange(e) {
        setProject(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    // function handleConfirm(e) {
    //     e.preventDefault();
    //     if (!props.taskData) {
    //         props.createNewTask(task);
    //         props.setAddTask(false);
    //     } else {
    //         props.updateTask(task, props.taskData.id);
    //     }
        
    // }

    // function handleCancel() {
    //     if (!props.taskData) {
    //         props.setAddTask(false);
    //     } else {
    //         props.setActiveTask(null);
    //     }
        
    // }

    return (
        <>
            <form>
                <label>Title:
                    <input
                        name='title'
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
                    <select>
                        {props.tasks.map(task => <option>{task}</option>)}
                    </select>                       
                </label>
                
                <button >Confirm</button>
                <button type='button' >Cancel</button>
            </form>

        </>
    )
}