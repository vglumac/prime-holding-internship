import { useState, useEffect } from 'react'
import Header from './assets/Header'
import Tasks from './assets/Tasks'
import Employees from './assets/Employees'
import Projects from './assets/Projects'

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
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [tasks, employees, projects])

  //Update number of assigned tasks

  useEffect(() => {
    setEmployees(prevEmployees => {
      return prevEmployees.map(prevEmployee => {
        let taskNum = 0;
        tasks.forEach(task => {
          if (task.assignedTo.assigneeId === prevEmployee.id) {
            taskNum += 1;
          }
        })
        return {
          ...prevEmployee,
          numOfAssignedTasks: taskNum
        }
      })
    })
  }, [tasks])

  function createNewTask(newTaskData) {
    const newTask = {
      id: nanoid(),
      ...newTaskData,
      isOpened: false
    }
    setTasks(prevTasks => [...prevTasks, newTask])
  }


  function createNewEmployee(newEmployeeData) {
    const newEmployee = {
      id: nanoid(),
      ...newEmployeeData,
      numOfAssignedTasks: 0,
      numOfCompletedTasks: 0,
      isOpened: false
    }
    setEmployees(prevEmployees => [...prevEmployees, newEmployee])
  }

  function createNewProject(newProjectData) {
    const newProject = {
      id: nanoid(),
      ...newProjectData,
      numOfAssignedTasks: 0,
      numOfCompletedTasks: 0,
      isOpened: false
    }
    setProjects(prevProjects => [...prevProjects, newProject])
  }

  function updateTask(updatedTask, updatedTaskId) {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (updatedTaskId === task.id) {
          return {
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

  function updateEmployee(updatedEmployee, updatedEmployeeId) {
    setEmployees(prevEmployees => {
      return prevEmployees.map(employee => {
        if (updatedEmployeeId === employee.id) {
          return {
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

  function deleteTask(taskId) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    setConfirmDeleteModal(null)
  }

  function deleteEmployee(employeeId) {
    setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeId));
    setConfirmDeleteModal(null);
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

  return (
    <>
      <Header />
      <main>
        <section>
          <div className="section-header">
            <h2>Tasks</h2>
            <button onClick={() => setAddTask(true)}>NEW TASK</button>
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
          <div className="section-header">
            <h2>Employees</h2>
            <button onClick={() => setAddEmployee(true)}>NEW EMPLOYEE</button>
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
        <div className="section-header">
          <h2>Projects</h2>
          <p>Organize your tasks by projects</p>
          <button onClick={() => setAddEmployee(true)}>NEW PROJECT</button>
        </div>
        <Projects
          projects={projects}
          tasks={tasks.map(task => task.title)}
        />
      </section>
    </>
  )
}

export default App
