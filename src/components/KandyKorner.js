import React from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./KandyKorner.css"
import { Redirect, Route } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const KandyKorner = () => {
    return (
        <>
            <Route
                render={() => {
                    //if there is a logged in customer, return the app jsx
                    if (localStorage.getItem("kandy_customer")) {
                        return (
                            <>
                                <h1>Kandy Korner</h1>
                                <NavBar />
                                <ApplicationViews />
                            </>
                        );
                    } else {
                        //if there is not a logged in customer, be sent to login page
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </> 
    )
}

