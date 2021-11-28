import React, { useState, useEffect } from "react"
import { getAllCustomers,  getAllProductLocations,  getPurchasesByCustomerId } from "../../ApiManager"
import "./PurchaseList.css"

export const PurchaseList2 = () => {
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const [purchases, setPurchases] = useState([])
    const [purchaseLineItems, setPurchaseLineItems] = useState([])
    const [productLocations, setProductLocations] = useState([])
    const [customers, setCustomers] = useState([])


    //fetch productLocations and store in transient state (expanded product and location)
    useEffect(
        () => {
            getAllProductLocations()
                .then(setProductLocations)
                .then(getAllCustomers)
                .then(setCustomers)
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

            const newPurchaseListItem = {
                productLocation: purchase.productLocation,
                customerId: purchase.customerId,
                date: purchase.date
            }

            const stringifiedObject = JSON.stringify(newPurchaseListItem)

            if (map.has(stringifiedObject)) {
                map.set(stringifiedObject, (map.get(stringifiedObject)) + 1)
            } else {
                map.set(stringifiedObject, 1)
            }
        }

        const mapArray = Array.from(map)

        setPurchaseLineItems(mapArray)
        
    }

    return (
        <div className="purchases">
            {
                purchaseLineItems.map(
                    (purchaseArr) => {
                        const [stringPurchase, quantity] = purchaseArr
                        const purchase = JSON.parse(stringPurchase)
                        const foundProductLocation= productLocations.find(productLocation=> productLocation.id === purchase.productLocation.id)
                        const foundCustomer = customers.find(customer => customer.id === purchase.customerId)
                        return <div key={`purchase--${purchase.productLocation.id}`} className="purchase">
                            <p>Product: {foundProductLocation?.product.name}</p>
                            <p>Location: {foundProductLocation?.location.name}</p>
                            <p>Total price: {quantity * foundProductLocation?.product.price}</p>
                            <p>Total quantity: {quantity}</p>
                            <p>Purchased by {foundCustomer.name} on {purchase.date}</p>
                        </div>
                    }
                )
            }
        </div>
    )
}
