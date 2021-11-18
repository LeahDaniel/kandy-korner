import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Purchase } from "../purchases/Purchase"
import "./ProductLocationList.css"

export const ProductLocationList = () => {
    const { locationId } = useParams()
    const [products, setProducts] = useState([])
    const [productLocations, setProductLocations] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])



    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType&_sort=productTypeId`)
                .then(res => res.json())
                .then(productData => setProducts(productData))
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/productLocations?locationId=${locationId}`)
                .then(res => res.json())
                .then(productLocationData => setProductLocations(productLocationData))
        },
        [locationId]
    )

    useEffect(
        () => {
            const filtered = []
            for (const productLocation of productLocations) {
                const foundProduct = products.find(product => product.id === productLocation.productId)
                filtered.push(foundProduct)
            }
            setFilteredProducts(filtered)
        },
        [productLocations, products]
    )

    return (
        <div className="products">
            {
                filteredProducts.map(
                    (product) => {
                        const currentProductLocation = productLocations.find(productLocation => productLocation.locationId === parseInt(locationId) && productLocation.productId === product?.id)
                        return (
                            <div key={`product--${product.id}`} className="product">
                                <div className="product__info">
                                    <h3>{product.name}</h3>
                                    <p>Price: ${product.price}</p>
                                    <p>Type: {product.productType?.name}</p>
                                </div>
                                <div className="product__purchase">
                                    <Purchase chosenProductId={product.id} productLocationId={currentProductLocation.id} />
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}