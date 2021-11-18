import React, { useState } from "react"
import { useHistory } from "react-router";
import "./Purchase.css"

export const Purchase = ({productLocationId}) => {
    const [purchase, updatePurchase] = useState({
        customerId: 0,
        productLocationId: 0,
        quantity: 0,
        date: ""
    });

    const history = useHistory()

    const savePurchase = (event) => {
        event.preventDefault()
        const date = new Date()

        const newPurchase = {
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            productLocationId: productLocationId,
            quantity: purchase.quantity,
            date: date.toLocaleDateString()
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        }

        return fetch("http://localhost:8088/purchases", fetchOptions)
            .then(() => {
                history.push("/purchases")
            })
        
    }

    return (
        <form className="purchaseForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="#s only"
                        onChange={
                            (event) => {
                                const copy = {...purchase}
                                copy.quantity = parseInt(event.target.value)
                                updatePurchase(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={savePurchase}>
                Purchase
            </button>
        </form>
    )
}
