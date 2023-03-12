import React from 'react';
import { useState, useEffect } from 'react';

export default function EmployeeForm(props) {
    const [employee, setEmployee] = useState({
        id: props.employeeData ? props.employeeData.id : '',
        name: props.employeeData ? props.employeeData.name : '',
        email: props.employeeData ? props.employeeData.email : '',
        phone: props.employeeData ? props.employeeData.phone : '',
        dob: props.employeeData ? props.employeeData.dob : '',
        salary: props.employeeData ? props.employeeData.salary : ''
    });

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    function handleChange(e) {
        setEmployee(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleConfirm(e) {
        let isFormValid = e.target.form.checkValidity();
        if (!isFormValid) {
            return e.target.form.reportValidity();
        }
        e.preventDefault();
        if (!props.employeeData) {
            props.createNewEmployee(employee);
            props.setAddEmployee(false);
        } else {
            props.updateEmployee(employee);
        }

    }

    function handleCancel() {
        if (!props.employeeData) {
            props.setAddEmployee(false);
        } else {
            props.setActiveEmployee(null);
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            handleCancel();
        }  
    }

    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='modal__title'>Employee details:</div>
                <form>
                    <label>Full Name<span title='This field is required' className='input--required'></span>:
                        <input
                            name='name'
                            type='text'
                            value={employee.name}
                            onChange={handleChange}
                            required
                            pattern='^[A-z][A-z]+( [A-z][A-z]+){1,}$'
                            title='Please enter full name of employee'
                        />
                    </label>
                    <label>E-mail<span title='This field is required' className='input--required'></span>:
                        <input
                            name='email'
                            type='email'
                            value={employee.email}
                            onChange={handleChange}
                            required
                            pattern='[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}'
                            title='Please enter a valid email address'
                        />
                    </label>
                    <label>Phone number:
                        <input
                            name='phone'
                            type='tel'
                            value={employee.phone}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Date of birth:
                        <input
                            name='dob'
                            type='date'
                            value={employee.dob}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Monthly Salary:
                        <input
                            name='salary'
                            type='tel'
                            value={employee.salary}
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
