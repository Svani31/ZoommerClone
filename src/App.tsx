import { useState } from "react";

import { Routes, Route, useParams } from "react-router-dom";

import { useStore } from "./util/store/store";

import "./App.css";

import Header from "./Components/header-component/header";
import Product from "./Components/product-component/product";
import { Box } from "@mui/material";
import ProductById from "./Components/header-component/search-component/product-by-id-component/product-by-id";
import AppSlider from "./Components/carousel-component/carousel";
import Sidebar from "./Components/compare__sidzebar/sidebar";

function App() {

  const MainPage = () =>{
   return(
     <>
    <AppSlider/>
    <Product/>
    </>
     )
  }
  
  return (
    <Box>
      <Header />
      <Routes>
      <Route path="/" element={<MainPage/>}></Route>
      <Route path="product/:id" element={<ProductById/>}></Route>
      </Routes>
      <Sidebar/>
    </Box>
  );
}

export default App;
