import { useState } from 'react'

import { Routes,Route } from 'react-router-dom'

import { useStore } from './util/store/store'

import './App.css'

import Header from './Components/header-component/header'
<<<<<<< HEAD
import Product from './Components/product-component/product'
import { Box } from '@mui/material'

=======
import { useStore } from './util/store/store'
>>>>>>> refs/remotes/origin/main

function App() {
    {console.log(window.innerWidth)}
    
  const {consoleLog} = useStore()

  consoleLog
  


return (
<Box>
    <Header/>
    <Routes>
      
    </Routes>
      <Product/>
</Box>
  )
}

export default App
