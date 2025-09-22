import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";
import Biryani from "../assets/Biryani.jpg";
import Curry from "../assets/curry.jpg";
import Pasta from "../assets/Pasta Alfredo.jpg";
import Salad from "../assets/salad.jpg";

export default function Order() {
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, name: "Chicken Biryani", price: 250, image: Biryani },
    { id: 2, name: "Paneer Butter", price: 180, image: Curry },
    { id: 3, name: "Pasta Alfredo", price: 200, image: Pasta },
    { id: 4, name: "Fresh Salad", price: 120, image: Salad },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="order-screen">
      {/* <button className="back-btn" onClick={() => navigate(-1)}>
        
      </button> */}

      <header className="order-header">
        <h1>Place Your Order</h1>
      </header>

      <main className="order-main">
        <section>
          <h2>Menu</h2>
          <div className="dishes-list">
            {menuItems.map((dish) => (
              <div key={dish.id} className="dish-card">
                <img src={dish.image} alt={dish.name} className="dish-image" />
                <h3>{dish.name}</h3>
                <p>Price: ₹{dish.price}</p>
                <button className="cart-btn" onClick={() => addToCart(dish)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Cart</h2>
          <div className="cart-list">
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <span>
                    {item.name} - ₹{item.price}
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {cart.length > 0 && (
          <button
            className="tt-btn"
            onClick={() => navigate("/checkout", { state: { cart } })}
          >
            Proceed to Checkout
          </button>
        )}
      </main>
    </div>
  );
}
