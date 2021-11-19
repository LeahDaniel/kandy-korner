import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";
import { deleteEmployee, getAllEmployees } from "../../ApiManager";
import "./EmployeeList.css"

export const EmployeeList = () => {
    
    const [employees, setEmployee] = useState([])
    const history = useHistory()

    //fetch employees and store in transient state
    useEffect(
        () => {
            getAllEmployees()
                .then(setEmployee)
        },
        []
    )
    //delete employee from api, then fetch employees and store in transient state to allow re-render
    const fireEmployee = (id) => {
        deleteEmployee(id)
            .then(() => {
                getAllEmployees()
                    .then(setEmployee)
            })
    }

    return (
        <>
            <div className="hireButton">
                {/* on button click, navigate to employee form */}
                <button onClick={() => history.push("/employees/hire")}>Hire Employee</button>
            </div>
            <div className="employees">
                {
                    employees.map(
                        (employee) => {
                            return <div key={`employee--${employee.id}`} className="employee">
                                <h3>{employee.name}</h3>
                                <p>Location: {employee.location.name}</p>
                                {/* display strings based on booleans using ternary statements */}
                                <p>Manager: {employee.manager === true ? "Yes" : "No"}</p>
                                <p>Classification: {employee.fullTime === true ? "Full-time" : "Part-time"}</p>
                                <p>Hourly Rate: {employee.hourlyRate}</p>
                                {/* on click of button, run delete function for employee using the interpolated id */}
                                <button onClick={() => { fireEmployee(employee.id) }}> Fire Employee</button>
                            </div>
                        }
                    )
                }
            </div>
        </>
    )
}

