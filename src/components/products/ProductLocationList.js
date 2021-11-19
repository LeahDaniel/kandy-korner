import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getAllProducts, getProductLocationsByLocationId } from "../../ApiManager"
import { Purchase } from "../purchases/Purchase"
import "./ProductLocationList.css"

export const ProductLocationList = () => {
    const { locationId } = useParams()
    const [products, setProducts] = useState([])
    const [productLocations, setProductLocations] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])


    //fetch products and store in transient state. expand productType and sort by productTypeId 
    //to allow access to the productType name and make sure products are grouped by type
    useEffect(
        () => {
            getAllProducts()
                .then(setProducts)
        },
        []
    )

    //fetch productLocations with a locationId matching that of the link (the location Id that was fed in from the location list)
    //made possible by Route and the useParams hook. Store in transient state. Requires locationId to execute (locationId updates when useParams is called)
    useEffect(
        () => {
            getProductLocationsByLocationId(locationId)
                .then(setProductLocations)
        },
        [locationId]
    )
    //for every productLocation (which already have the correct locationId due to the above fetch), find the associated product and return an array of them.
    useEffect(
        () => {
            //!Would there be a better way of doing the below within a JSON query string parameter
            //!I tried embedding productLocations in the products and then only getting the ones that 
            //! have a productLocation with the appropriate locationID, but no dice
            //! Or maybe just with better array methods?
            
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
                        //find the correct productLocation for the current product by using the locationId from useParams and the id of the current product.
                        const currentProductLocation = productLocations.find(productLocation => productLocation.locationId === parseInt(locationId) && productLocation.productId === product?.id)
                        return (
                            <div key={`product--${product?.id}`} className="product">
                                <div className="product__info">
                                    <h3>{product?.name}</h3>
                                    <p>Price: ${product?.price}</p>
                                    <p>Type: {product.productType?.name}</p>
                                </div>
                                <div className="product__purchase">
                                    {/* use Props to pass the productLocationId to the purchase component */}
                                    <Purchase productLocationId={currentProductLocation.id} />
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}