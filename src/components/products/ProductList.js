import React, { useState, useEffect } from "react"
import { Purchase } from "../purchases/Purchase"
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
        <div className="products">
            {
                products.map(
                    (product) => {
                        return (
                            <div key={`product--${product.id}`} className="product">
                                <div className="product__info">
                                    <h3>{product.name}</h3>
                                    <p>Price: ${product.price}</p>
                                    <p>Type: {product.productType.name}</p>
                                </div>
                                <div className="product__purchase">
                                    <Purchase chosenProductId={product.id} />
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}