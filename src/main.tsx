import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { BrowserRouter} from "react-router-dom"
import StoreProvider from "./util/store/store"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <StoreProvider>
    <App />
    </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

// search engine Working,BackgroundBlure
