import React, { useState, useEffect } from "react"
import { getAllProductLocations, getPurchasesByCustomerId } from "../../ApiManager"
import "./PurchaseList.css"

export const PurchaseList = () => {
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
                createLineItem()
            }
        },
        [purchases]
    )

    const createLineItem = () => {
        const map = new Map()

        for (const purchase of purchases) {
            const productLocationId = purchase.productLocation.id
            if (map.has(productLocationId)) {
                map.set(productLocationId, (map.get(productLocationId)) + 1)
            } else {
                map.set(productLocationId, 1)
            }
        }

        let purchaseArray = []
        //iterate through map key-value pairs and create a new purchase list item for use in jsx
        for (const [productLocationId, quantity] of map) {
            const foundProductLocation = productLocations.find(productLocation => productLocation.id === productLocationId)

            const newPurchaseListItem = {
                productLocation: foundProductLocation,
                totalPrice: quantity * foundProductLocation?.product.price,
                quantity: quantity
            }
            purchaseArray.push(newPurchaseListItem)
        }
        setPurchaseLineItems(purchaseArray)
    }

    return (
        <div className="purchases">
            {
                purchaseLineItems.map(
                    (purchase) => {
                        return <div key={`productLocation--${purchase.productLocation?.id}`} className="purchase">
                            <p>Product: {purchase.productLocation?.product.name}</p>
                            <p>Location: {purchase.productLocation?.location.name}</p>
                            <p>Total price: {purchase.totalPrice}</p>
                            <p>Total quantity: {purchase.quantity}</p>
                        </div>
                    }
                )
            }
        </div>
    )
}

        // <p>Purchased by {purchase.customer.name} on {purchase.date}</p>