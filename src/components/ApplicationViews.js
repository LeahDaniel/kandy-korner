import React from "react"
import { Route } from "react-router-dom"
import { ProductList} from "./products/ProductList"
import { LocationList} from "./locations/LocationList"
import { EmployeeForm } from "./employees/EmployeeForm"
import { EmployeeList } from "./employees/EmployeeList"
import { CustomerList } from "./customers/CustomerList"


export const ApplicationViews = () => {
    return (
        <>
            <Route path="/products">
                <ProductList/>
            </Route>
            <Route path="/locations">
                <LocationList/>
            </Route>
            <Route exact path="/employees">
                <EmployeeList/>
            </Route>
            <Route path="/employees/hire">
                <EmployeeForm/>
            </Route>
            <Route path="/customers">
                <CustomerList/>
            </Route>
        </>
    )
}
