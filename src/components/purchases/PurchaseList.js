import React, { useState, useEffect } from "react"
const customerId = parseInt(localStorage.getItem("kandy_customer"))

export const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?customerId=${customerId}&_expand=customer&_expand=product`)
                .then(res => res.json())
                .then(purchaseData => setPurchases(purchaseData))
        },
        []
    )

    return (
        <>
            {
                purchases.map(
                    (purchase) => {
                        return <div key={`purchase--${purchase.id}`}>
                            <p>Purchased by {purchase.customer?.name} on {purchase.date}</p>
                            <p>Product: {purchase.product?.name}</p>
                            <p>Quantity: {purchase.quantity}</p>
                            <p>---------------------------------------------</p>
                            </div>
                    }
                )
            }
        </>
    )
}