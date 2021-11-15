import React, { useState, useEffect } from "react"

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
        <>
            {
                products.map(
                    (product) => {
                        return <div key={`product--${product.id}`}>
                            <p>Product {product.id}: {product.name}</p>
                            <p>Price: ${product.price}</p>
                            <p>Type: {product.productType.name}</p>
                            <p>---------------------------------------------</p>
                            </div>
                    }
                )
            }
        </>
    )
}