import React, { useState, useEffect } from "react"
import "./ProductList.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId")
                .then(res => res.json())
                .then(productData => setProducts(productData))
        },
        []
    )

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