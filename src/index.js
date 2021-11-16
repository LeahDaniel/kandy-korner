import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { KandyKorner } from "./components/KandyKorner.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <KandyKorner />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
)
  