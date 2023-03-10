import { useState, useEffect } from 'react';
import Header from './assets/Header';
import Tasks from './assets/Tasks';
import Employees from './assets/Employees';
import Projects from './assets/Projects';

import { nanoid } from 'nanoid'
import './App.css'

function App() {

  const [employees, setEmployees] = useState(() => JSON.parse(localStorage.getItem('employees')) || []);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem('projects')) || []);
  const [addTask, setAddTask] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [tasks, employees, projects])

  //Update number of assigned tasks
  //Update number of completed tasks in project

  useEffect(() => {
    setEmployees(prevEmployees => {
      return prevEmployees.map(prevEmployee => {
        let taskNum = 0;
        let completedNum = 0;
        tasks.forEach(task => {
          if (task.assignedTo === prevEmployee.id) {
            if (task.isCompleted) {
              completedNum += 1;
            }
            taskNum += 1;
          }
        })
        return {
          ...prevEmployee,
          numOfAssignedTasks: taskNum,
          numOfCompletedTasks: completedNum
        }
      })
    })
    setProjects(prevProjects => {
      return prevProjects.map(prevProject => {
        if (prevProject.tasks.length > 0) {
          return {
            ...prevProject,
            tasks: prevProject.tasks.map(projectTask => {
              let isTaskCompleted = false;
              tasks.forEach(task => {
                if (task.id === projectTask.value) {
                  isTaskCompleted = task.isCompleted;
                }
              })
              return {
                ...projectTask,
                isCompleted: isTaskCompleted
              }
            }),
            numOfCompletedTasks: prevProject.tasks.filter(task => task.isCompleted).length //radi tek pri sledecem renderu
          }
        }
        return prevProject
      })
    })
  }, [tasks])

  function createNewTask(newTaskData) {
    const newTask = {
      ...newTaskData,
      id: nanoid(),
      isOpened: false
    }
    setTasks(prevTasks => [...prevTasks, newTask])
  }


  function createNewEmployee(newEmployeeData) {
    const newEmployee = {
      ...newEmployeeData,
      id: nanoid(),
      numOfAssignedTasks: 0,
      numOfCompletedTasks: 0,
      isOpened: false
    }
    setEmployees(prevEmployees => [...prevEmployees, newEmployee])
  }

  function createNewProject(newProjectData) {
    const newProject = {
      ...newProjectData,
      id: nanoid(),
      numOfAssignedTasks: newProjectData.tasks.length,
      numOfCompletedTasks: newProjectData.tasks.length > 0 ? newProjectData.tasks.filter(task => task.isCompleted).length : 0,
      isOpened: false
    }
    setProjects(prevProjects => [...prevProjects, newProject])
  }

  function updateTask(updatedTask) {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (updatedTask.id === task.id) {
          return {
            ...task,
            title: updatedTask.title,
            description: updatedTask.description,
            assignedTo: updatedTask.assignedTo,
            dueDate: updatedTask.dueDate,
            isCompleted: updatedTask.isCompleted
          }
        }
        return task;
      })
    })
    setActiveTask(null)
  }

  function updateEmployee(updatedEmployee) {
    setEmployees(prevEmployees => {
      return prevEmployees.map(employee => {
        if (updatedEmployee.id === employee.id) {
          return {
            ...employee,
            name: updatedEmployee.name,
            email: updatedEmployee.email,
            phone: updatedEmployee.phone,
            dob: updatedEmployee.dob,
            salary: updatedEmployee.salary
          }
        }
        return employee;
      })
    })
    setActiveEmployee(null);
  }

  function updateProject(updatedProject) {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (updatedProject.id === project.id) {
          return {
            ...project,
            title: updatedProject.title,
            description: updatedProject.description,
            tasks: updatedProject.tasks,
            numOfAssignedTasks: updatedProject.tasks.length,
            numOfCompletedTasks: updatedProject.tasks.filter(task => task.isCompleted).length
          }
        }
        return project;
      })
    })
    setActiveProject(null)
  }

  function deleteTask(taskId) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    setConfirmDeleteModal(null)
  }

  function deleteEmployee(employeeId) {
    setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeId));
    setConfirmDeleteModal(null);
  }

  function deleteProject(projectId) {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
    setConfirmDeleteModal(null)
  }

  function openTask(taskID) {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (taskID === task.id) {
          return {
            ...task,
            isOpened: !task.isOpened
          }
        }
        return task;
      })
    })
  }

  function openEmployee(employeeID) {
    setEmployees(prevEmployees => {
      return prevEmployees.map(employee => {
        if (employeeID === employee.id) {
          return {
            ...employee,
            isOpened: !employee.isOpened
          }
        }
        return employee;
      })
    })
  }

  function openProject(projectId) {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (projectId === project.id) {
          return {
            ...project,
            isOpened: !project.isOpened
          }
        }
        return project;
      })
    })
  }

  return (
    <>
      <Header
        employeesData={employees}
        tasksData={tasks}
      />
      <main>
        <section>
          <div className="section__header">
            <div>
              <h2>Tasks</h2>
              <p>Assign task to your employees</p>
            </div>
            <div className='button-container'>
              <button onClick={() => setAddTask(true)}><span className="icon-icon-plus"></span>NEW TASK</button>
            </div>
          </div>
          <Tasks
            tasks={tasks}
            employees={employees}
            addTask={addTask}
            setAddTask={setAddTask}
            createNewTask={createNewTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            activeTask={activeTask}
            setActiveTask={setActiveTask}
            confirmDeleteModal={confirmDeleteModal}
            setConfirmDeleteModal={setConfirmDeleteModal}
            openTask={openTask}
          />
        </section>
        <section>
          <div className="section__header">
            <div>
              <h2>Employees</h2>
              <p>Enter employees' info</p>
            </div>
            <div className='button-container'>
              <button onClick={() => setAddEmployee(true)}><span className="icon-icon-plus"></span>NEW EMPLOYEE</button>
            </div>
          </div>
          <Employees
            employees={employees}
            addEmployee={addEmployee}
            setAddEmployee={setAddEmployee}
            createNewEmployee={createNewEmployee}
            updateEmployee={updateEmployee}
            deleteEmployee={deleteEmployee}
            activeEmployee={activeEmployee}
            setActiveEmployee={setActiveEmployee}
            confirmDeleteModal={confirmDeleteModal}
            setConfirmDeleteModal={setConfirmDeleteModal}
            openEmployee={openEmployee}
          />
        </section>
      </main>
      <section>
        <div className="section__header">
          <div>
            <h2>Projects</h2>
            <p>Organize your tasks by projects</p>
          </div>
          <div className='button-container'>
            <button onClick={() => setAddProject(true)}><span className="icon-icon-plus"></span>NEW PROJECT</button>
          </div>
        </div>
        <Projects
          projects={projects}
          tasks={tasks}
          addProject={addProject}
          setAddProject={setAddProject}
          createNewProject={createNewProject}
          updateProject={updateProject}
          deleteProject={deleteProject}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          confirmDeleteModal={confirmDeleteModal}
          setConfirmDeleteModal={setConfirmDeleteModal}
          openProject={openProject}
        />
      </section>
    </>
  )
}

export default App
