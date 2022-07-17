import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import Home from "./pages/home/home";
import DetailProduct from "./pages/product/detailProduct";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Login from "./pages/account/login";
import Footer from "./components/footer/footer";
import Shop from "./pages/shop/shop";
import Register from "./pages/account/register";
import Cart from "./pages/shop/cart";
import Checkout from "./pages/shop/checkout";
import { CartProvider } from "react-use-cart";
import Profile from "./pages/account/profile";
import AddProduct from "./pages/product/addProduct";
import EditProduct from "./pages/product/editProduct";
import Shop_Category from "./pages/shop/shopCategory";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<DetailProduct />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:kategori" element={<Shop_Category />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </Router>
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
