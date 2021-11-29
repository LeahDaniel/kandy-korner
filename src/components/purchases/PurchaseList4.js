import React, { useState, useEffect } from "react"
import {getAllProductLocations, getPurchasesByCustomerId } from "../../ApiManager"
import "./PurchaseList.css"

export const PurchaseList4 = () => {
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const [purchases, setPurchases] = useState([])
    const [productLocations, setProductLocations] = useState([])
    const [purchaseLineItems, setPurchaseLineItems] = useState([])

    //fetch productLocations and store in transient state (expanded product and location)
    useEffect(
        () => {
            getAllProductLocations()
                .then(setProductLocations)
                .then(() => getPurchasesByCustomerId(customerId))
                .then(setPurchases)
        },
        [customerId]
    )

    useEffect(
        () => {
            if (purchases.length > 0) {
                frequencyCounter(purchases)
            }
        },
        [purchases]
    )


    //Goal: use reduce method directly inside of JSX instead of having a separate function.
    //! Help, please!
    const frequencyCounter = (items) => {
        let itemsCopy = []

        for (const item of items) {
            delete item.id
            itemsCopy.push(item)
        }

        const map = itemsCopy.reduce(
            (map, currentObj) => map.set(JSON.stringify(currentObj), (map.get(JSON.stringify(currentObj)) || 0) + 1),
            new Map()
        )
        const mapArray = Array.from(map)

        setPurchaseLineItems(mapArray)
    }


    return (
        <div className="purchases">
            {
                purchaseLineItems.map(
                    (purchaseLineItem) => {
                        const [stringPurchase, quantity] = purchaseLineItem
                        const purchase = JSON.parse(stringPurchase)
                        const foundProductLocation = productLocations.find(productLocation => productLocation.id === purchase.productLocationId)

                        return <div key={`purchase--${purchase.productLocationId}`} className="purchase">
                            <p>Product: {foundProductLocation?.product.name}</p>
                            <p>Location: {foundProductLocation?.location.name}</p>
                            <p>Purchased by {purchase.customer.name} on {purchase.date}</p>
                            <p>Total price: {quantity * foundProductLocation?.product.price}</p>
                            <p>Total quantity: {quantity}</p>
                        </div>
                    }
                )
            }
        </div>
    )
}

