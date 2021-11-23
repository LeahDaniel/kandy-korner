import React, { useState, useEffect } from "react"
import { getAllProducts, getProductsBySearchTerm } from "../../ApiManager"
import "./InventoryList.css"

export const InventoryList = ({ searchTerm }) => {
    const [products, setProducts] = useState([])

    //fetch products and store in transient state. expand productType and sort by productTypeId 
    //to allow access to the productType name and make sure products are grouped by type
    useEffect(
        () => {
            if (!searchTerm) {
                getAllProducts()
                    .then(setProducts)
            } else {
                getProductsBySearchTerm(searchTerm)
                    .then(setProducts)
            }
        },
        [searchTerm]
    )
    //return jsx- list of all products
    return (
        <div className="products__main">
            {
                products.map(
                    (product) => {
                        return (
                            <div key={`product--${product.id}`} className="product__main">
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                                <p>Type: {product.productType.name}</p>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}