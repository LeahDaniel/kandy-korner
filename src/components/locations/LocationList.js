import React, { useState, useEffect } from "react"

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
        <>
            {
                locations.map(
                    (location) => {
                        return <div key={`location--${location.id}`}>
                            <h3>{location.name}</h3>
                            <p>Address: {location.address}</p>
                            <p>---------------------------------------------</p>
                            </div>
                    }
                )
            }
        </>
    )
}