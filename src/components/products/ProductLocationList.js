import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getAllProductTypes, getProductLocationsByLocationId } from "../../ApiManager"
import { Purchase } from "../purchases/Purchase"
import "./ProductLocationList.css"

export const ProductLocationList = () => {
    const { locationId } = useParams()
    const [productLocations, setProductLocations] = useState([])
    const [productTypes, setProductTypes] = useState([])


    //fetch productLocations with a locationId matching that of the link (the location Id that was fed in from the location list)
    //made possible by Route and the useParams hook. Store in transient state. Requires locationId to execute (locationId updates when useParams is called)
    //and expand products
    useEffect(
        () => {
            getProductLocationsByLocationId(locationId)
                .then(setProductLocations)
        },
        [locationId]
    )

    useEffect(
        () => {
            getAllProductTypes()
                .then(setProductTypes)
        },
        [locationId]
    )

    return (
        <div className="products">
            {
                productLocations.map(
                    (productLocation) => {
                        const foundProductType = productTypes.find(productType => productType.id === productLocation.product.productTypeId)
                        return (
                            <div key={`product--${productLocation.product?.id}`} className="product">
                                <div className="product__info">
                                    <h3>{productLocation.product?.name}</h3>
                                    <p>Price: ${productLocation.product?.price}</p>
                                    <p>Type: {foundProductType?.name}</p> 
                                </div>
                                <div className="product__purchase">
                                    {/* use Props to pass the productLocationId to the purchase component */}
                                    <Purchase productLocationId={productLocation.id} />
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

