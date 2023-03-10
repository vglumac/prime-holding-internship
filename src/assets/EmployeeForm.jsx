import React from 'react'
import { useState } from 'react'

export default function EmployeeForm(props) {
    const [employee, setEmployee] = useState({
        name: props.employeeData ? props.employeeData.name : '',
        email: props.employeeData ? props.employeeData.email : '',
        phone: props.employeeData ? props.employeeData.phone : '',
        dob: props.employeeData ? props.employeeData.dob : '',
        salary: props.employeeData ? props.employeeData.salary : ''
    })

    function handleChange(e) {
        setEmployee(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleConfirm(e) {
        e.preventDefault();
        if (!props.employeeData) {
            props.createNewEmployee(employee);
            props.setAddEmployee(false);
        } else {
            props.updateEmployee(employee, props.employeeData.id);
        }

    }

    function handleCancel() {
        if (!props.employeeData) {
            props.setAddEmployee(false);
        } else {
            props.setActiveEmployee(null);
        }
    }

    return (
        <>
            <form>
                <label>Name:
                    <input
                        name='name'
                        value={employee.name}
                        onChange={handleChange}
                    />
                </label>
                <label>E-mail:
                    <input
                        name='email'
                        value={employee.email}
                        onChange={handleChange}
                    />
                </label>
                <label>Phone number:
                    <input
                        name='phone'
                        value={employee.phone}
                        onChange={handleChange}
                    />
                </label>
                <label>Date of birth:
                    <input
                        name='dob'
                        value={employee.dob}
                        onChange={handleChange}
                    />
                </label>
                <label>Salary:
                    <input
                        name='salary'
                        value={employee.salary}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={handleConfirm}>Confirm</button>
                <button type='button' onClick={handleCancel}>Cancel</button>
            </form>

        </>
    )
}