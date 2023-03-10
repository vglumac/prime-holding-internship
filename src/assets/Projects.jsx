import React from 'react';
import DeleteModal from './DeleteModal';
import ProjectForm from './ProjectForm'

export default function Projects(props) {
    const isDeleting = (project) => props.confirmDeleteModal && props.confirmDeleteModal.type === 'delete' && props.confirmDeleteModal.id === project.id;
    const isUpdating = (project) => props.activeProject && props.activeProject.type === 'updating' && props.activeProject.id === project.id;
    const classIcon = (project) => project.isOpened ? "icon-circle-up" : "icon-circle-down";

    function toggleShowProject(event, project) {
        event.stopPropagation();
        props.openProject(project.id);
    }

    function handleDeleteClick(project) {
        props.setConfirmDeleteModal({ id: project.id, type: 'delete' })
    }

    function handleUpdateClick(project) {
        props.setActiveProject({ id: project.id, type: 'updating' })
    }

    function getTasks(project) {
        if (project.tasks.length > 0) {
            return (
                <ul className='item-list'>
                    {project.tasks.map(task => <li key={task.value}>{task.label}</li>)}
                </ul>
            )
        }
        return project.tasks.label
    }

    const displayProjects = props.projects.map(project => (
        <div key={project.id} className='item'>
            <div className='item__header' onClick={(event) => toggleShowProject(event, project)}>
                <h4 className='item__title'>{project.title}</h4>
                <span onClick={(event) => toggleShowProject(event, project)} className={classIcon(project)}></span>
            </div>
            {!isUpdating(project) && project.isOpened &&
                <div className='item__content'>
                    <div>Description: {project.description}</div>
                    <div>Tasks: {getTasks(project)}</div>
                    <div>Completed: {Math.floor(project.numOfCompletedTasks / project.numOfAssignedTasks * 100)} %</div>
                    <div className='group-buttons'>
                        <button onClick={() => handleUpdateClick(project)}><span className="icon-icon-edit"></span>Edit</button>
                        <button onClick={() => handleDeleteClick(project)}><span className="icon-icon-delete"></span>Delete</button>
                    </div>
                </div>}
            {isUpdating(project) &&
                <div>
                    <ProjectForm
                        projectData={project}
                        tasks={props.tasks}
                        updateProject={props.updateProject}
                        setActiveProject={props.setActiveProject}
                    />
                </div>}
            {isDeleting(project) &&
                <DeleteModal
                    id={project.id}
                    item='project'
                    closeModal={() => props.setConfirmDeleteModal(null)}
                    confirmDelete={props.deleteProject}
                />}
        </div>
    ))

    return (
        <>
            {props.projects.length > 0 ? displayProjects : <p className='info-message'>You haven't defined any projects. Click on "NEW PROJECTS" to get started!</p>}
            {props.addProject &&
                <ProjectForm
                    tasks={props.tasks}
                    setAddProject={props.setAddProject}
                    createNewProject={props.createNewProject}
                />}
        </>
    )
}