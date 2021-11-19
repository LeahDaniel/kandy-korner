import React, { useState } from "react"
import { useHistory } from "react-router";
import { postPurchase } from "../../ApiManager";
import "./Purchase.css"

export const Purchase = ({productLocationId}) => {
    //state hook for updating the purchase transient state, for use in creating a new purchase object and posting to api
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

        postPurchase(newPurchase)
            .then(() => {
                //after posting to purchases, navigate to the /purchases page. 
                //No need to store state in this component's transient again because the purchases page fetches the purchases state anyway
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
                                //update quantity in purchase transient state using quantity field value
                                const copy = {...purchase}
                                copy.quantity = parseInt(event.target.value)
                                updatePurchase(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/* on click of button, post the state from the transient purchase object using the savePurchase function */}
            <button className="btn btn-primary" onClick={savePurchase}>
                Purchase
            </button>
        </form>
    )
}
