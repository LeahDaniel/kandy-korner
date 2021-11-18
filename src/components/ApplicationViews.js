import React from "react"
import { Route } from "react-router-dom"
import { ProductList } from "./products/ProductList"
import { LocationList } from "./locations/LocationList"
import { EmployeeForm } from "./employees/EmployeeForm"
import { EmployeeList } from "./employees/EmployeeList"
import { CustomerList } from "./customers/CustomerList"
import { PurchaseList } from "./purchases/PurchaseList"
import { ProductLocationList } from "./products/ProductLocationList"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/products">
                <ProductList />
            </Route>
            <Route exact path="/products/location/:locationId(\d+)">
                <ProductLocationList  />
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
                <PurchaseList />
            </Route>
        </>
    )
}
