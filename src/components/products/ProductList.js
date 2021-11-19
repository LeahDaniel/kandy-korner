import React, { useState, useEffect } from "react"
import { getAllProducts } from "../../ApiManager"
import "./ProductList.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])

    //fetch products and store in transient state. expand productType and sort by productTypeId 
    //to allow access to the productType name and make sure products are grouped by type
    useEffect(
        () => {
            getAllProducts()
                .then(setProducts)
        },
        []
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