import React, { useState, useEffect } from "react"
import {  Link } from "react-router-dom"
import "./LocationList.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then(locationData => setLocations(locationData))
        },
        []
    )

    return (
        <div className="locations">
            {
                locations.map(
                    (location) => {
                        return <div key={`location--${location.id}`} className="location">
                            <h3>{location.name}</h3>
                            <p>Address: {location.address}</p>
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