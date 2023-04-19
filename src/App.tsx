import { useState } from 'react'

import { Routes,Route } from 'react-router-dom'

import './App.css'
import Header from './Components/header-component/header'
import { useStore } from './util/store/store'

function App() {
    {console.log(window.innerWidth)}
    
  const {consoleLog} = useStore()

  consoleLog
  


  return (
<>
    <Header/>
    <Routes >

    </Routes>
</>
  )
}

export default App
