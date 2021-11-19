import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";
import { getAllLocations, postEmployee } from "../../ApiManager";
import "./EmployeeForm.css"

export const EmployeeForm = () => {
    const [locations, setLocation] = useState([])
    //state hook for updating the employee transient state, for use in creating a new employee object and posting to api
    const [employee, updateEmployee] = useState({
        enteredName: "",
        selectedLocationId: 0,
        manager: false,
        fullTime: false,
        hourlyRate: 0
    });

    const history = useHistory()

    //fetch locations and store in transient state
    useEffect(
        () => {
            getAllLocations()
                .then(setLocation)
        },
        []
    )

    const hireEmployee = (event) => {
        //!What does this do exactly, and when do we need to use it? Why in this function and not others?
        event.preventDefault()

        const newEmployee = {
            name: employee.enteredName,
            locationId: parseInt(employee.selectedLocationId),
            manager: employee.manager,
            fullTime: employee.fullTime,
            hourlyRate: parseFloat(employee.hourlyRate)
        }

        return postEmployee(newEmployee)
            .then(() => {
                //after posting to employees, navigate to the /employees page. 
                //No need to store state in transient again because the employees page fetches the employees state
                history.push("/employees")
            })

    }

    return (
        <div className="formContainer">
            <form className="employeeForm">
                <h2 className="employeeForm__title">New Employee</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Full Name"
                            onChange={
                                //update the employee transient state with the value of the name input
                                (event) => {
                                    const copy = { ...employee }
                                    copy.enteredName = event.target.value
                                    updateEmployee(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="rate-group">
                        <label htmlFor="rate" >Rate:</label>
                        <input
                            type="number"
                            id="rate"
                            className="form-control"
                            placeholder="Include cents"
                            step='.01'
                            onChange={
                                (event) => {
                                    //update the employee transient state with the value of the hourly rate input
                                    const copy = { ...employee }
                                    copy.hourlyRate = event.target.value
                                    updateEmployee(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <select id="location"
                            onChange={
                                //update the employee transient state with the value of the location select
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
                            id="manager"
                            onChange={
                                (event) => {
                                    //update the employee transient state with the value of the manager boolean (checkbox)
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
                            id="fullTime"
                            onChange={
                                (event) => {
                                    //update the employee transient state with the value of the full-time boolean (checkbox)
                                    const copy = { ...employee }
                                    copy.fullTime = event.target.checked
                                    updateEmployee(copy)
                                }
                            } />
                    </div>
                </fieldset>
                {/* on click of the button, use the updated employee transient state to post a new object to the api with the hireEmployee function */}
                <div className="buttonArea">
                    <button className="btn btn-primary" onClick={hireEmployee}>
                    Finish Hiring
                    </button>
                </div>
            </form>
        </div>
    )
}
