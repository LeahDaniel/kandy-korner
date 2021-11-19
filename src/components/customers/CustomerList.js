import React, { useEffect, useState } from "react"
import { getAllCustomers, getAllPurchases } from "../../ApiManager"
import "./CustomerList.css"

export const CustomerList = () => {
    const customerId = parseInt(localStorage.getItem("kandy_customer"))
    const [purchases, setPurchases] = useState([])
    const [customers, setCustomer] = useState([])

    //fetch and store customers in transient state
    useEffect(
        () => {
            getAllCustomers()
                .then(setCustomer)
        },
        []
    )

    //fetch purchases for only the current customer (from localStorage) and expand the customer and productLocation. store in transient state
    useEffect(
        () => {
            getAllPurchases()
                .then(setPurchases)
        },
        [customerId]
    )

    //return jsx- list of customers' names
    return (
        <table className="customers">
            <thead>
                <tr className="headerRow">
                    <th><h4>Customer</h4></th>
                    <th><h4>Candies Purchased</h4></th>
                </tr>
            </thead>
            <tbody>
            {
                customers.map(
                    (customer) => {
                        const filteredPurchases = purchases.filter(purchase => purchase.customerId === customer.id)
                        if (filteredPurchases.length > 0) {
                            let totalQuantity = 0
                            for (const purchase of filteredPurchases){
                                totalQuantity += purchase.quantity
                            }
                            return <tr key={`customer--${customer.id}`} className="customer">
                                <td>{customer.name}</td>
                                <td>{totalQuantity}</td>
                            </tr>
                        } else{
                            return <tr key={`customer--${customer.id}`} className="customer">
                                <td>{customer.name}</td>
                                <td>0</td>
                            </tr>
                        }
                    }
                )
            }
            </tbody>
        </table>
    )
}