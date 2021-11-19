import React, { useEffect, useState } from "react"
import { getAllCustomers } from "../../ApiManager"
import "./CustomerList.css"

export const CustomerList = () => {
    const [customers, setCustomer] = useState([])

    //fetch and store customers in transient state
    useEffect(
        () => {
            getAllCustomers()
                .then(setCustomer)
        },
        []
    )

    //return jsx- list of customers' names
    return (
        <div className="customers">
            {
                customers.map(
                    (customer) => {
                        return <div key={`customer--${customer.id}`} className="customer">
                            {customer.name}
                        </div>
                    }
                )
            }
        </div>
    )
}