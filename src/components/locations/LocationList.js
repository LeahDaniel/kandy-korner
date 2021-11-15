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
                        return <p key={`location--${location.id}`}>Location {location.id}: {location.address}</p>
                    }
                )
            }
        </>
    )
}