import React from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./KandyKorner.css"

export const KandyKorner = () => {
    return (
        <>
            <h1>Kandy Korner</h1>
            <NavBar />
            <ApplicationViews />
        </>
    )
}

