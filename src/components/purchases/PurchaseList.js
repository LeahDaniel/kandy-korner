import React, { useState, useEffect } from "react"
import "./PurchaseList.css"

export const PurchaseList = () => {
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const [purchases, setPurchases] = useState([])
    const [locations, setLocations] = useState([])
    const [products, setProducts] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?customerId=${customerId}&_expand=customer&_expand=productLocation`)
                .then(res => res.json())
                .then(purchaseData => setPurchases(purchaseData))
        },
        [customerId]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(res => res.json())
                .then(data => setLocations(data))
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(res => res.json())
                .then(data => setProducts(data))
        },
        []
    )

    

    return (
        <div className="purchases">
            {
                purchases.map(
                    (purchase) => {
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