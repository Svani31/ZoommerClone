import { useState } from 'react'

import { Routes,Route } from 'react-router-dom'

import { useStore } from './util/store/store'

import './App.css'

import Header from './Components/header-component/header'
import Product from './Components/product-component/product'


function App() {
    {console.log(window.innerWidth)}

return (
<>
    <Header/>
    <Routes>
      
    </Routes>
      <Product/>
</>
  )
}

export default App
