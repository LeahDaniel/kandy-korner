import { useState } from "react/cjs/react.development"
import { InventoryList } from "./InventoryList"
import { InventorySearch } from "./InventorySearch"

export const Inventory = () => {
    const [searchTerm, setSearchTerm] = useState([])

    return (
        <>
            <InventorySearch setSearchTerm={setSearchTerm} />
            <InventoryList searchTerm={searchTerm} />
        </>
    )
}