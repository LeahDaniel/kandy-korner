import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    //Links for the navbar that go to a certain address. These do not cause any function to run- that is the role of the route
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Locations</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/inventory">Inventory</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/purchases">My Orders</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                //when logout is clicked, remove the customer id from localstorage, which then runs the logic in applicationViews to go back to the login page
                    onClick={
                        () => {
                            localStorage.removeItem("kandy_customer")
                        }
                    }>
                    Logout
                    </Link>
            </li>
        </ul>
    )
}
