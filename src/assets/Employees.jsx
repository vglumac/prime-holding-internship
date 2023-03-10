import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import DeleteModal from './DeleteModal';

export default function Employees(props) {

    const isDeleting = (employee) => props.confirmDeleteModal && props.confirmDeleteModal.type === 'delete' && props.confirmDeleteModal.id === employee.id;
    const isUpdating = (employee) => props.activeEmployee && props.activeEmployee.type === 'updating' && props.activeEmployee.id === employee.id;
    const classIcon = (employee) => employee.isOpened ? "icon-circle-up" : "icon-circle-down";

    function toggleShowEmployee(employee) {
        props.openEmployee(employee.id);
    }

    function handleDeleteClick(employee) {
        props.setConfirmDeleteModal({ id: employee.id, type: 'delete' })
    }

    function handleUpdateClick(employee) {
        props.setActiveEmployee({ id: employee.id, type: 'updating' })
    }

    const displayEmployees = props.employees.map(employee => (
        <div key={employee.id}>
            <div className="item__header">
                <h4>{employee.name}</h4>
                <span onClick={() => toggleShowEmployee(employee)} className={classIcon(employee)}></span>
            </div>
            {!isUpdating(employee) && employee.isOpened &&
                <div>
                    <div>E-mail: {employee.email}</div>
                    <div>Phone number: {employee.phone}</div>
                    <div>Date of birth: {employee.dob}</div>
                    <div>Salary: {employee.salary}</div>
                    <button onClick={() => handleUpdateClick(employee)}><span className="icon-icon-edit"></span>Edit</button>
                    <button onClick={() => handleDeleteClick(employee)}><span className="icon-icon-delete"></span>Delete</button>
                </div>}
            {isUpdating(employee) &&
                <div>
                    <EmployeeForm
                        employeeData={employee}
                        updateEmployee={props.updateEmployee}
                        setActiveEmployee={props.setActiveEmployee}
                    />
                </div>}
            {isDeleting(employee) &&
                <DeleteModal
                    id={employee.id}
                    item='employee'
                    closeModal={() => props.setConfirmDeleteModal(null)}
                    confirmDelete={props.deleteEmployee}
                />}
        </div>
    ))

    return (
        <>
            {props.employees.length > 0 ? displayEmployees : <p>Click on "NEW EMPLOYEE" to get started"</p>}
            {props.addEmployee &&
                <EmployeeForm
                    setAddEmployee={props.setAddEmployee}
                    createNewEmployee={props.createNewEmployee}
                />}
        </>
    )
}