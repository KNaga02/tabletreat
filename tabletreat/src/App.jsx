import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

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
import Profile from "./Profile/Profile";

function AppWrapper() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const location = useLocation();

  const hideHeader = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!hideHeader && (
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<LoginRegister setIsLoggedIn={setIsLoggedIn} />} />

        <Route
          path="/home"
          element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/menu" element={<Menu />} />

        <Route
          path="/order"
          element={<Order cart={cart} setCart={setCart} />}
        />

        <Route
          path="/checkout"
          element={isLoggedIn ? <Checkout cart={cart} /> : <Navigate to="/login" />}
        />

        <Route path="/confirmation" element={<OrderConfirmation />} />

        <Route
          path="/table-order"
          element={isLoggedIn ? <TableOrder /> : <Navigate to="/login" />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/tracking" element={<OrderTracking />} />

        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>} />
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


























// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Landing from "./components/Landing";
// import LoginRegister from "./components/LoginRegister";
// import Home from "./components/Home";
// import Menu from "./components/Menu";
// import Order from "./components/Order";
// import Checkout from "./components/Checkout";
// import OrderConfirmation from "./components/OrderConfirmation";
// import TableOrder from "./components/TableOrder";
// import About from "./components/About";
// import ContactScreen from "./components/ContactScreen";
// import OrderTracking from "./components/OrderTracking";
// import Profile from "./Profile/Profile";
// import Header from "./components/Header";

// function AppWrapper({ darkMode, setDarkMode }) {
//   const [cart, setCart] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     localStorage.getItem("isLoggedIn") === "true"
//   );

//   const location = useLocation();

//   const hideHeader = location.pathname === "/" || location.pathname === "/login";

//   return (
//     <>
//       {!hideHeader && (
//         <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       )}

//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<LoginRegister />} />
//         <Route
//           path="/home"
//           element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
//         />
//         <Route path="/menu" element={<Menu />} />
//         <Route path="/order" element={<Order cart={cart} setCart={setCart} />} />
//         <Route path="/checkout" element={<Checkout cart={cart} />} />
//         <Route path="/confirmation" element={<OrderConfirmation />} />
//         <Route path="/table-order" element={<TableOrder />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<ContactScreen />} />
//         <Route path="/tracking" element={<OrderTracking />} />
//         <Route
//           path="/profile"
//           element={<Profile darkMode={darkMode} setDarkMode={setDarkMode} />}
//         />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") setDarkMode(true);
//   }, []);

//   return (
//     <div className={darkMode ? "dark" : "light"}>
//       <Router>
//         <AppWrapper darkMode={darkMode} setDarkMode={setDarkMode} />
//       </Router>
//     </div>
//   );
// }

