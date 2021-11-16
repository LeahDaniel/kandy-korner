import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";

export const EmployeeForm = () => {
    const [locations, setLocation] = useState([])
    const [employee, updateEmployee] = useState({
        enteredName: "",
        selectedLocationId: 0,
        manager: false,
        fullTime: false,
        hourlyRate: 0
    });

    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then((data) => {
                    setLocation(data)
                })
        },
        []
    )

    const hireEmployee = (event) => {
        event.preventDefault()

        const newEmployee = {
            name: employee.enteredName,
            locationId: parseInt(employee.selectedLocationId),
            manager: employee.manager,
            fullTime: employee.fullTime,
            hourlyRate: parseFloat(employee.hourlyRate)
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        }

        return fetch("http://localhost:8088/employees", fetchOptions)
            .then(() => {
                history.push("/employees")
            })

    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.enteredName = event.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <select
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.selectedLocationId = event.target.value
                                updateEmployee(copy)
                            }
                        }>
                        <option value="0">Select a location</option>
                        {
                            locations.map(location => {
                                return <option value={location.id} key={location.id}>{location.name}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="manager">Manager:</label>
                    <input type="checkbox"
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.manager = event.target.checked
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullTime">Full-Time:</label>
                    <input type="checkbox"
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.fullTime = event.target.checked
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rate">Rate:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Hourly Rate (please enter a number)"
                        onChange={
                            (event) => {
                                const copy = { ...employee }
                                copy.hourlyRate = event.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={hireEmployee}>
                Finish Hiring
            </button>
        </form>
    )
}
