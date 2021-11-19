import React, { useEffect, useState } from "react"
import { getAllCustomers } from "../../ApiManager"
import "./CustomerList.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [sortedCustomers, setSortedCustomers] = useState([])
    //fetch and store customers embedded with purchases in transient state. 
    useEffect(
        () => {
            getAllCustomers()
                .then(setCustomers)
        },
        []
    )

    useEffect(
        () => {
            const copy = customers.map(customer => ({ ...customer }))

            const sortedCopy = copy.sort((customer1, customer2) => {

                const quantityValue1 = customer1.purchases.length
                const quantityValue2 = customer2.purchases.length
                return quantityValue2 - quantityValue1
            })

            setSortedCustomers(sortedCopy)
        },
        [customers]
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
                    sortedCustomers.map(
                        (customer) => {
                            const filteredPurchases = customer.purchases
                            return <tr key={`customer--${customer.id}`} className="customer">
                                <td>{customer.name}</td>
                                <td>{filteredPurchases.length}</td>
                            </tr>
                        }

                    )
                }
            </tbody>
        </table>
    )
}