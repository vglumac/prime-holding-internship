import React from 'react'

export default function Header(props) {

    const sortByCompletedTasks = (a, b) => b.completedTasks - a.completedTasks;
    const topFive = props.employeesData.map(employee => ({ id: employee.id, name: employee.name, completedTasks: employee.numOfCompletedTasks })).sort(sortByCompletedTasks).slice(0, 5);
    const topFiveElements = topFive.map(employee => <div key={employee.id} className='header__top-five-item'>{employee.name}</div>);

    const totalNumberOfTasks = props.tasksData.length;
    const numberOfCompletedTasks = props.tasksData.filter(task => task.isCompleted).length;
    const percentageOfCompletedTasks = Math.floor(numberOfCompletedTasks / totalNumberOfTasks * 100);
    const displayedPercentage = percentageOfCompletedTasks ? percentageOfCompletedTasks : 0;

    const styles = {
        backgroundImage: `conic-gradient(#747bff ${percentageOfCompletedTasks}%, #ccc 0)`
    }

    return (
        <header className='header'>
            <h1 className='header__title'>Task manager</h1>
            <div className='header__stats'>
                <div className='header__top-five'>
                    <h3 className='header__top-five-title'><span className="icon-trophy"></span> Top 5 <span className="icon-trophy"></span></h3>
                    <div className='header__top-five-list'>
                        {topFiveElements}
                    </div>
                </div>
                <div className='header__gradient' style={styles}>
                    <div className='header__numOfTasks'>
                        <div className='header__numOfTasks-percentage'>{displayedPercentage}%</div>
                        <div className='header__numOfTasks-text'>of tasks have been completed!</div>
                    </div>
                </div>
            </div>
        </header>
    )
}