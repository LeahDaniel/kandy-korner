import "./InventorySearch.css"

export const InventorySearch = ({setSearchTerm}) => {
    return (
            <form className="searchForm">
                <fieldset className="searchField">
                        <label htmlFor="search">Search Products:</label>
                        <input
                            required autoFocus
                            type="text"
                            id="search"
                            className="searchBox"
                            placeholder="Product name includes..."
                            onChange={
                                //update the employee transient state with the value of the name input
                                (event) => {
                                    setSearchTerm(event.target.value)
                                }
                            } />
                </fieldset>
            </form>
  
    )
}