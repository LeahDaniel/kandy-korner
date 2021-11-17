import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";
import "./Employee.css"

export const EmployeeList = () => {
    const [employees, changeEmployee] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/employees?_expand=location")
                .then(res => res.json())
                .then((data) => {
                    changeEmployee(data)
                })
        },
        []
    )

    const fireEmployee = (id) => {
        fetch(`http://localhost:8088/employees/${id}`, {
            method: "DELETE"
        })
        .then( () => {
            fetch("http://localhost:8088/employees?_expand=location")
                .then(res => res.json())
                .then((data) => {
                    changeEmployee(data)
                })
            })
    }

    return (
        <>
            <div>
                <button onClick={() => history.push("/employees/hire")}>Hire Employee</button>
            </div>

            {
                employees.map(
                    (employee) => {
                        return <div key={`employee--${employee.id}`} className="employeeListItem">
                            <p>{employee.name} works at {employee.location.name}</p>
                            <p>Manager: {employee.manager === true ? "Yes" : "No"}</p>
                            <p>Classification: {employee.fullTime === true ? "Full-time" : "Part-time"}</p>
                            <p>Hourly Rate: {employee.hourlyRate}</p>
                            <button onClick={() => { fireEmployee(employee.id)}}> Fire Employee</button>
                        </div>
                    }
                )
            }
        </>
    )
}

