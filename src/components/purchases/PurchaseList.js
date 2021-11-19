import React, { useState, useEffect } from "react"
import { getAllLocations, getAllProducts, getPurchasesByCustomerId } from "../../ApiManager"
import "./PurchaseList.css"

export const PurchaseList = () => {
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const [purchases, setPurchases] = useState([])
    const [locations, setLocations] = useState([])
    const [products, setProducts] = useState([])

    //fetch purchases for only the current customer (from localStorage) and expand the customer and productLocation. store in transient state
    useEffect(
        () => {
            getPurchasesByCustomerId(customerId)
                .then(setPurchases)
        },
        [customerId]
    )
    //fetch locations and store in transient state
    useEffect(
        () => {
            getAllLocations()
                .then(setLocations)
        },
        []
    )
    //fetch products and store in transient state
    useEffect(
        () => {
            getAllProducts()
                .then(setProducts)
        },
        []
    )

    return (
        <div className="purchases">
            {
                purchases.map(
                    (purchase) => {
                        //find the correct location and product objects for use in interpolation by checking the locationId and productId on the productLocation that was expanded
                        const foundLocation = locations.find(location => location.id === purchase.productLocation.locationId)
                        const foundProduct = products.find(product => product.id === purchase.productLocation.productId)
                        return <div key={`purchase--${purchase.id}`} className="purchase">
                            <p>Purchased by {purchase.customer.name} on {purchase.date}</p>
                            <p>Product: {foundProduct?.name}</p>
                            <p>Quantity: {purchase.quantity}</p>
                            <p>Location: {foundLocation?.name} </p>
                        </div>
                    }
                )
            }
        </div>
    )
}