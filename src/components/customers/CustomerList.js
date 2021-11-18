import React, { useEffect, useState } from "react"
import "./CustomerList.css"

export const CustomerList = () => {
    const [customers, changeCustomer] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then((data) => {
                    changeCustomer(data)
                })
        },
        []
    )

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