import React from "react"
import { Route } from "react-router-dom"
import { LocationList } from "./locations/LocationList"
import { EmployeeForm } from "./employees/EmployeeForm"
import { EmployeeList } from "./employees/EmployeeList"
import { CustomerList } from "./customers/CustomerList"
import { PurchaseList3 } from "./purchases/PurchaseList3"
import { ProductLocationList } from "./products/ProductLocationList"
import { Inventory } from "./products/Inventory"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/inventory">
                <Inventory />
            </Route>
            {
                // (\d+) = regular expressions- string pattern matching
                //\d= decimal or number
                //+ = one or more of those numbers (forces a number entry in general)
            }
            <Route exact path="/products/location/:locationId(\d+)">
                <ProductLocationList />
            </Route>
            <Route exact path="/">
                <LocationList />
            </Route>
            <Route exact path="/employees">
                <EmployeeList />
            </Route>
            <Route path="/employees/hire">
                <EmployeeForm />
            </Route>
            <Route path="/customers">
                <CustomerList />
            </Route>
            <Route path="/purchases">
                <PurchaseList3 />
            </Route>
        </>
    )
}
