import { useState, lazy, Suspense } from "react";
// react router dom
import { Routes, Route, useParams } from "react-router-dom";

import { useStore } from "./util/store/store";

import "./App.css";
// import components
import Header from "./Components/header-component/header";
import { Box } from "@mui/material";
import ProductById from "./Components/header-component/search-component/product-by-id-component/product-by-id";
import AppSlider from "./Components/carousel-component/carousel";
import Sidebar from "./Components/compare__sidzebar/sidebar";
import Product from "./Components/product-component/product";
// lazy loading components
// const name = lazy(()=> import(""))

import jwtDecoder from "./util/jwtDecode/jwt";
import Footer from "./Components/footer/footer";
import CartItemPage from "./Components/header-component/link-component/cart-item-component/cart-item-page-component/cart-item-page";
import JwtDecoder from "./util/jwtDecode/jwt";

function App() {
  const MainPage = () => {
    return (
      <>
        <AppSlider />
        <Product />
      </>
    );
  };

  return (
    <Box>
      <JwtDecoder/>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <MainPage />
            </Suspense>
          }
        />
        <Route path="/cart" element={<CartItemPage/>}/>
        <Route path="product/:id" element={<ProductById />} />
      </Routes>
      <Sidebar />
      <Footer/>
    </Box>
  );
}

export default App;
