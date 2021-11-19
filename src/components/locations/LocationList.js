import React, { useState, useEffect } from "react"
import {  Link } from "react-router-dom"
import { getAllLocations } from "../../ApiManager"
import "./LocationList.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    //fetch locations and store in transient state
    useEffect(
        () => {
            getAllLocations()
                .then(setLocations)
        },
        []
    )
    //return jsx- list of locations with a link to the product purchase page
    return (
        <div className="locations">
            {
                locations.map(
                    (location) => {
                        return <div key={`location--${location.id}`} className="location">
                            <h3>{location.name}</h3>
                            <p>Address: {location.address}</p>
                            {/* link with a button inside of it instead of text, basically a link disguised as a button
                            interpolates the location id so that we have access to the location id in the component for the page*/}
                            <Link to={`/products/location/${location.id}`}><button>
                                Purchase Products
                            </button></Link>
                        </div>
                    }
                )
            }
        </div>
    )
}