import ProjectForm from './ProjectForm'

export default function Projects(props) {
    return (
        <>
            {props.projects.map(project => <p>{project.title}</p>)}
            {/* <ProjectForm tasks={props.tasks} /> */}
        </>
    )
}