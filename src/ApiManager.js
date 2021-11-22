export const getAllCustomers = () => {
    return fetch("http://localhost:8088/customers?_embed=purchases")
        .then(res => res.json())
}
export const getAllLocations = () => {
    return fetch("http://localhost:8088/locations")
        .then(res => res.json())
}
export const getAllEmployees = () => {
    return fetch("http://localhost:8088/employees?_expand=location")
        .then(res => res.json())
}
export const getAllProductTypes= () => {
    return fetch("http://localhost:8088/productTypes")
        .then(res => res.json())
}
export const getAllPurchases = () => {
    return fetch("http://localhost:8088/purchases")
        .then(res => res.json())
}

export const getAllProducts = () => {
    return fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId")
        .then(res => res.json())
}
export const getProductLocationsByLocationId = (locationId) => {
    return fetch(`http://localhost:8088/productLocations?locationId=${locationId}&_expand=product`)
        .then(res => res.json())
}
export const getPurchasesByCustomerId = (customerId) => {
    return fetch(`http://localhost:8088/purchases?customerId=${customerId}&_expand=customer&_expand=productLocation`)
        .then(res => res.json())
}

export const postEmployee = (newEmployee) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    }

    return fetch("http://localhost:8088/employees", fetchOptions)
}
export const postPurchase = (newPurchase) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPurchase)
    }

    return fetch("http://localhost:8088/purchases", fetchOptions)
}

export const deleteEmployee = (id) => {
    return fetch(`http://localhost:8088/employees/${id}`, {
        method: "DELETE"
    })
}