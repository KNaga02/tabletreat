import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import LoginRegister from "./components/LoginRegister";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Order from "./components/Order";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import TableOrder from "./components/TableOrder";
import About from "./components/About";
import ContactScreen from "./components/ContactScreen";
import OrderTracking from "./components/OrderTracking";
import Header from "./components/Header";

function AppWrapper() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const location = useLocation();

  // Hide header on landing and login page
  const hideHeader = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!hideHeader && (
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route
          path="/home"
          element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/menu"
          element={<Menu />}
        />
        <Route
          path="/order"
          element={<Order cart={cart} setCart={setCart} />}
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} />}
        />
        <Route
          path="/confirmation"
          element={<OrderConfirmation />}
        />
        <Route
          path="/table-order"
          element={<TableOrder />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/contact"
          element={<ContactScreen />}
        />
        <Route
          path="/track-order"
          element={<OrderTracking />}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
